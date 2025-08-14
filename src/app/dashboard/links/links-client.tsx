"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { 
  Link as LinkIcon, 
  Calendar,
  DollarSign,
  Users,
  Eye,
  Search,
} from "lucide-react";
import { CreatePaymentLinkDialog } from "@/components/shared/CreatePaymentLinkDialog";
import { PaymentLinkActions } from "@/components/shared/PaymentLinkActions";
import { EditPaymentLinkDialog } from "@/components/shared/EditPaymentLinkDialog";
import { calculatePaymentLinkStats, filterPaymentLinks, formatPaymentLinkAmount } from "@/lib/payment-links";

interface PaymentLink {
  id: string;
  title: string;
  description?: string | null;
  amount: number;
  currency: string;
  status: string;
  clicks: number;
  businessId: string;
  payments: Array<{ id: string; amount: number; status: string; createdAt: string | Date }>;
  url: string;
  expiresAt?: string | Date | null;
  createdAt: string | Date;
  updatedAt: string | Date;
}

interface LinksClientProps {
  initialLinks: PaymentLink[];
}

export function LinksClient({ initialLinks }: LinksClientProps) {
  const [paymentLinks, setPaymentLinks] = useState<PaymentLink[]>(initialLinks);
  const [filteredLinks, setFilteredLinks] = useState<PaymentLink[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [dateRange, setDateRange] = useState({ start: "", end: "" });
  const [editLink, setEditLink] = useState<PaymentLink | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  // Initialize filtered list from server-provided data
  useEffect(() => {
    setFilteredLinks(initialLinks);
  }, [initialLinks]);

  useEffect(() => {
    const filtered = filterPaymentLinks(paymentLinks, searchQuery, filterStatus, dateRange);
    setFilteredLinks(filtered);
  }, [paymentLinks, searchQuery, filterStatus, dateRange]);

  const handlePaymentLinkCreated = () => {
    // Optimistic: trigger a refresh from the server page
    window.location.reload();
  };

  const handlePaymentLinkUpdated = () => {
    window.location.reload();
    setEditLink(null);
  };

  const handleEdit = (link: PaymentLink) => {
    setEditLink(link);
    setEditDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setPaymentLinks(prev => prev.filter(link => link.id !== id));
    setFilteredLinks(prev => prev.filter(link => link.id !== id));
  };

  const stats = calculatePaymentLinkStats(paymentLinks);

  if (loading) {
    return (
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading payment links...</p>
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
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Payment Links</h1>
            <p className="text-sm sm:text-base text-gray-600 mt-1">Create and manage payment links for your customers</p>
          </div>
          <CreatePaymentLinkDialog onPaymentLinkCreated={handlePaymentLinkCreated} />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Links</p>
                <p className="text-xl font-bold">{stats.totalLinks}</p>
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
                <p className="text-xl font-bold">{formatPaymentLinkAmount(stats.totalRevenue)}</p>
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
                <p className="text-xl font-bold">{stats.totalClicks}</p>
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
                <p className="text-xl font-bold">{stats.conversionRate.toFixed(1)}%</p>
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
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search payment links..."
                className="w-full pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
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
                <option value="EXPIRED">Expired</option>
                <option value="DRAFT">Draft</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Links Grid */}
      {filteredLinks.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center">
            <LinkIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No payment links found</h3>
            <p className="text-gray-600 mb-4">
              {paymentLinks.length === 0 
                ? "Create your first payment link to get started."
                : "No payment links match your current filters."
              }
            </p>
            {paymentLinks.length === 0 && (
              <CreatePaymentLinkDialog onPaymentLinkCreated={handlePaymentLinkCreated} />
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredLinks.map((link) => (
            <Card key={link.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg">{link.title}</CardTitle>
                    <CardDescription className="mt-1">
                      Created on {new Date(link.createdAt).toLocaleDateString()}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <PaymentLinkActions
                  link={link}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Edit Dialog */}
      <EditPaymentLinkDialog
        link={editLink}
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        onPaymentLinkUpdated={handlePaymentLinkUpdated}
      />
    </div>
  );
} 