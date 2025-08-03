import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Link as LinkIcon, 
  Plus,
  Copy,
  ExternalLink,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  Calendar,
  DollarSign,
  Users
} from "lucide-react";

export default function PaymentLinksPage() {
  const paymentLinks = [
    {
      id: "link_001",
      title: "Premium Course Access",
      amount: "₹2,500",
      currency: "PKR",
      status: "active",
      clicks: 45,
      payments: 12,
      revenue: "₹30,000",
      created: "2024-01-10",
      expires: "2024-02-10",
      url: "https://payflow.com/pay/link_001"
    },
    {
      id: "link_002",
      title: "Consultation Session",
      amount: "₹1,800",
      currency: "PKR",
      status: "active",
      clicks: 23,
      payments: 8,
      revenue: "₹14,400",
      created: "2024-01-12",
      expires: "2024-02-12",
      url: "https://payflow.com/pay/link_002"
    },
    {
      id: "link_003",
      title: "Product Bundle",
      amount: "₹3,200",
      currency: "PKR",
      status: "expired",
      clicks: 67,
      payments: 15,
      revenue: "₹48,000",
      created: "2024-01-05",
      expires: "2024-01-20",
      url: "https://payflow.com/pay/link_003"
    },
    {
      id: "link_004",
      title: "Service Fee",
      amount: "₹950",
      currency: "PKR",
      status: "draft",
      clicks: 0,
      payments: 0,
      revenue: "₹0",
      created: "2024-01-15",
      expires: "2024-02-15",
      url: "https://payflow.com/pay/link_004"
    }
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6 lg:mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Payment Links</h1>
            <p className="text-sm sm:text-base text-gray-600 mt-1">Create and manage payment links for your customers</p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create Payment Link
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Links</p>
                <p className="text-xl font-bold">4</p>
              </div>
              <LinkIcon className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Revenue</p>
                <p className="text-xl font-bold">₹92,400</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Clicks</p>
                <p className="text-xl font-bold">135</p>
              </div>
              <Eye className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Conversion Rate</p>
                <p className="text-xl font-bold">26%</p>
              </div>
              <Users className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search payment links..."
                className="w-full"
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <Calendar className="mr-2 h-4 w-4" />
                Date Range
              </Button>
              <Button variant="outline">
                Status
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Links Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {paymentLinks.map((link) => (
          <Card key={link.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg">{link.title}</CardTitle>
                  <CardDescription className="mt-1">
                    Created on {link.created}
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Amount and Status */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold">{link.amount}</span>
                    <Badge 
                      variant={
                        link.status === "active" ? "default" :
                        link.status === "expired" ? "destructive" : "secondary"
                      }
                    >
                      {link.status}
                    </Badge>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Revenue</p>
                    <p className="font-medium">{link.revenue}</p>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 py-3 border-t border-b">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-600">{link.clicks}</p>
                    <p className="text-xs text-gray-600">Clicks</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-600">{link.payments}</p>
                    <p className="text-xs text-gray-600">Payments</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-purple-600">
                      {link.payments > 0 ? Math.round((link.payments / link.clicks) * 100) : 0}%
                    </p>
                    <p className="text-xs text-gray-600">Conversion</p>
                  </div>
                </div>

                {/* URL and Actions */}
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-600 truncate">{link.url}</p>
                  </div>
                  <div className="flex gap-2 ml-2">
                    <Button variant="ghost" size="sm">
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Expiry */}
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Expires:</span>
                  <span className={link.status === "expired" ? "text-red-600" : "text-gray-900"}>
                    {link.expires}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
} 