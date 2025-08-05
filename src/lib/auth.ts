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
  const { userId } = await auth();
  
  if (!userId) {
    redirect("/sign-in");
  }

  // Check if user exists in database, if not create them
  let user = await db.user.findUnique({
    where: { clerkId: userId },
  });

  if (!user) {
    // Create user record for new users
    user = await db.user.create({
      data: {
        clerkId: userId,
        email: "user@example.com", // This will be updated during business setup
      },
    });
  }

  return user;
}

export async function getBusinessForUser(userId: string) {
  const business = await db.business.findFirst({
    where: { userId },
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