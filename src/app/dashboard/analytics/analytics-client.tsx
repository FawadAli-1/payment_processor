"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  TrendingUp, 
  DollarSign,
  Users,
  CreditCard,
  BarChart3,
  Download,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { toast } from "sonner";

interface AnalyticsData {
  totalRevenue: number;
  totalTransactions: number;
  activeCustomers: number;
  successRate: number;
  revenueChange: number;
  transactionsChange: number;
  customersChange: number;
  successRateChange: number;
}

interface PaymentMethodData {
  provider: string;
  count: number;
  percentage: number;
  color: string;
}

interface TopProductData {
  name: string;
  revenue: number;
  sales: number;
}

interface CustomerSegmentData {
  segment: string;
  count: number;
  revenue: number;
  color: string;
}

interface RecentActivityData {
  type: string;
  description: string;
  amount: string;
  time: string;
  status: string;
}

export function AnalyticsClient() {
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState("30");
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethodData[]>([]);
  const [topProducts, setTopProducts] = useState<TopProductData[]>([]);
  const [customerSegments, setCustomerSegments] = useState<CustomerSegmentData[]>([]);
  const [recentActivity, setRecentActivity] = useState<RecentActivityData[]>([]);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/analytics?period=${period}`);
      
      if (!response.ok) {
        throw new Error("Failed to fetch analytics");
      }

      const data = await response.json();
      setAnalytics(data.analytics);
      setPaymentMethods(data.paymentMethods);
      setTopProducts(data.topProducts);
      setCustomerSegments(data.customerSegments);
      setRecentActivity(data.recentActivity);
    } catch (error) {
      console.error("Error fetching analytics:", error);
      toast.error("Failed to fetch analytics");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, [period, fetchAnalytics]);

  const handleExport = async () => {
    try {
      const response = await fetch('/api/analytics/export');
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `analytics-${new Date().toISOString().split('T')[0]}.csv`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
        toast.success("Analytics exported successfully!");
      } else {
        toast.error("Failed to export analytics");
      }
    } catch {
      toast.error("Failed to export analytics");
    }
  };

  if (loading) {
    return (
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading analytics...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="text-center py-8">
          <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No analytics data available</h3>
          <p className="text-gray-600">Start creating payments and customers to see analytics.</p>
        </div>
      </div>
    );
  }

  const metrics = [
    {
      title: "Total Revenue",
      value: formatCurrency(analytics.totalRevenue),
      change: `${analytics.revenueChange >= 0 ? '+' : ''}${analytics.revenueChange.toFixed(1)}%`,
      trend: analytics.revenueChange >= 0 ? "up" : "down",
      icon: DollarSign,
      color: "text-green-600"
    },
    {
      title: "Total Transactions",
      value: analytics.totalTransactions.toString(),
      change: `${analytics.transactionsChange >= 0 ? '+' : ''}${analytics.transactionsChange.toFixed(1)}%`,
      trend: analytics.transactionsChange >= 0 ? "up" : "down",
      icon: CreditCard,
      color: "text-blue-600"
    },
    {
      title: "Active Customers",
      value: analytics.activeCustomers.toString(),
      change: `${analytics.customersChange >= 0 ? '+' : ''}${analytics.customersChange.toFixed(1)}%`,
      trend: analytics.customersChange >= 0 ? "up" : "down",
      icon: Users,
      color: "text-purple-600"
    },
    {
      title: "Success Rate",
      value: `${analytics.successRate.toFixed(1)}%`,
      change: `${analytics.successRateChange >= 0 ? '+' : ''}${analytics.successRateChange.toFixed(1)}%`,
      trend: analytics.successRateChange >= 0 ? "up" : "down",
      icon: TrendingUp,
      color: "text-orange-600"
    }
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6 lg:mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Analytics</h1>
            <p className="text-sm sm:text-base text-gray-600 mt-1">Track your business performance and insights</p>
          </div>
          <div className="flex gap-2">
            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              className="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option value="7">Last 7 Days</option>
              <option value="30">Last 30 Days</option>
              <option value="90">Last 90 Days</option>
            </select>
            <Button variant="outline" onClick={handleExport}>
              <Download className="mr-2 h-4 w-4" />
              Export Report
            </Button>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {metrics.map((metric) => (
          <Card key={metric.title}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{metric.title}</p>
                  <p className="text-xl font-bold">{metric.value}</p>
                  <div className="flex items-center mt-1">
                    {metric.trend === "up" ? (
                      <ArrowUpRight className="h-3 w-3 text-green-600 mr-1" />
                    ) : (
                      <ArrowDownRight className="h-3 w-3 text-red-600 mr-1" />
                    )}
                    <span className={`text-xs ${metric.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                      {metric.change}
                    </span>
                  </div>
                </div>
                <metric.icon className={`h-8 w-8 ${metric.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts and Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Revenue Chart */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Overview</CardTitle>
              <CardDescription>
                Revenue trends for the selected period
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                <div className="text-center">
                  <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500">Chart component will be integrated here</p>
                  <p className="text-sm text-gray-400">Revenue visualization</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Payment Methods */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Payment Methods</CardTitle>
              <CardDescription>
                Distribution by payment provider
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {paymentMethods.map((method) => (
                  <div key={method.provider} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className={`w-3 h-3 rounded-full ${method.color}`}></div>
                      <span className="text-sm">{method.provider}</span>
                    </div>
                    <span className="text-sm font-medium">{method.percentage}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Additional Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {/* Top Products */}
        <Card>
          <CardHeader>
            <CardTitle>Top Products</CardTitle>
            <CardDescription>
              Best performing products
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topProducts.length === 0 ? (
                <p className="text-sm text-gray-500 text-center py-4">No products with revenue yet</p>
              ) : (
                topProducts.map((product, index) => (
                  <div key={product.name} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-6 h-6 bg-gray-100 rounded flex items-center justify-center">
                        <span className="text-xs font-medium">{index + 1}</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium">{product.name}</p>
                        <p className="text-xs text-gray-500">{product.sales} sales</p>
                      </div>
                    </div>
                    <p className="text-sm font-medium">{formatCurrency(product.revenue)}</p>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* Customer Segments */}
        <Card>
          <CardHeader>
            <CardTitle>Customer Segments</CardTitle>
            <CardDescription>
              Customer distribution by value
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {customerSegments.map((segment) => (
                <div key={segment.segment} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-full ${segment.color}`}></div>
                    <span className="text-sm">{segment.segment}</span>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{segment.count} customers</p>
                    <p className="text-xs text-gray-500">{formatCurrency(segment.revenue)}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Latest business activities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentActivity.length === 0 ? (
                <p className="text-sm text-gray-500 text-center py-4">No recent activity</p>
              ) : (
                recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 rounded-full bg-blue-500 mt-2"></div>
                    <div className="flex-1">
                      <p className="text-sm">{activity.description}</p>
                      <div className="flex items-center justify-between mt-1">
                        <p className="text-xs text-gray-500">{activity.time}</p>
                        <Badge 
                          variant={
                            activity.status === "completed" ? "default" :
                            activity.status === "failed" ? "destructive" :
                            activity.status === "active" ? "secondary" : "outline"
                          }
                          className="text-xs"
                        >
                          {activity.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 