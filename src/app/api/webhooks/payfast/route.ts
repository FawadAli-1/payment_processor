import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import crypto from "crypto";

function verifySignature(params: URLSearchParams, passphrase?: string, signature?: string) {
  const sorted = Array.from(params.entries())
    .filter(([k]) => k !== "signature")
    .sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0));
  const pairs = sorted.map(([k, v]) => `${k}=${encodeURIComponent(v)}`);
  let paramString = pairs.join("&");
  if (passphrase) paramString += `&passphrase=${encodeURIComponent(passphrase)}`;
  const calc = crypto.createHash("md5").update(paramString).digest("hex");
  return calc === signature;
}

export async function POST(request: NextRequest) {
  try {
    const text = await request.text();
    const params = new URLSearchParams(text);
    const mPaymentId = params.get("m_payment_id");
    const pfPaymentId = params.get("pf_payment_id") || undefined;
    const signature = params.get("signature") || undefined;

    if (!mPaymentId) return NextResponse.json({ error: "missing m_payment_id" }, { status: 400 });

    const payment = await db.payment.findUnique({ where: { id: mPaymentId } });
    if (!payment) return NextResponse.json({ error: "payment not found" }, { status: 404 });

    const cfg = await db.providerConfig.findFirst({ where: { businessId: payment.businessId, provider: "PAYFAST", enabled: true } });
    const creds = (cfg?.credentials || {}) as Record<string, unknown>;
    const passphrase = creds?.passphrase as string | undefined;

    if (!verifySignature(params, passphrase, signature)) {
      return NextResponse.json({ error: "invalid signature" }, { status: 400 });
    }

    // Idempotency: upsert webhook event by provider+external id
    await db.webhookEvent.upsert({
      where: { provider_externalId: { provider: "PAYFAST", externalId: pfPaymentId || `mpid:${mPaymentId}` } },
      create: { provider: "PAYFAST", externalId: pfPaymentId || `mpid:${mPaymentId}`, payload: Object.fromEntries(params.entries()) },
      update: {},
    });

    // Map status
    const pfStatus = params.get("payment_status");
    const nextStatus = pfStatus === "COMPLETE" ? "COMPLETED" : pfStatus === "CANCELLED" ? "CANCELLED" : pfStatus === "FAILED" ? "FAILED" : "PENDING";

    await db.payment.update({ where: { id: payment.id }, data: { status: nextStatus, providerRef: pfPaymentId } });
    await db.paymentAttempt.updateMany({ where: { paymentId: payment.id }, data: { status: nextStatus === "COMPLETED" ? "SUCCEEDED" : nextStatus === "FAILED" ? "FAILED" : "PENDING" } });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("PayFast webhook error:", error);
    return NextResponse.json({ error: "Invalid webhook" }, { status: 400 });
  }
}


