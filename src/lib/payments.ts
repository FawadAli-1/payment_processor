import { formatCurrency } from "./utils";

export interface Payment {
  id: string;
  amount: number;
  currency: string;
  status: string;
  provider: string;
  customerName?: string | null;
  customerEmail?: string | null;
  description?: string | null;
  createdAt: string | Date;
  updatedAt: string | Date;
}

export interface PaymentStats {
  totalRevenue: number;
  totalPayments: number;
  successfulPayments: number;
  pendingPayments: number;
  failedPayments: number;
  successRate: number;
  pendingRate: number;
  failureRate: number;
}

export function calculatePaymentStats(payments: Payment[]): PaymentStats {
  const totalRevenue = payments
    .filter(p => p.status === 'COMPLETED')
    .reduce((sum, p) => sum + p.amount, 0);

  const totalPayments = payments.length;
  const successfulPayments = payments.filter(p => p.status === 'COMPLETED').length;
  const pendingPayments = payments.filter(p => p.status === 'PENDING').length;
  const failedPayments = payments.filter(p => p.status === 'FAILED').length;

  const successRate = totalPayments > 0 ? (successfulPayments / totalPayments) * 100 : 0;
  const pendingRate = totalPayments > 0 ? (pendingPayments / totalPayments) * 100 : 0;
  const failureRate = totalPayments > 0 ? (failedPayments / totalPayments) * 100 : 0;

  return {
    totalRevenue,
    totalPayments,
    successfulPayments,
    pendingPayments,
    failedPayments,
    successRate,
    pendingRate,
    failureRate
  };
}

export function filterPayments(
  payments: Payment[],
  searchQuery: string,
  filterStatus: string,
  dateRange: { start: string; end: string }
): Payment[] {
  let filtered = [...payments];

  // Search filter
  if (searchQuery) {
    const query = searchQuery.toLowerCase();
    filtered = filtered.filter(payment => 
      payment.id.toLowerCase().includes(query) ||
      (payment.customerName && payment.customerName.toLowerCase().includes(query)) ||
      (payment.customerEmail && payment.customerEmail.toLowerCase().includes(query)) ||
      (payment.description && payment.description.toLowerCase().includes(query)) ||
      payment.provider.toLowerCase().includes(query)
    );
  }

  // Status filter
  if (filterStatus !== "all") {
    filtered = filtered.filter(payment => payment.status === filterStatus);
  }

  // Date range filter
  if (dateRange.start || dateRange.end) {
    filtered = filtered.filter(payment => {
      const paymentDate = new Date(payment.createdAt);
      const startDate = dateRange.start ? new Date(dateRange.start) : null;
      const endDate = dateRange.end ? new Date(dateRange.end) : null;

      if (startDate && endDate) {
        return paymentDate >= startDate && paymentDate <= endDate;
      } else if (startDate) {
        return paymentDate >= startDate;
      } else if (endDate) {
        return paymentDate <= endDate;
      }
      return true;
    });
  }

  return filtered;
}

export function formatPaymentAmount(amount: number): string {
  return formatCurrency(amount);
}

export function getPaymentStatusBadgeVariant(status: string): "default" | "secondary" | "destructive" {
  switch (status) {
    case "COMPLETED":
      return "default";
    case "PENDING":
      return "secondary";
    case "FAILED":
      return "destructive";
    default:
      return "secondary";
  }
}

export function formatPaymentDate(dateInput: string | Date): {
  date: string;
  time: string;
} {
  const date = new Date(dateInput);
  return {
    date: date.toLocaleDateString(),
    time: date.toLocaleTimeString()
  };
} 