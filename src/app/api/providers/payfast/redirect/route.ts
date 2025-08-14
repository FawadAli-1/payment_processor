import { NextRequest } from "next/server";
import { db } from "@/lib/db";

import crypto from "crypto";

function htmlForm(url: string, fields: Record<string, string>) {
  const inputs = Object.entries(fields)
    .map(([k, v]) => `<input type="hidden" name="${k}" value="${String(v).replace(/"/g, '&quot;')}"/>`)
    .join("");
  return `<!doctype html><html><body onload="document.forms[0].submit()"><form method="post" action="${url}">${inputs}</form></body></html>`;
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const ref = searchParams.get("ref");
  const processUrl = searchParams.get("processUrl");
  if (!ref || !processUrl) {
    return new Response("Missing params", { status: 400 });
  }

  const payment = await db.payment.findUnique({ where: { id: ref } });
  if (!payment) return new Response("Payment not found", { status: 404 });

  // Fetch provider config and credentials
  const cfg = await db.providerConfig.findFirst({ where: { businessId: payment.businessId, provider: "PAYFAST", enabled: true } });
  if (!cfg) return new Response("Provider not configured", { status: 400 });
  const creds = (cfg.credentials || {}) as Record<string, unknown>;
  const merchantId = creds.merchantId;
  const merchantKey = creds.merchantKey;
  const passphrase = creds.passphrase as string | undefined;
  const returnUrl = `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/pay/${payment.paymentLinkId ? (await db.paymentLink.findUnique({ where: { id: payment.paymentLinkId } }))?.url.split("/pay/")[1] : ""}/success?pid=${encodeURIComponent(payment.id)}`;
  const cancelUrl = returnUrl.replace("/success", "/failed");
  const notifyUrl = `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/api/webhooks/payfast`;

  const fields: Record<string, string> = {
    merchant_id: merchantId,
    merchant_key: merchantKey,
    return_url: returnUrl,
    cancel_url: cancelUrl,
    notify_url: notifyUrl,
    m_payment_id: payment.id,
    amount: Number(payment.amount).toFixed(2),
    item_name: payment.description || "Payment",
    email_confirmation: "1",
    confirmation_address: "",
  };

  const keys = Object.keys(fields).sort();
  const pairs = keys.map((k) => `${k}=${encodeURIComponent(fields[k])}`);
  let paramString = pairs.join("&");
  if (passphrase) paramString += `&passphrase=${encodeURIComponent(passphrase)}`;
  const signature = crypto.createHash("md5").update(paramString).digest("hex");
  fields.signature = signature;

  const html = htmlForm(processUrl, fields);
  return new Response(html, { status: 200, headers: { "Content-Type": "text/html" } });
}


