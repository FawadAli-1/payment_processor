import { LinksClient } from "./links-client";
import { getCurrentBusiness } from "@/lib/auth";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function PaymentLinksPage() {
  const business = await getCurrentBusiness();
  if (!business) {
    return null;
  }

  const links = await db.paymentLink.findMany({
    where: { businessId: business.id },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      title: true,
      description: true,
      amount: true,
      currency: true,
      status: true,
      clicks: true,
      url: true,
      expiresAt: true,
      createdAt: true,
      updatedAt: true,
      payments: {
        select: { id: true, amount: true, status: true, createdAt: true },
        orderBy: { createdAt: "desc" },
      },
    },
  });

  return <LinksClient initialLinks={links} />;
}