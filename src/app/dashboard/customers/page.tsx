import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Users, 
  Search,
  Filter,
  Plus,
  Mail,
  Phone,
  MapPin,
  Calendar,
  DollarSign,
  Eye,
  Edit,
  MoreHorizontal
} from "lucide-react";

export default function CustomersPage() {
  const customers = [
    {
      id: "cust_001",
      name: "Ahmed Khan",
      email: "ahmed@example.com",
      phone: "+92 300 1234567",
      location: "Karachi, Pakistan",
      totalSpent: "₹15,500",
      totalOrders: 8,
      lastOrder: "2024-01-15",
      status: "active",
      joinDate: "2023-06-15"
    },
    {
      id: "cust_002",
      name: "Fatima Ali",
      email: "fatima@example.com",
      phone: "+92 301 2345678",
      location: "Lahore, Pakistan",
      totalSpent: "₹8,200",
      totalOrders: 5,
      lastOrder: "2024-01-12",
      status: "active",
      joinDate: "2023-08-20"
    },
    {
      id: "cust_003",
      name: "Usman Ahmed",
      email: "usman@example.com",
      phone: "+92 302 3456789",
      location: "Islamabad, Pakistan",
      totalSpent: "₹22,300",
      totalOrders: 12,
      lastOrder: "2024-01-14",
      status: "active",
      joinDate: "2023-05-10"
    },
    {
      id: "cust_004",
      name: "Ayesha Khan",
      email: "ayesha@example.com",
      phone: "+92 303 4567890",
      location: "Peshawar, Pakistan",
      totalSpent: "₹3,800",
      totalOrders: 3,
      lastOrder: "2024-01-10",
      status: "inactive",
      joinDate: "2023-09-05"
    },
    {
      id: "cust_005",
      name: "Muhammad Hassan",
      email: "hassan@example.com",
      phone: "+92 304 5678901",
      location: "Quetta, Pakistan",
      totalSpent: "₹6,700",
      totalOrders: 6,
      lastOrder: "2024-01-08",
      status: "active",
      joinDate: "2023-07-12"
    }
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6 lg:mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Customers</h1>
            <p className="text-sm sm:text-base text-gray-600 mt-1">Manage your customer relationships and data</p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Customer
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Customers</p>
                <p className="text-xl font-bold">5</p>
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
                <p className="text-xl font-bold">4</p>
              </div>
              <Badge variant="default" className="h-8 px-3">80%</Badge>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Revenue</p>
                <p className="text-xl font-bold">₹56,500</p>
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
                <p className="text-xl font-bold">₹1,660</p>
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
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
              <Button variant="outline">
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
                {customers.map((customer) => (
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
                          <p className="text-xs text-gray-600">{customer.phone}</p>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-3 w-3 text-gray-400" />
                          <p className="text-xs text-gray-600">{customer.location}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-3">
                      <p className="font-medium text-sm">{customer.totalSpent}</p>
                    </td>
                    <td className="p-3">
                      <p className="text-sm">{customer.totalOrders}</p>
                    </td>
                    <td className="p-3">
                      <Badge 
                        variant={customer.status === "active" ? "default" : "secondary"}
                        className="text-xs"
                      >
                        {customer.status}
                      </Badge>
                    </td>
                    <td className="p-3">
                      <div>
                        <p className="text-sm">{customer.lastOrder}</p>
                        <p className="text-xs text-gray-500">Joined {customer.joinDate}</p>
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 