"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { 
  CreditCard, 
  TrendingUp, 
  Users, 
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  Plus,
  Link,
  ExternalLink
} from "lucide-react";
import { formatCurrency } from "@/lib/utils";

interface DashboardClientProps {
  stats: any;
  recentTransactions: any[];
  providers: any[];
}

export function DashboardClient({ stats, recentTransactions, providers }: DashboardClientProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [paymentLinkData, setPaymentLinkData] = useState({
    title: "",
    description: "",
    amount: "",
    currency: "PKR"
  });

  const handleCreatePaymentLink = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/payment-links/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(paymentLinkData),
      });

      if (response.ok) {
        const result = await response.json();
        // Reset form
        setPaymentLinkData({
          title: "",
          description: "",
          amount: "",
          currency: "PKR"
        });
        // Redirect to links page or show success message
        router.push("/dashboard/links");
      } else {
        const error = await response.json();
        alert(error.error || "Failed to create payment link");
      }
    } catch (error) {
      alert("Failed to create payment link");
    } finally {
      setIsLoading(false);
    }
  };

  const getChangeIcon = (change: number) => {
    if (change > 0) return <ArrowUpRight className="h-3 w-3 text-green-600 mr-1" />;
    if (change < 0) return <ArrowDownRight className="h-3 w-3 text-red-600 mr-1" />;
    return null;
  };

  const getChangeText = (change: number) => {
    if (change > 0) return `+${change.toFixed(1)}% from last month`;
    if (change < 0) return `${change.toFixed(1)}% from last month`;
    return "No change from last month";
  };

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
            <div className="text-xl sm:text-2xl font-bold">{formatCurrency(stats.revenue.current)}</div>
            <p className="text-xs text-muted-foreground flex items-center">
              {getChangeIcon(stats.revenue.change)}
              {getChangeText(stats.revenue.change)}
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
              {getChangeIcon(stats.transactions.change)}
              {getChangeText(stats.transactions.change)}
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
              {getChangeIcon(stats.successRate.change)}
              {getChangeText(stats.successRate.change)}
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
              {getChangeIcon(stats.customers.change)}
              {getChangeText(stats.customers.change)}
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
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => router.push("/dashboard/payments")}
                >
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
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-full justify-start" variant="outline">
                    <Plus className="mr-2 h-4 w-4" />
                    <span className="hidden sm:inline">Create Payment Link</span>
                    <span className="sm:hidden">Payment Link</span>
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create Payment Link</DialogTitle>
                    <DialogDescription>
                      Create a shareable payment link for your customers
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="title">Title</Label>
                      <Input
                        id="title"
                        value={paymentLinkData.title}
                        onChange={(e) => setPaymentLinkData({...paymentLinkData, title: e.target.value})}
                        placeholder="Payment for services"
                      />
                    </div>
                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Input
                        id="description"
                        value={paymentLinkData.description}
                        onChange={(e) => setPaymentLinkData({...paymentLinkData, description: e.target.value})}
                        placeholder="Optional description"
                      />
                    </div>
                    <div>
                      <Label htmlFor="amount">Amount (PKR)</Label>
                      <Input
                        id="amount"
                        type="number"
                        value={paymentLinkData.amount}
                        onChange={(e) => setPaymentLinkData({...paymentLinkData, amount: e.target.value})}
                        placeholder="1000"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button onClick={handleCreatePaymentLink} disabled={isLoading}>
                      {isLoading ? "Creating..." : "Create Link"}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <Button 
                className="w-full justify-start" 
                variant="outline"
                onClick={() => router.push("/dashboard/checkout")}
              >
                <CreditCard className="mr-2 h-4 w-4" />
                <span className="hidden sm:inline">New Checkout Page</span>
                <span className="sm:hidden">Checkout</span>
              </Button>

              <Button 
                className="w-full justify-start" 
                variant="outline"
                onClick={() => router.push("/dashboard/customers")}
              >
                <Users className="mr-2 h-4 w-4" />
                <span className="hidden sm:inline">View Customers</span>
                <span className="sm:hidden">Customers</span>
              </Button>

              <Button 
                className="w-full justify-start" 
                variant="outline"
                onClick={() => router.push("/dashboard/analytics")}
              >
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