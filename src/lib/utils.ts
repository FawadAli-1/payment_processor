import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-PK', {
    style: 'currency',
    currency: 'PKR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-PK', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date);
}

export function formatDateTime(date: Date): string {
  return new Intl.DateTimeFormat('en-PK', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}

export function calculatePercentageChange(current: number, previous: number): number {
  if (previous === 0) return current > 0 ? 100 : 0;
  return ((current - previous) / previous) * 100;
}

export function getMonthRange(monthsBack: number = 1) {
  const now = new Date();
  const startDate = new Date(now.getFullYear(), now.getMonth() - monthsBack, 1);
  const endDate = new Date(now.getFullYear(), now.getMonth(), 0);
  return { startDate, endDate };
}

export function calculateStats(payments: any[], customers: any[]) {
  const now = new Date();
  const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  // Current month stats
  const currentMonthPayments = payments.filter(p => new Date(p.createdAt) >= thisMonth);
  const currentMonthRevenue = currentMonthPayments
    .filter(p => p.status === 'COMPLETED')
    .reduce((sum, p) => sum + p.amount, 0);
  const currentMonthTransactions = currentMonthPayments.length;
  const currentMonthSuccessRate = currentMonthTransactions > 0 
    ? (currentMonthPayments.filter(p => p.status === 'COMPLETED').length / currentMonthTransactions) * 100 
    : 0;

  // Last month stats
  const lastMonthPayments = payments.filter(p => {
    const paymentDate = new Date(p.createdAt);
    return paymentDate >= lastMonth && paymentDate < thisMonth;
  });
  const lastMonthRevenue = lastMonthPayments
    .filter(p => p.status === 'COMPLETED')
    .reduce((sum, p) => sum + p.amount, 0);
  const lastMonthTransactions = lastMonthPayments.length;
  const lastMonthSuccessRate = lastMonthTransactions > 0 
    ? (lastMonthPayments.filter(p => p.status === 'COMPLETED').length / lastMonthTransactions) * 100 
    : 0;

  // Customer stats
  const currentMonthCustomers = customers.filter(c => new Date(c.createdAt) >= thisMonth).length;
  const lastMonthCustomers = customers.filter(c => {
    const customerDate = new Date(c.createdAt);
    return customerDate >= lastMonth && customerDate < thisMonth;
  }).length;

  return {
    revenue: {
      current: currentMonthRevenue,
      previous: lastMonthRevenue,
      change: calculatePercentageChange(currentMonthRevenue, lastMonthRevenue)
    },
    transactions: {
      current: currentMonthTransactions,
      previous: lastMonthTransactions,
      change: calculatePercentageChange(currentMonthTransactions, lastMonthTransactions)
    },
    successRate: {
      current: currentMonthSuccessRate,
      previous: lastMonthSuccessRate,
      change: calculatePercentageChange(currentMonthSuccessRate, lastMonthSuccessRate)
    },
    customers: {
      current: currentMonthCustomers,
      previous: lastMonthCustomers,
      change: calculatePercentageChange(currentMonthCustomers, lastMonthCustomers)
    }
  };
}
