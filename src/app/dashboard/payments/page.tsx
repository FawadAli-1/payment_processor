import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  CreditCard, 
  Search,
  Filter,
  Download,
  Eye,
  MoreHorizontal,
  Calendar,
  DollarSign
} from "lucide-react";

export default function PaymentsPage() {
  const payments = [
    {
      id: "pay_001",
      amount: "₹2,500",
      status: "completed",
      customer: "Ahmed Khan",
      email: "ahmed@example.com",
      date: "2024-01-15",
      time: "14:30",
      provider: "PayFast",
      description: "Premium subscription"
    },
    {
      id: "pay_002",
      amount: "₹1,800",
      status: "pending",
      customer: "Fatima Ali",
      email: "fatima@example.com",
      date: "2024-01-15",
      time: "13:45",
      provider: "Easypaisa",
      description: "Course payment"
    },
    {
      id: "pay_003",
      amount: "₹3,200",
      status: "completed",
      customer: "Usman Ahmed",
      email: "usman@example.com",
      date: "2024-01-15",
      time: "12:20",
      provider: "Safepay",
      description: "Product purchase"
    },
    {
      id: "pay_004",
      amount: "₹950",
      status: "failed",
      customer: "Ayesha Khan",
      email: "ayesha@example.com",
      date: "2024-01-15",
      time: "11:15",
      provider: "JazzCash",
      description: "Service fee"
    },
    {
      id: "pay_005",
      amount: "₹4,500",
      status: "completed",
      customer: "Muhammad Hassan",
      email: "hassan@example.com",
      date: "2024-01-14",
      time: "16:45",
      provider: "PayFast",
      description: "Consultation fee"
    }
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6 lg:mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Payments</h1>
            <p className="text-sm sm:text-base text-gray-600 mt-1">Manage and track all your payment transactions</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button>
              <CreditCard className="mr-2 h-4 w-4" />
              New Payment
            </Button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search payments..."
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
                <Calendar className="mr-2 h-4 w-4" />
                Date Range
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Revenue</p>
                <p className="text-xl font-bold">₹12,950</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Successful</p>
                <p className="text-xl font-bold">4</p>
              </div>
              <Badge variant="default" className="h-8 px-3">98%</Badge>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending</p>
                <p className="text-xl font-bold">1</p>
              </div>
              <Badge variant="secondary" className="h-8 px-3">20%</Badge>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Failed</p>
                <p className="text-xl font-bold">1</p>
              </div>
              <Badge variant="destructive" className="h-8 px-3">2%</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Payments Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Payments</CardTitle>
          <CardDescription>
            All payment transactions from your business
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 text-sm font-medium text-gray-600">Payment</th>
                  <th className="text-left p-3 text-sm font-medium text-gray-600">Customer</th>
                  <th className="text-left p-3 text-sm font-medium text-gray-600">Amount</th>
                  <th className="text-left p-3 text-sm font-medium text-gray-600">Status</th>
                  <th className="text-left p-3 text-sm font-medium text-gray-600">Provider</th>
                  <th className="text-left p-3 text-sm font-medium text-gray-600">Date</th>
                  <th className="text-left p-3 text-sm font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment) => (
                  <tr key={payment.id} className="border-b hover:bg-gray-50">
                    <td className="p-3">
                      <div>
                        <p className="font-medium text-sm">{payment.id}</p>
                        <p className="text-xs text-gray-500">{payment.description}</p>
                      </div>
                    </td>
                    <td className="p-3">
                      <div>
                        <p className="font-medium text-sm">{payment.customer}</p>
                        <p className="text-xs text-gray-500">{payment.email}</p>
                      </div>
                    </td>
                    <td className="p-3">
                      <p className="font-medium text-sm">{payment.amount}</p>
                    </td>
                    <td className="p-3">
                      <Badge 
                        variant={
                          payment.status === "completed" ? "default" :
                          payment.status === "pending" ? "secondary" : "destructive"
                        }
                        className="text-xs"
                      >
                        {payment.status}
                      </Badge>
                    </td>
                    <td className="p-3">
                      <p className="text-sm">{payment.provider}</p>
                    </td>
                    <td className="p-3">
                      <div>
                        <p className="text-sm">{payment.date}</p>
                        <p className="text-xs text-gray-500">{payment.time}</p>
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
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