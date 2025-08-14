"use client";

import { useState, useEffect, useCallback, memo } from "react";
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

const MetricCard = memo(({ metric }: { 
  metric: {
    title: string;
    value: string;
    change: string;
    trend: string;
    icon: React.ComponentType<{ className?: string }>;
    color: string;
  }
}) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
      <metric.icon className="h-4 w-4 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{metric.value}</div>
      <p className="text-xs text-muted-foreground flex items-center">
        {metric.trend === "up" ? (
          <ArrowUpRight className="h-3 w-3 text-green-600 mr-1" />
        ) : (
          <ArrowDownRight className="h-3 w-3 text-red-600 mr-1" />
        )}
        {metric.change} from last month
      </p>
    </CardContent>
  </Card>
));

MetricCard.displayName = 'MetricCard';

export const AnalyticsClient = memo(function AnalyticsClient() {
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState("30");
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethodData[]>([]);
  const [topProducts, setTopProducts] = useState<TopProductData[]>([]);
  const [customerSegments, setCustomerSegments] = useState<CustomerSegmentData[]>([]);
  const [recentActivity, setRecentActivity] = useState<RecentActivityData[]>([]);

  const fetchAnalytics = useCallback(async () => {
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
  }, [period]);

  useEffect(() => {
    fetchAnalytics();
  }, [period]);

  const handleExport = useCallback(async () => {
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
  }, []);

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
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Analytics</h1>
            <p className="text-sm sm:text-base text-gray-600 mt-1">Track your business performance and insights</p>
          </div>
          <Button onClick={handleExport} className="mt-4 sm:mt-0">
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </Button>
        </div>
      </div>

      {/* Period Selector */}
      <div className="mb-6">
        <div className="flex space-x-2">
          {["7", "30", "90"].map((p) => (
            <Button
              key={p}
              variant={period === p ? "default" : "outline"}
              size="sm"
              onClick={() => setPeriod(p)}
            >
              {p} Days
            </Button>
          ))}
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 lg:mb-8">
        {metrics.map((metric, index) => (
          <MetricCard key={index} metric={metric} />
        ))}
      </div>

      {/* Charts and Tables */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8 mb-6 lg:mb-8">
        {/* Payment Methods */}
        <Card>
          <CardHeader>
            <CardTitle>Payment Methods</CardTitle>
            <CardDescription>Distribution of successful payments by provider</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {paymentMethods.map((method) => (
                <div key={method.provider} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-full ${method.color}`}></div>
                    <span className="text-sm">{method.provider}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">{method.count}</div>
                    <div className="text-xs text-gray-500">{method.percentage.toFixed(1)}%</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Products */}
        <Card>
          <CardHeader>
            <CardTitle>Top Products</CardTitle>
            <CardDescription>Best performing payment links</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topProducts.slice(0, 5).map((product, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{product.name}</p>
                    <p className="text-xs text-gray-500">{product.sales} sales</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">{formatCurrency(product.revenue)}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest transactions and activities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentActivity.slice(0, 10).map((activity, index) => (
              <div key={index} className="flex items-center space-x-4 p-3 border rounded-lg">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <CreditCard className="h-5 w-5 text-gray-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{activity.description}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="text-sm font-medium">{activity.amount}</div>
                  <Badge 
                    variant={activity.status === "COMPLETED" ? "default" : "secondary"}
                    className="text-xs"
                  >
                    {activity.status.toLowerCase()}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}); 