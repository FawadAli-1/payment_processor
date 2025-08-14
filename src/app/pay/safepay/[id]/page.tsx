import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { decryptJson, isEncryptedCredentials } from "@/lib/security/crypto";
import SafepayCheckoutClient from "@/components/checkout/SafepayCheckoutClient";

export default async function SafepayCheckoutPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const payment = await db.payment.findUnique({ where: { id } });
  if (!payment) notFound();

  const link = await db.paymentLink.findUnique({ where: { id: payment.paymentLinkId! } });
  if (!link) notFound();

  const businessConfig = await db.providerConfig.findFirst({ where: { businessId: payment.businessId, provider: "SAFEPAY", enabled: true } });
  let creds = (businessConfig?.credentials || {}) as Record<string, any>;
  if (isEncryptedCredentials(creds)) {
    const d = decryptJson(creds);
    if (d && typeof d === "object") creds = d as Record<string, any>;
  }

  const returnUrl = `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/pay/${encodeURIComponent(link.url.split("/pay/").pop() || "")}/success?pid=${encodeURIComponent(payment.id)}`;
  const notifyUrl = `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/api/webhooks/safepay`;

  // If no public API key, show a simple message to avoid a blank screen
  if (!creds.apiKey) {
    return <div className="max-w-md mx-auto py-12 text-center">Safepay is not configured. Please enable Safepay and add your sandbox API key in Settings.</div>;
  }

  return (
    <SafepayCheckoutClient
      amount={payment.amount}
      currency={payment.currency}
      description={payment.description || undefined}
      reference={payment.id}
      returnUrl={returnUrl}
      notifyUrl={notifyUrl}
      apiKey={creds.apiKey || ""}
      env="sandbox"
    />
  );
}


