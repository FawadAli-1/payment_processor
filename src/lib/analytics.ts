import { formatCurrency } from "./utils";

export interface AnalyticsData {
  totalRevenue: number;
  totalTransactions: number;
  activeCustomers: number;
  successRate: number;
  revenueChange: number;
  transactionsChange: number;
  customersChange: number;
  successRateChange: number;
}

export interface PaymentMethodData {
  provider: string;
  count: number;
  percentage: number;
  color: string;
}

export interface TopProductData {
  name: string;
  revenue: number;
  sales: number;
}

export interface CustomerSegmentData {
  segment: string;
  count: number;
  revenue: number;
  color: string;
}

export interface RecentActivityData {
  type: string;
  description: string;
  amount: string;
  time: string;
  status: string;
}

export function calculateAnalyticsData(
  currentPayments: any[],
  previousPayments: any[],
  currentCustomers: any[],
  previousCustomers: any[]
): AnalyticsData {
  // Current period calculations
  const currentRevenue = currentPayments
    .filter(p => p.status === 'COMPLETED')
    .reduce((sum, p) => sum + p.amount, 0);
  
  const currentTransactions = currentPayments.length;
  const currentSuccessfulTransactions = currentPayments.filter(p => p.status === 'COMPLETED').length;
  const currentSuccessRate = currentTransactions > 0 ? (currentSuccessfulTransactions / currentTransactions) * 100 : 0;
  const currentActiveCustomers = currentCustomers.filter(c => c.status === 'ACTIVE').length;

  // Previous period calculations
  const previousRevenue = previousPayments
    .filter(p => p.status === 'COMPLETED')
    .reduce((sum, p) => sum + p.amount, 0);
  
  const previousTransactions = previousPayments.length;
  const previousSuccessfulTransactions = previousPayments.filter(p => p.status === 'COMPLETED').length;
  const previousSuccessRate = previousTransactions > 0 ? (previousSuccessfulTransactions / previousTransactions) * 100 : 0;
  const previousActiveCustomers = previousCustomers.filter(c => c.status === 'ACTIVE').length;

  // Calculate changes
  const revenueChange = previousRevenue > 0 ? ((currentRevenue - previousRevenue) / previousRevenue) * 100 : 0;
  const transactionsChange = previousTransactions > 0 ? ((currentTransactions - previousTransactions) / previousTransactions) * 100 : 0;
  const customersChange = previousActiveCustomers > 0 ? ((currentActiveCustomers - previousActiveCustomers) / previousActiveCustomers) * 100 : 0;
  const successRateChange = previousSuccessRate > 0 ? currentSuccessRate - previousSuccessRate : 0;

  return {
    totalRevenue: currentRevenue,
    totalTransactions: currentTransactions,
    activeCustomers: currentActiveCustomers,
    successRate: currentSuccessRate,
    revenueChange,
    transactionsChange,
    customersChange,
    successRateChange
  };
}

export function calculatePaymentMethodDistribution(payments: any[]): PaymentMethodData[] {
  const completedPayments = payments.filter(p => p.status === 'COMPLETED');
  const totalPayments = completedPayments.length;

  if (totalPayments === 0) {
    return [
      { provider: "PayFast", count: 0, percentage: 0, color: "bg-blue-500" },
      { provider: "Safepay", count: 0, percentage: 0, color: "bg-green-500" },
      { provider: "Easypaisa", count: 0, percentage: 0, color: "bg-purple-500" },
      { provider: "JazzCash", count: 0, percentage: 0, color: "bg-orange-500" }
    ];
  }

  const providerCounts = completedPayments.reduce((acc, payment) => {
    acc[payment.provider] = (acc[payment.provider] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const colors = {
    PAYFAST: "bg-blue-500",
    SAFEPAY: "bg-green-500",
    EASYPAISA: "bg-purple-500",
    JAZZCASH: "bg-orange-500"
  };

  return Object.entries(providerCounts).map(([provider, count]) => ({
    provider: provider.charAt(0) + provider.slice(1).toLowerCase(),
    count,
    percentage: Math.round((count / totalPayments) * 100),
    color: colors[provider as keyof typeof colors] || "bg-gray-500"
  }));
}

export function calculateTopProducts(paymentLinks: any[]): TopProductData[] {
  const products = paymentLinks.reduce((acc, link) => {
    const completedPayments = link.payments?.filter((p: any) => p.status === 'COMPLETED') || [];
    const revenue = completedPayments.reduce((sum: number, p: any) => sum + p.amount, 0);
    const sales = completedPayments.length;

    if (revenue > 0) {
      acc.push({
        name: link.title,
        revenue,
        sales
      });
    }
    return acc;
  }, [] as TopProductData[]);

  return products
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 4);
}

export function calculateCustomerSegments(customers: any[]): CustomerSegmentData[] {
  const activeCustomers = customers.filter(c => c.status === 'ACTIVE');
  
  if (activeCustomers.length === 0) {
    return [
      { segment: "High Value", count: 0, revenue: 0, color: "bg-green-500" },
      { segment: "Medium Value", count: 0, revenue: 0, color: "bg-blue-500" },
      { segment: "Low Value", count: 0, revenue: 0, color: "bg-orange-500" }
    ];
  }

  // Calculate total spent for each customer
  const customersWithSpending = activeCustomers.map(customer => ({
    ...customer,
    totalSpent: customer.totalSpent || 0
  }));

  // Sort by total spent to find thresholds
  const sortedCustomers = customersWithSpending.sort((a, b) => b.totalSpent - a.totalSpent);
  const totalCustomers = sortedCustomers.length;
  
  // Define segments (top 20%, next 30%, remaining 50%)
  const highValueCount = Math.ceil(totalCustomers * 0.2);
  const mediumValueCount = Math.ceil(totalCustomers * 0.3);

  const highValue = sortedCustomers.slice(0, highValueCount);
  const mediumValue = sortedCustomers.slice(highValueCount, highValueCount + mediumValueCount);
  const lowValue = sortedCustomers.slice(highValueCount + mediumValueCount);

  return [
    {
      segment: "High Value",
      count: highValue.length,
      revenue: highValue.reduce((sum, c) => sum + c.totalSpent, 0),
      color: "bg-green-500"
    },
    {
      segment: "Medium Value",
      count: mediumValue.length,
      revenue: mediumValue.reduce((sum, c) => sum + c.totalSpent, 0),
      color: "bg-blue-500"
    },
    {
      segment: "Low Value",
      count: lowValue.length,
      revenue: lowValue.reduce((sum, c) => sum + c.totalSpent, 0),
      color: "bg-orange-500"
    }
  ];
}

export function generateRecentActivity(
  payments: any[],
  customers: any[],
  paymentLinks: any[]
): RecentActivityData[] {
  const activities: RecentActivityData[] = [];

  // Add recent payments
  const recentPayments = payments
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  recentPayments.forEach(payment => {
    const timeAgo = getTimeAgo(new Date(payment.createdAt));
    activities.push({
      type: "payment",
      description: `Payment ${payment.status === 'COMPLETED' ? 'received' : 'failed'} from ${payment.customerName || 'Customer'}`,
      amount: formatCurrency(payment.amount),
      time: timeAgo,
      status: payment.status.toLowerCase()
    });
  });

  // Add recent customers
  const recentCustomers = customers
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 3);

  recentCustomers.forEach(customer => {
    const timeAgo = getTimeAgo(new Date(customer.createdAt));
    activities.push({
      type: "customer",
      description: "New customer registered",
      amount: customer.name,
      time: timeAgo,
      status: "active"
    });
  });

  // Add recent payment links
  const recentLinks = paymentLinks
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 2);

  recentLinks.forEach(link => {
    const timeAgo = getTimeAgo(new Date(link.createdAt));
    activities.push({
      type: "link",
      description: "Payment link created",
      amount: link.title,
      time: timeAgo,
      status: "created"
    });
  });

  // Sort all activities by time and take the most recent 4
  return activities
    .sort((a, b) => {
      const timeA = getTimeInMinutes(a.time);
      const timeB = getTimeInMinutes(b.time);
      return timeA - timeB;
    })
    .slice(0, 4);
}

function getTimeAgo(date: Date): string {
  const now = new Date();
  const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));

  if (diffInMinutes < 1) return "Just now";
  if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`;
  
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours} hours ago`;
  
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) return `${diffInDays} days ago`;
  
  return `${Math.floor(diffInDays / 7)} weeks ago`;
}

function getTimeInMinutes(timeString: string): number {
  if (timeString === "Just now") return 0;
  
  const match = timeString.match(/(\d+)\s+(minutes?|hours?|days?|weeks?)\s+ago/);
  if (!match) return 0;
  
  const value = parseInt(match[1]);
  const unit = match[2];
  
  switch (unit) {
    case "minute":
    case "minutes":
      return value;
    case "hour":
    case "hours":
      return value * 60;
    case "day":
    case "days":
      return value * 60 * 24;
    case "week":
    case "weeks":
      return value * 60 * 24 * 7;
    default:
      return 0;
  }
} 