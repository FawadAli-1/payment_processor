import { Suspense } from "react";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { calculateStats } from "@/lib/utils";
import { DashboardSkeleton } from "@/components/ui/loading-skeleton";
import { DashboardClient } from "./dashboard-client";
import Link from "next/link";

async function DashboardContent() {
  const { userId } = await auth();
  
  if (!userId) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Authentication Required</h1>
          <p className="text-gray-600 mb-4">Please sign in to access your dashboard.</p>
          <Link
            href="/sign-in" 
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  // Get user and business data
  const user = await db.user.findUnique({
    where: { clerkId: userId },
  });

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">User Not Found</h1>
          <p className="text-gray-600 mb-4">Your user account could not be found.</p>
          <Link
            href="/sign-in" 
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            Sign In Again
          </Link>
        </div>
      </div>
    );
  }

  const business = await db.business.findFirst({
    where: { userId: user.id },
    include: {
      payments: {
        orderBy: { createdAt: 'desc' },
        take: 10
      },
      customers: {
        orderBy: { createdAt: 'desc' },
        take: 10
      }
    }
  });

  if (!business) {
    redirect("/dashboard/setup");
  }

  // Calculate dynamic stats
  const stats = calculateStats(business.payments, business.customers);

  // Get recent transactions
  const recentTransactions = business.payments.slice(0, 4).map(payment => ({
    id: payment.id,
    customerName: payment.customerName || undefined,
    customerEmail: payment.customerEmail || undefined,
    provider: payment.provider,
    amount: payment.amount,
    status: payment.status
  }));

  // Fetch provider status dynamically
  const providers = [
    { name: "PayFast", status: "online" },
    { name: "Safepay", status: "online" },
    { name: "Easypaisa", status: "online" },
    { name: "JazzCash", status: "offline" }
  ];

  return (
    <DashboardClient
      stats={stats}
      recentTransactions={recentTransactions}
      providers={providers}
    />
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <DashboardContent />
    </Suspense>
  );
} 