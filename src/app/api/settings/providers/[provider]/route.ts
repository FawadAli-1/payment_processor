import { NextRequest, NextResponse } from "next/server";
import { getCurrentBusiness } from "@/lib/auth";
import { db } from "@/lib/db";
import { Prisma, PaymentProvider as PrismaPaymentProvider } from "@prisma/client";
import { ProviderSchemas } from "@/lib/providers/validation";
import { encryptJson } from "@/lib/security/crypto";

const ALL_PROVIDERS = ["PAYFAST", "SAFEPAY", "EASYPAISA", "JAZZCASH"] as const;

type ProviderEnum = typeof ALL_PROVIDERS[number];

function normalizeProvider(input: string): ProviderEnum | null {
  const upper = input.toUpperCase();
  return (ALL_PROVIDERS as readonly string[]).includes(upper) ? (upper as ProviderEnum) : null;
}

function toNullableJson(
  value: unknown
): Prisma.InputJsonValue | Prisma.NullableJsonNullValueInput | undefined {
  if (value === undefined) return undefined;
  if (value === null) return Prisma.DbNull;
  return value as Prisma.InputJsonValue;
}

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ provider: string }> }
) {
  try {
    const business = await getCurrentBusiness();
    if (!business) {
      return NextResponse.json({ error: "Business not found" }, { status: 404 });
    }

    const { provider: providerRaw } = await params;
    // support both enum (PAYFAST) and slug (payfast)
    const normalized = providerRaw.includes("-")
      ? providerRaw.replace(/-/g, "")
      : providerRaw;
  const provider = normalizeProvider(normalized);
    if (!provider) {
      return NextResponse.json({ error: "Invalid provider" }, { status: 400 });
    }

    const config = await db.providerConfig.findUnique({
      where: {
        businessId_provider: {
          businessId: business.id,
          provider: provider as unknown as PrismaPaymentProvider,
        },
      },
    });

    return NextResponse.json({
      provider,
      enabled: config?.enabled ?? false,
      credentials: config?.credentials ?? null,
    });
  } catch (error) {
    console.error("Error fetching provider config:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: `Failed to fetch provider config: ${message}` }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ provider: string }> }
) {
  try {
    const business = await getCurrentBusiness();
    if (!business) {
      return NextResponse.json({ error: "Business not found" }, { status: 404 });
    }

    const { provider: providerRaw } = await params;
    const provider = normalizeProvider(providerRaw);
    if (!provider) {
      return NextResponse.json({ error: "Invalid provider" }, { status: 400 });
    }

    const body = await request.json();
    const enabled: boolean = Boolean(body.enabled);

    // Normalize empty strings to undefined so optional fields like callbackUrl can be omitted
    const rawCreds = (body.credentials ?? {}) as Record<string, unknown>;
    const cleanedCreds = Object.fromEntries(
      Object.entries(rawCreds).filter(([, v]) => v !== "" && v !== null && v !== undefined)
    );

    // Validate credentials if provided for this provider
    let credentials = toNullableJson(Object.keys(cleanedCreds).length ? cleanedCreds : null);
    if (credentials && provider in ProviderSchemas) {
      const parsed = ProviderSchemas[provider as keyof typeof ProviderSchemas].safeParse(cleanedCreds);
      if (!parsed.success) {
        return NextResponse.json({ error: "Invalid credentials format", details: parsed.error.flatten() }, { status: 400 });
      }
      // Encrypt at rest
      const encrypted = encryptJson(parsed.data);
      credentials = (encrypted ?? parsed.data) as unknown as Prisma.InputJsonValue;
    }

    const updated = await db.providerConfig.upsert({
      where: {
        businessId_provider: {
          businessId: business.id,
          provider: provider as unknown as PrismaPaymentProvider,
        },
      },
      create: {
        businessId: business.id,
        provider: provider as unknown as PrismaPaymentProvider,
        enabled,
        credentials,
      },
      update: {
        enabled,
        credentials,
      },
    });

    return NextResponse.json({
      provider,
      enabled: updated.enabled,
      credentials: updated.credentials ?? null,
      message: "Provider configuration saved",
    });
  } catch (error) {
    console.error("Error updating provider config:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: `Failed to update provider config: ${message}` }, { status: 500 });
  }
}
