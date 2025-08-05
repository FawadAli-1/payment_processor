"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Users, 
  Search,
  Filter,
  Calendar,
  DollarSign,
  Mail,
  Phone,
  MapPin,
  Download
} from "lucide-react";
import { CreateCustomerDialog } from "@/components/shared/CreateCustomerDialog";
import { CustomerActions } from "@/components/shared/CustomerActions";
import { EditCustomerDialog } from "@/components/shared/EditCustomerDialog";
import { calculateCustomerStats, filterCustomers, formatCustomerAmount, getCustomerStatusBadgeVariant, formatPhoneNumber, formatAddress } from "@/lib/customers";
import { toast } from "sonner";

interface Customer {
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
  metadata?: any;
  createdAt: string | Date;
  updatedAt: string | Date;
}

export function CustomersClient() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [filteredCustomers, setFilteredCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [dateRange, setDateRange] = useState({ start: "", end: "" });
  const [editCustomer, setEditCustomer] = useState<Customer | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const fetchCustomers = async () => {
    try {
      const params = new URLSearchParams();
      if (searchQuery) params.append("search", searchQuery);
      if (filterStatus !== "all") params.append("status", filterStatus);
      if (dateRange.start) params.append("startDate", dateRange.start);
      if (dateRange.end) params.append("endDate", dateRange.end);

      const response = await fetch(`/api/customers?${params.toString()}`);
      
      if (!response.ok) {
        throw new Error("Failed to fetch customers");
      }

      const data = await response.json();
      setCustomers(data.customers);
      setFilteredCustomers(data.customers);
    } catch (error) {
      console.error("Error fetching customers:", error);
      toast.error("Failed to fetch customers");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  useEffect(() => {
    const filtered = filterCustomers(customers, searchQuery, filterStatus, dateRange);
    setFilteredCustomers(filtered);
  }, [customers, searchQuery, filterStatus, dateRange]);

  const handleCustomerCreated = () => {
    fetchCustomers();
  };

  const handleCustomerUpdated = () => {
    fetchCustomers();
    setEditCustomer(null);
  };

  const handleEdit = (customer: Customer) => {
    setEditCustomer(customer);
    setEditDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setCustomers(prev => prev.filter(customer => customer.id !== id));
    setFilteredCustomers(prev => prev.filter(customer => customer.id !== id));
  };

  const handleExport = async () => {
    try {
      const response = await fetch('/api/customers/export');
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `customers-${new Date().toISOString().split('T')[0]}.csv`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
        toast.success("Customers exported successfully!");
      } else {
        toast.error("Failed to export customers");
      }
    } catch (error) {
      toast.error("Failed to export customers");
    }
  };

  const stats = calculateCustomerStats(customers);

  if (loading) {
    return (
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading customers...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6 lg:mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Customers</h1>
            <p className="text-sm sm:text-base text-gray-600 mt-1">Manage your customer relationships and data</p>
          </div>
          <CreateCustomerDialog onCustomerCreated={handleCustomerCreated} />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Customers</p>
                <p className="text-xl font-bold">{stats.totalCustomers}</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Customers</p>
                <p className="text-xl font-bold">{stats.activeCustomers}</p>
              </div>
              <Badge variant="default" className="h-8 px-3">{stats.activePercentage.toFixed(1)}%</Badge>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Revenue</p>
                <p className="text-xl font-bold">{formatCustomerAmount(stats.totalRevenue)}</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg. Order Value</p>
                <p className="text-xl font-bold">{formatCustomerAmount(stats.averageOrderValue)}</p>
              </div>
              <Calendar className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search customers..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <div className="flex gap-2">
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="date"
                  className="pl-10"
                  value={dateRange.start}
                  onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
                />
              </div>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="date"
                  className="pl-10"
                  value={dateRange.end}
                  onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
                />
              </div>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="all">All Status</option>
                <option value="ACTIVE">Active</option>
                <option value="INACTIVE">Inactive</option>
                <option value="BLOCKED">Blocked</option>
              </select>
              <Button variant="outline" onClick={handleExport}>
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Customers Table */}
      <Card>
        <CardHeader>
          <CardTitle>Customer List</CardTitle>
          <CardDescription>
            All customers and their transaction history
          </CardDescription>
        </CardHeader>
        <CardContent>
          {filteredCustomers.length === 0 ? (
            <div className="text-center py-8">
              <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No customers found</h3>
              <p className="text-gray-600 mb-4">
                {customers.length === 0 
                  ? "Add your first customer to get started."
                  : "No customers match your current filters."
                }
              </p>
              {customers.length === 0 && (
                <CreateCustomerDialog onCustomerCreated={handleCustomerCreated} />
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3 text-sm font-medium text-gray-600">Customer</th>
                    <th className="text-left p-3 text-sm font-medium text-gray-600">Contact</th>
                    <th className="text-left p-3 text-sm font-medium text-gray-600">Total Spent</th>
                    <th className="text-left p-3 text-sm font-medium text-gray-600">Orders</th>
                    <th className="text-left p-3 text-sm font-medium text-gray-600">Status</th>
                    <th className="text-left p-3 text-sm font-medium text-gray-600">Last Order</th>
                    <th className="text-left p-3 text-sm font-medium text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCustomers.map((customer) => (
                    <tr key={customer.id} className="border-b hover:bg-gray-50">
                      <td className="p-3">
                        <div>
                          <p className="font-medium text-sm">{customer.name}</p>
                          <p className="text-xs text-gray-500">ID: {customer.id}</p>
                        </div>
                      </td>
                      <td className="p-3">
                        <div className="space-y-1">
                          <div className="flex items-center space-x-1">
                            <Mail className="h-3 w-3 text-gray-400" />
                            <p className="text-xs text-gray-600">{customer.email}</p>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Phone className="h-3 w-3 text-gray-400" />
                            <p className="text-xs text-gray-600">{formatPhoneNumber(customer.phone)}</p>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MapPin className="h-3 w-3 text-gray-400" />
                            <p className="text-xs text-gray-600">{formatAddress(customer.address)}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-3">
                        <p className="font-medium text-sm">{formatCustomerAmount(customer.totalSpent)}</p>
                      </td>
                      <td className="p-3">
                        <p className="text-sm">{customer.totalOrders}</p>
                      </td>
                      <td className="p-3">
                        <Badge 
                          variant={getCustomerStatusBadgeVariant(customer.status)}
                          className="text-xs"
                        >
                          {customer.status}
                        </Badge>
                      </td>
                      <td className="p-3">
                        <div>
                          <p className="text-sm">
                            {customer.lastOrderAt 
                              ? new Date(customer.lastOrderAt).toLocaleDateString()
                              : "No orders"
                            }
                          </p>
                          <p className="text-xs text-gray-500">
                            Joined {new Date(customer.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </td>
                      <td className="p-3">
                        <CustomerActions
                          customer={customer}
                          onEdit={handleEdit}
                          onDelete={handleDelete}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <EditCustomerDialog
        customer={editCustomer}
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        onCustomerUpdated={handleCustomerUpdated}
      />
    </div>
  );
} 