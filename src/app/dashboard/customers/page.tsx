import { CustomersClient } from "./customers-client";
import { getCurrentBusiness } from "@/lib/auth";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function CustomersPage() {
  const business = await getCurrentBusiness();
  if (!business) return null;

  const customers = await db.customer.findMany({
    where: { businessId: business.id },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      address: true,
      businessId: true,
      totalSpent: true,
      totalOrders: true,
      lastOrderAt: true,
      status: true,
      metadata: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return <CustomersClient initialCustomers={customers} />;
}