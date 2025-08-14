import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

// Minimal Safepay webhook handler (sandbox-friendly)
// Assumes payload includes our internal reference (payment id) and a status
// In production, verify Safepay signature/HMAC per their docs.
export async function POST(request: NextRequest) {
  try {
    const contentType = request.headers.get("content-type") || "";
    let payload: Record<string, unknown> = {};
    if (contentType.includes("application/json")) {
      payload = await request.json();
    } else {
      const text = await request.text();
      try {
        payload = JSON.parse(text);
      } catch {
        const params = new URLSearchParams(text);
        payload = Object.fromEntries(params.entries());
      }
    }

    const ref = payload.reference || payload.ref || payload.m_payment_id || payload.paymentId;
    if (!ref) return NextResponse.json({ error: "missing reference" }, { status: 400 });

    const payment = await db.payment.findUnique({ where: { id: ref as string } });
    if (!payment) return NextResponse.json({ error: "payment not found" }, { status: 404 });

    // Persist raw webhook for idempotency/audit
    const externalId = String(payload.transaction_id || payload.provider_ref || payload.id || `ref:${ref}`);
    await db.webhookEvent.upsert({
      where: { provider_externalId: { provider: "SAFEPAY", externalId } },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      create: { provider: "SAFEPAY", externalId, payload: payload as any }, // Type assertion for Prisma compatibility
      update: {},
    });

    const pStatus: string = String(payload.status || payload.payment_status || "PENDING").toUpperCase();
    const nextStatus = pStatus === "COMPLETE" || pStatus === "COMPLETED" ? "COMPLETED"
      : pStatus === "FAILED" ? "FAILED"
      : pStatus === "CANCELLED" ? "CANCELLED"
      : "PENDING";

    await db.payment.update({ where: { id: payment.id }, data: { status: nextStatus, provider: "SAFEPAY", providerRef: externalId } });
    await db.paymentAttempt.updateMany({
      where: { paymentId: payment.id },
      data: { status: nextStatus === "COMPLETED" ? "SUCCEEDED" : nextStatus === "FAILED" ? "FAILED" : "PENDING" },
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Safepay webhook error:", error);
    return NextResponse.json({ error: "Invalid webhook" }, { status: 400 });
  }
}


