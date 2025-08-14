import { formatCurrency } from "./utils";

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  address?: string | null;
  businessId: string;
  totalSpent: number;
  totalOrders: number;
  lastOrderAt?: string | Date | null;
  status: string;
  metadata?: Record<string, unknown>;
  createdAt: string | Date;
  updatedAt: string | Date;
}

export interface CustomerStats {
  totalCustomers: number;
  activeCustomers: number;
  totalRevenue: number;
  averageOrderValue: number;
  activePercentage: number;
}

export function calculateCustomerStats(customers: Customer[]): CustomerStats {
  const totalCustomers = customers.length;
  const activeCustomers = customers.filter(c => c.status === 'ACTIVE').length;
  const totalRevenue = customers.reduce((sum, c) => sum + c.totalSpent, 0);
  const totalOrders = customers.reduce((sum, c) => sum + c.totalOrders, 0);
  const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;
  const activePercentage = totalCustomers > 0 ? (activeCustomers / totalCustomers) * 100 : 0;

  return {
    totalCustomers,
    activeCustomers,
    totalRevenue,
    averageOrderValue,
    activePercentage
  };
}

export function filterCustomers(
  customers: Customer[],
  searchQuery: string,
  filterStatus: string,
  dateRange: { start: string; end: string }
): Customer[] {
  let filtered = [...customers];

  // Search filter
  if (searchQuery) {
    const query = searchQuery.toLowerCase();
    filtered = filtered.filter(customer => 
      customer.name.toLowerCase().includes(query) ||
      customer.email.toLowerCase().includes(query) ||
      (customer.phone && customer.phone.toLowerCase().includes(query)) ||
      (customer.address && customer.address.toLowerCase().includes(query))
    );
  }

  // Status filter
  if (filterStatus !== "all") {
    filtered = filtered.filter(customer => customer.status === filterStatus);
  }

  // Date range filter (based on join date)
  if (dateRange.start || dateRange.end) {
    filtered = filtered.filter(customer => {
      const customerDate = new Date(customer.createdAt);
      const startDate = dateRange.start ? new Date(dateRange.start) : null;
      const endDate = dateRange.end ? new Date(dateRange.end) : null;

      if (startDate && endDate) {
        return customerDate >= startDate && customerDate <= endDate;
      } else if (startDate) {
        return customerDate >= startDate;
      } else if (endDate) {
        return customerDate <= endDate;
      }
      return true;
    });
  }

  return filtered;
}

export function formatCustomerAmount(amount: number): string {
  return formatCurrency(amount);
}

export function getCustomerStatusBadgeVariant(status: string): "default" | "secondary" | "destructive" {
  switch (status) {
    case "ACTIVE":
      return "default";
    case "INACTIVE":
      return "secondary";
    case "BLOCKED":
      return "destructive";
    default:
      return "secondary";
  }
}

export function formatCustomerDate(dateInput: string | Date): {
  date: string;
  time: string;
} {
  const date = new Date(dateInput);
  return {
    date: date.toLocaleDateString(),
    time: date.toLocaleTimeString()
  };
}

export function formatPhoneNumber(phone: string | null): string {
  if (!phone) return "N/A";
  return phone;
}

export function formatAddress(address: string | null): string {
  if (!address) return "N/A";
  return address;
} 