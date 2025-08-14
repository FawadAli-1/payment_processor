"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Copy, 
  ExternalLink, 
  Edit, 
  Trash2,
  MoreHorizontal,
  Check
} from "lucide-react";
import { toast } from "sonner";
import { PaymentLink, formatPaymentLinkAmount, getPaymentLinkStatusBadgeVariant, calculateConversionRate } from "@/lib/payment-links";

interface PaymentLinkActionsProps {
  link: PaymentLink;
  onEdit: (link: PaymentLink) => void;
  onDelete: (id: string) => void;
}

export function PaymentLinkActions({ link, onEdit, onDelete }: PaymentLinkActionsProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(link.url);
      setCopied(true);
      toast.success("Link copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed to copy link");
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: link.title,
        text: `Pay ${formatPaymentLinkAmount(link.amount)} for ${link.title}`,
        url: link.url,
      });
    } else {
      handleCopy();
    }
  };

  const handleEdit = () => {
    onEdit(link);
  };

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this payment link?")) {
      try {
        const response = await fetch(`/api/payment-links/${link.id}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.error || "Failed to delete payment link");
        }

        toast.success("Payment link deleted successfully!");
        onDelete(link.id);
      } catch (error) {
        console.error("Error deleting payment link:", error);
        toast.error(error instanceof Error ? error.message : "Failed to delete payment link");
      }
    }
  };

  const completedPayments = link.payments.filter((p: PaymentLink['payments'][number]) => p.status === 'COMPLETED');
  const totalRevenue = completedPayments.reduce((sum, p) => sum + p.amount, 0);
  const conversionRate = calculateConversionRate(link.clicks, completedPayments.length);

  return (
    <div className="space-y-4">
      {/* Amount and Status */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-2xl font-bold">{formatPaymentLinkAmount(link.amount)}</span>
          <Badge variant={getPaymentLinkStatusBadgeVariant(link.status)}>
            {link.status}
          </Badge>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-600">Revenue</p>
          <p className="font-medium">{formatPaymentLinkAmount(totalRevenue)}</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 py-3 border-t border-b">
        <div className="text-center">
          <p className="text-2xl font-bold text-blue-600">{link.clicks}</p>
          <p className="text-xs text-gray-600">Clicks</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-green-600">{completedPayments.length}</p>
          <p className="text-xs text-gray-600">Payments</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-purple-600">{conversionRate}%</p>
          <p className="text-xs text-gray-600">Conversion</p>
        </div>
      </div>

      {/* URL and Actions */}
      <div className="flex items-center justify-between">
        <div className="flex-1 min-w-0">
          <p className="text-sm text-gray-600 truncate">{link.url}</p>
        </div>
        <div className="flex gap-2 ml-2">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleCopy}
            title="Copy link"
          >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleShare}
            title="Share link"
          >
            <ExternalLink className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleEdit}
            title="Edit link"
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleDelete}
            title="Delete link"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Expiry */}
      {link.expiresAt && (
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Expires:</span>
          <span className={link.status === "EXPIRED" ? "text-red-600" : "text-gray-900"}>
            {new Date(link.expiresAt).toLocaleDateString()}
          </span>
        </div>
      )}
    </div>
  );
} 