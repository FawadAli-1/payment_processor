import { NextResponse } from "next/server";
import { getCurrentBusiness } from "@/lib/auth";
import { db } from "@/lib/db";

const ALL_PROVIDERS = ["PAYFAST", "SAFEPAY", "EASYPAISA", "JAZZCASH"] as const;

export async function GET() {
  try {
    const business = await getCurrentBusiness();

    if (!business) {
      // Return harmless defaults so UI can render
      const providers = ALL_PROVIDERS.map((provider) => ({
        provider,
        enabled: false,
        hasCredentials: false,
      }));
      return NextResponse.json({ providers }, { status: 200 });
    }

    const configs = await db.providerConfig.findMany({
      where: { businessId: business.id },
    });

    const providers = ALL_PROVIDERS.map((provider) => {
      const config = configs.find((c) => c.provider === provider);
      return {
        provider,
        enabled: config?.enabled ?? false,
        hasCredentials: Boolean(config?.credentials),
      };
    });

    return NextResponse.json({ providers });
  } catch (error) {
    console.error("Error fetching provider configs:", error);
    // Return defaults on error to prevent UI breakage
    const providers = ALL_PROVIDERS.map((provider) => ({
      provider,
      enabled: false,
      hasCredentials: false,
    }));
    return NextResponse.json({ providers }, { status: 200 });
  }
}
