import { auth } from "@clerk/nextjs/server";
import { db } from "./db";
import { redirect } from "next/navigation";

export async function getCurrentUser() {
  const { userId } = await auth();
  
  if (!userId) {
    return null;
  }

  const user = await db.user.findUnique({
    where: { clerkId: userId },
    include: {
      businesses: true,
    },
  });

  return user;
}

export async function getCurrentBusiness() {
  const user = await getCurrentUser();
  
  if (!user) {
    return null;
  }

  // For now, get the first business. In the future, you might want to allow multiple businesses
  const business = await db.business.findFirst({
    where: { userId: user.id },
    include: {
      payments: {
        orderBy: { createdAt: 'desc' },
        take: 10,
      },
      paymentLinks: {
        orderBy: { createdAt: 'desc' },
        take: 10,
      },
      customers: {
        orderBy: { createdAt: 'desc' },
        take: 10,
      },
    },
  });

  return business;
}

export async function requireAuth() {
  const user = await getCurrentUser();
  
  if (!user) {
    redirect("/sign-in");
  }

  return user;
}

export async function requireBusiness() {
  const business = await getCurrentBusiness();
  
  if (!business) {
    redirect("/dashboard/setup");
  }

  return business;
} 