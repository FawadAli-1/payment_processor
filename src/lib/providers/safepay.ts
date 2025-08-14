import type { InitiateCheckoutInput, InitiateCheckoutResult } from "./index";

export type SafepayCredentials = {
  apiKey: string;
  apiSecret: string;
  callbackUrl?: string;
};

export async function initiateCheckout(input: InitiateCheckoutInput): Promise<InitiateCheckoutResult> {
  const creds = (input.credentials || {}) as SafepayCredentials;
  if (!creds.apiKey || !creds.apiSecret) {
    throw new Error("Missing Safepay credentials");
  }

  // Temporary: redirect to our relay endpoint while we finalize widget/REST integration
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const relayUrl = new URL(`${appUrl}/api/providers/safepay/redirect`);
  relayUrl.searchParams.set("ref", input.reference);
  relayUrl.searchParams.set("success", input.returnUrl);
  relayUrl.searchParams.set("notify", input.notifyUrl);
  return { redirectUrl: relayUrl.toString() };
}


