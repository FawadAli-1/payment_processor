import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  CreditCard, 
  TrendingUp, 
  Users, 
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  Activity
} from "lucide-react";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { formatCurrency, calculateStats } from "@/lib/utils";
import { DashboardActions } from "./dashboard-actions";
import { TransactionsButton } from "./transactions-button";
import Link from "next/link";

export default async function DashboardPage() {
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
  const recentTransactions = business.payments.slice(0, 4);

  // Fetch provider status dynamically
  let providers = [
    { name: "PayFast", status: "online" },
    { name: "Safepay", status: "online" },
    { name: "Easypaisa", status: "online" },
    { name: "JazzCash", status: "offline" }
  ];

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/providers/status`, {
      cache: 'no-store'
    });
    if (response.ok) {
      const data = await response.json();
      providers = data.providers;
    }
  } catch (error) {
    console.log(error);
    
    // Fallback to default status if API fails
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6 lg:mb-8">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-sm sm:text-base text-gray-600 mt-1">Welcome back! Here&apos;s what&apos;s happening with your business.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 lg:mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold">{formatCurrency(stats.revenue.current)}</div>
            <p className="text-xs text-muted-foreground flex items-center">
              {stats.revenue.change > 0 ? (
                <ArrowUpRight className="h-3 w-3 text-green-600 mr-1" />
              ) : stats.revenue.change < 0 ? (
                <ArrowDownRight className="h-3 w-3 text-red-600 mr-1" />
              ) : null}
              {stats.revenue.change > 0 ? `+${stats.revenue.change.toFixed(1)}%` : 
               stats.revenue.change < 0 ? `${stats.revenue.change.toFixed(1)}%` : 
               'No change'} from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Transactions</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold">{stats.transactions.current}</div>
            <p className="text-xs text-muted-foreground flex items-center">
              {stats.transactions.change > 0 ? (
                <ArrowUpRight className="h-3 w-3 text-green-600 mr-1" />
              ) : stats.transactions.change < 0 ? (
                <ArrowDownRight className="h-3 w-3 text-red-600 mr-1" />
              ) : null}
              {stats.transactions.change > 0 ? `+${stats.transactions.change.toFixed(1)}%` : 
               stats.transactions.change < 0 ? `${stats.transactions.change.toFixed(1)}%` : 
               'No change'} from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold">{stats.successRate.current.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground flex items-center">
              {stats.successRate.change > 0 ? (
                <ArrowUpRight className="h-3 w-3 text-green-600 mr-1" />
              ) : stats.successRate.change < 0 ? (
                <ArrowDownRight className="h-3 w-3 text-red-600 mr-1" />
              ) : null}
              {stats.successRate.change > 0 ? `+${stats.successRate.change.toFixed(1)}%` : 
               stats.successRate.change < 0 ? `${stats.successRate.change.toFixed(1)}%` : 
               'No change'} from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold">{stats.customers.current}</div>
            <p className="text-xs text-muted-foreground flex items-center">
              {stats.customers.change > 0 ? (
                <ArrowUpRight className="h-3 w-3 text-green-600 mr-1" />
              ) : stats.customers.change < 0 ? (
                <ArrowDownRight className="h-3 w-3 text-red-600 mr-1" />
              ) : null}
              {stats.customers.change > 0 ? `+${stats.customers.change.toFixed(1)}%` : 
               stats.customers.change < 0 ? `${stats.customers.change.toFixed(1)}%` : 
               'No change'} from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity & Quick Actions */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
        {/* Recent Transactions */}
        <div className="xl:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <Activity className="mr-2 h-5 w-5" />
                Recent Transactions
              </CardTitle>
              <CardDescription>
                Your latest payment activity
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 sm:space-y-4">
                {recentTransactions.length > 0 ? (
                  recentTransactions.map((transaction: any) => (
                    <div key={transaction.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3 min-w-0 flex-1">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <CreditCard className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="font-medium text-sm truncate">
                            {transaction.customerName || transaction.customerEmail || 'Unknown Customer'}
                          </p>
                          <p className="text-xs text-gray-500 truncate">{transaction.provider}</p>
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0 ml-2">
                        <p className="font-medium text-sm">{formatCurrency(transaction.amount)}</p>
                        <Badge 
                          variant={
                            transaction.status === "COMPLETED" ? "default" :
                            transaction.status === "PENDING" ? "secondary" : "destructive"
                          }
                          className="text-xs"
                        >
                          {transaction.status.toLowerCase()}
                        </Badge>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <CreditCard className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p>No transactions yet</p>
                    <p className="text-sm">Your payment activity will appear here</p>
                  </div>
                )}
              </div>
              <div className="mt-4">
                <TransactionsButton />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>
                Common tasks and shortcuts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DashboardActions />
            </CardContent>
          </Card>

          {/* API Status */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>API Status</CardTitle>
              <CardDescription>
                Payment provider connections
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {providers.map((provider) => (
                  <div key={provider.name} className="flex items-center justify-between">
                    <span className="text-sm">{provider.name}</span>
                    <div className="flex items-center space-x-2">
                      <div className={`w-2 h-2 rounded-full ${provider.status === 'online' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                      <span className="text-xs text-gray-500">{provider.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 