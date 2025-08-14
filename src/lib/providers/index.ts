import { PaymentProvider } from "@prisma/client";

export interface InitiateCheckoutInput {
  amount: number;
  currency: string;
  description?: string | null;
  reference: string; // internal payment id
  returnUrl: string;
  notifyUrl: string;
  credentials: Record<string, unknown>;
}

export interface InitiateCheckoutResult {
  redirectUrl: string;
}

export function chooseProvider(_opts: {
  enabledProviders: { provider: PaymentProvider; credentials: Record<string, unknown> }[];
}): PaymentProvider | null {
  // Naive: pick the first enabled provider
  const first = _opts.enabledProviders[0];
  return first ? first.provider : null;
}

// Temporary sandbox provider: simply redirects back to our success page
export async function initiateCheckoutStub(
  input: InitiateCheckoutInput
): Promise<InitiateCheckoutResult> {
  // In real adapters, call provider APIs and return their redirect URL
  const url = new URL(input.returnUrl);
  url.searchParams.set("pid", input.reference);
  return { redirectUrl: url.toString() };
}


