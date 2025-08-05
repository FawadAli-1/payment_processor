import { formatCurrency } from "./utils";

export interface PaymentLink {
  id: string;
  title: string;
  description?: string | null;
  amount: number;
  currency: string;
  status: string;
  clicks: number;
  payments: PaymentLinkPayment[];
  businessId: string;
  expiresAt?: string | Date | null;
  url: string;
  createdAt: string | Date;
  updatedAt: string | Date;
}

export interface PaymentLinkPayment {
  id: string;
  amount: number;
  status: string;
  createdAt: string | Date;
}

export interface PaymentLinkStats {
  totalLinks: number;
  totalRevenue: number;
  totalClicks: number;
  conversionRate: number;
}

export function calculatePaymentLinkStats(paymentLinks: PaymentLink[]): PaymentLinkStats {
  const totalLinks = paymentLinks.length;
  const totalRevenue = paymentLinks.reduce((sum, link) => {
    return sum + link.payments
      .filter(p => p.status === 'COMPLETED')
      .reduce((linkSum, payment) => linkSum + payment.amount, 0);
  }, 0);
  
  const totalClicks = paymentLinks.reduce((sum, link) => sum + link.clicks, 0);
  const totalPayments = paymentLinks.reduce((sum, link) => 
    sum + link.payments.filter(p => p.status === 'COMPLETED').length, 0);
  
  const conversionRate = totalClicks > 0 ? (totalPayments / totalClicks) * 100 : 0;

  return {
    totalLinks,
    totalRevenue,
    totalClicks,
    conversionRate
  };
}

export function filterPaymentLinks(
  paymentLinks: PaymentLink[],
  searchQuery: string,
  filterStatus: string,
  dateRange: { start: string; end: string }
): PaymentLink[] {
  let filtered = [...paymentLinks];

  // Search filter
  if (searchQuery) {
    const query = searchQuery.toLowerCase();
    filtered = filtered.filter(link => 
      link.title.toLowerCase().includes(query) ||
      (link.description && link.description.toLowerCase().includes(query)) ||
      link.url.toLowerCase().includes(query)
    );
  }

  // Status filter
  if (filterStatus !== "all") {
    filtered = filtered.filter(link => link.status === filterStatus);
  }

  // Date range filter
  if (dateRange.start || dateRange.end) {
    filtered = filtered.filter(link => {
      const linkDate = new Date(link.createdAt);
      const startDate = dateRange.start ? new Date(dateRange.start) : null;
      const endDate = dateRange.end ? new Date(dateRange.end) : null;

      if (startDate && endDate) {
        return linkDate >= startDate && linkDate <= endDate;
      } else if (startDate) {
        return linkDate >= startDate;
      } else if (endDate) {
        return linkDate <= endDate;
      }
      return true;
    });
  }

  return filtered;
}

export function formatPaymentLinkAmount(amount: number): string {
  return formatCurrency(amount);
}

export function getPaymentLinkStatusBadgeVariant(status: string): "default" | "secondary" | "destructive" {
  switch (status) {
    case "ACTIVE":
      return "default";
    case "DRAFT":
      return "secondary";
    case "EXPIRED":
    case "INACTIVE":
      return "destructive";
    default:
      return "secondary";
  }
}

export function formatPaymentLinkDate(dateInput: string | Date): {
  date: string;
  time: string;
} {
  const date = new Date(dateInput);
  return {
    date: date.toLocaleDateString(),
    time: date.toLocaleTimeString()
  };
}

export function generatePaymentLinkUrl(id: string): string {
  return `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/pay/${id}`;
}

export function calculateConversionRate(clicks: number, payments: number): number {
  return clicks > 0 ? Math.round((payments / clicks) * 100) : 0;
} 