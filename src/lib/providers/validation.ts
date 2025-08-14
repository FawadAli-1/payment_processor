import * as z from "zod";

export const PayfastCredentialsSchema = z.object({
  merchantId: z.string().min(1),
  merchantKey: z.string().min(1),
  passphrase: z.string().optional(),
  callbackUrl: z.url().optional(),
});

export const SafepayCredentialsSchema = z.object({
  apiKey: z.string().min(1),
  apiSecret: z.string().min(1),
  callbackUrl: z.url().optional(),
});

export const EasypaisaCredentialsSchema = z.object({
  storeId: z.string().min(1),
  hashKey: z.string().min(1),
  callbackUrl: z.url().optional(),
});

export const JazzcashCredentialsSchema = z.object({
  merchantId: z.string().min(1),
  password: z.string().min(1),
  salt: z.string().min(1),
  callbackUrl: z.url().optional(),
});

export const ProviderSchemas = {
  PAYFAST: PayfastCredentialsSchema,
  SAFEPAY: SafepayCredentialsSchema,
  EASYPAISA: EasypaisaCredentialsSchema,
  JAZZCASH: JazzcashCredentialsSchema,
} as const;

export type ProviderId = keyof typeof ProviderSchemas;


