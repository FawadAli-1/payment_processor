import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  DollarSign
} from "lucide-react";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { calculatePaymentStats, formatPaymentAmount } from "@/lib/payments";
import { PaymentsActions } from "./payments-actions";
import { PaymentsFilters } from "./payments-filters";
import { PaymentsTable } from "./payments-table";

export default async function PaymentsPage() {
  const { userId } = await auth();
  
  if (!userId) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Authentication Required</h1>
          <p className="text-gray-600 mb-4">Please sign in to access your payments.</p>
          <a 
            href="/sign-in" 
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            Sign In
          </a>
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
          <a 
            href="/sign-in" 
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            Sign In Again
          </a>
        </div>
      </div>
    );
  }

  const business = await db.business.findFirst({
    where: { userId: user.id },
    include: {
      payments: {
        orderBy: { createdAt: 'desc' },
        include: {
          customer: true
        }
      }
    }
  });

  if (!business) {
    redirect("/dashboard/setup");
  }

  // Calculate dynamic stats using utility function
  const stats = calculatePaymentStats(business.payments);

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6 lg:mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Payments</h1>
            <p className="text-sm sm:text-base text-gray-600 mt-1">Manage and track all your payment transactions</p>
          </div>
          <div className="flex gap-2">
              <PaymentsActions />
          </div>
        </div>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <PaymentsFilters />
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Revenue</p>
                <p className="text-xl font-bold">{formatPaymentAmount(stats.totalRevenue)}</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Successful</p>
                <p className="text-xl font-bold">{stats.successfulPayments}</p>
              </div>
              <Badge variant="default" className="h-8 px-3">{stats.successRate.toFixed(1)}%</Badge>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending</p>
                <p className="text-xl font-bold">{stats.pendingPayments}</p>
              </div>
              <Badge variant="secondary" className="h-8 px-3">{stats.pendingRate.toFixed(1)}%</Badge>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Failed</p>
                <p className="text-xl font-bold">{stats.failedPayments}</p>
              </div>
              <Badge variant="destructive" className="h-8 px-3">{stats.failureRate.toFixed(1)}%</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Payments Table */}
      <PaymentsTable payments={business.payments} />
    </div>
  );
} 