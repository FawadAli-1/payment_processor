import crypto from "crypto";
import type { InitiateCheckoutInput, InitiateCheckoutResult } from "./index";

export type PayfastCredentials = {
  merchantId: string;
  merchantKey: string;
  passphrase?: string;
  callbackUrl?: string; // optional extra override if configured
};

function buildSignature(params: Record<string, string>, passphrase?: string): string {
  // Create parameter string in lexicographical order and URL-encode values
  const keys = Object.keys(params).sort();
  const pairs = keys.map((k) => `${k}=${encodeURIComponent(params[k])}`);
  let paramString = pairs.join("&");
  if (passphrase) {
    paramString += `&passphrase=${encodeURIComponent(passphrase)}`;
  }
  return crypto.createHash("md5").update(paramString).digest("hex");
}

export async function initiateCheckout(input: InitiateCheckoutInput): Promise<InitiateCheckoutResult> {
  const creds = (input.credentials || {}) as PayfastCredentials;
  const merchantId = creds.merchantId;
  const merchantKey = creds.merchantKey;
  if (!merchantId || !merchantKey) {
    throw new Error("Missing PayFast credentials");
  }

  const processUrl = process.env.PAYFAST_PROCESS_URL || "https://sandbox.payfast.co.za/eng/process";
  const returnUrl = creds.callbackUrl || input.returnUrl;
  const cancelUrl = returnUrl.replace("/success", "/failed");
  const notifyUrl = input.notifyUrl;

  // Build fields as per PayFast
  const fields: Record<string, string> = {
    merchant_id: merchantId,
    merchant_key: merchantKey,
    return_url: returnUrl,
    cancel_url: cancelUrl,
    notify_url: notifyUrl,
    m_payment_id: input.reference,
    amount: Number(input.amount).toFixed(2),
    item_name: input.description || "Payment",
    email_confirmation: "1",
    confirmation_address: "",
  };

  const signature = buildSignature(fields, creds.passphrase);
  fields.signature = signature;

  // We cannot redirect with POST from server action; provide an internal relay endpoint
  const relayUrl = `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/api/providers/payfast/redirect`;
  const query = new URLSearchParams({ processUrl }).toString();
  // We pass the minimal token (reference) and rebuild fields in the relay for security; but for simplicity include fields in body there
  const redirectUrl = `${relayUrl}?ref=${encodeURIComponent(input.reference)}&${query}`;
  return { redirectUrl };
}


