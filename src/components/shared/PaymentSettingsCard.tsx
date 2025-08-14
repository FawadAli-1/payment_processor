import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard } from "lucide-react";
import { PaymentSettingsCardClient } from "./PaymentSettingsCardClient";
import { getCurrentBusiness } from "@/lib/auth";
import { db } from "@/lib/db";

// Import the type for proper typing
type ProviderId = "payfast" | "safepay" | "easypaisa" | "jazzcash";

interface ProviderItem {
  id: ProviderId;
  name: string;
  description: string;
  color: string;
  letter: string;
  status: "connected" | "configure" | "disabled";
  enum: string;
  hasCredentials: boolean;
  existingConfig: {
    enabled: boolean;
    credentials: Record<string, string>;
  } | null;
}

export async function PaymentSettingsCard() {
  const business = await getCurrentBusiness();
  if (!business) {
    return null;
  }

  // Fetch provider configurations on the server
  const providerConfigs = await db.providerConfig.findMany({
    where: { businessId: business.id },
    select: {
      provider: true,
      enabled: true,
      credentials: true,
    }
  });

  // Transform data for the client component
  const providers: ProviderItem[] = [
    { id: "safepay" as const, name: "Safepay", description: "Digital wallet & cards", color: "bg-green-100", letter: "S", enum: "SAFEPAY" },
    { id: "jazzcash" as const, name: "JazzCash", description: "Mobile payments", color: "bg-orange-100", letter: "J", enum: "JAZZCASH" },
    { id: "easypaisa" as const, name: "Easypaisa", description: "Mobile money transfers", color: "bg-purple-100", letter: "E", enum: "EASYPAISA" },
    { id: "payfast" as const, name: "PayFast", description: "Bank transfers and cards", color: "bg-blue-100", letter: "P", enum: "PAYFAST" },
  ].map(meta => {
    const config = providerConfigs.find(p => p.provider === meta.enum);
    // Only Safepay is currently supported; others are disabled/coming soon
    const isSafepay = meta.id === "safepay";
    const status = isSafepay
      ? (config && config.enabled && config.credentials ? "connected" : "configure")
      : "disabled";

    return {
      ...meta,
      status,
      hasCredentials: isSafepay ? !!config?.credentials : false,
      // Pass the existing config data only for Safepay
      existingConfig: isSafepay && config ? {
        enabled: config.enabled,
        credentials: (config.credentials as Record<string, string>) || {}
      } : null
    };
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <CreditCard className="mr-2 h-5 w-5" />
          Payment Providers
        </CardTitle>
        <CardDescription>
          Configure and manage your payment service providers
        </CardDescription>
      </CardHeader>
      <CardContent>
        <PaymentSettingsCardClient initialProviders={providers} />
      </CardContent>
    </Card>
  );
}