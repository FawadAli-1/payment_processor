import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  CreditCard, 
  TrendingUp, 
  Users, 
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  Plus
} from "lucide-react";
import { getCurrentBusiness } from "@/lib/auth";
import { formatCurrency } from "@/lib/utils";

export default async function DashboardPage() {
  const business = await getCurrentBusiness();
  
  if (!business) {
    return null;
  }

  // Calculate stats from real data
  const totalRevenue = business.payments
    .filter((p: any) => p.status === 'COMPLETED')
    .reduce((sum: number, p: any) => sum + p.amount, 0);

  const totalTransactions = business.payments.length;
  const successfulPayments = business.payments.filter((p: any) => p.status === 'COMPLETED').length;
  const successRate = totalTransactions > 0 ? (successfulPayments / totalTransactions) * 100 : 0;
  
  const activeCustomers = business.customers.filter((c: any) => c.status === 'ACTIVE').length;
  const totalCustomers = business.customers.length;

  // Get recent transactions
  const recentTransactions = business.payments.slice(0, 4);

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6 lg:mb-8">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-sm sm:text-base text-gray-600 mt-1">Welcome back! Here's what's happening with your business.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 lg:mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold">{formatCurrency(totalRevenue)}</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <ArrowUpRight className="h-3 w-3 text-green-600 mr-1" />
              +12% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Transactions</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold">{totalTransactions}</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <ArrowUpRight className="h-3 w-3 text-green-600 mr-1" />
              +8% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold">{successRate.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <ArrowUpRight className="h-3 w-3 text-green-600 mr-1" />
              +2.1% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold">{activeCustomers}</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <ArrowDownRight className="h-3 w-3 text-red-600 mr-1" />
              -3% from last month
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
                <Button variant="outline" className="w-full">
                  View All Transactions
                </Button>
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
            <CardContent className="space-y-3">
              <Button className="w-full justify-start" variant="outline">
                <Plus className="mr-2 h-4 w-4" />
                <span className="hidden sm:inline">Create Payment Link</span>
                <span className="sm:hidden">Payment Link</span>
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <CreditCard className="mr-2 h-4 w-4" />
                <span className="hidden sm:inline">New Checkout Page</span>
                <span className="sm:hidden">Checkout</span>
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Users className="mr-2 h-4 w-4" />
                <span className="hidden sm:inline">View Customers</span>
                <span className="sm:hidden">Customers</span>
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <TrendingUp className="mr-2 h-4 w-4" />
                <span className="hidden sm:inline">Analytics Report</span>
                <span className="sm:hidden">Analytics</span>
              </Button>
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
                {[
                  { name: "PayFast", status: "online", color: "bg-green-500" },
                  { name: "Safepay", status: "online", color: "bg-green-500" },
                  { name: "Easypaisa", status: "online", color: "bg-green-500" },
                  { name: "JazzCash", status: "offline", color: "bg-red-500" }
                ].map((provider) => (
                  <div key={provider.name} className="flex items-center justify-between">
                    <span className="text-sm">{provider.name}</span>
                    <div className="flex items-center space-x-2">
                      <div className={`w-2 h-2 rounded-full ${provider.color}`}></div>
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