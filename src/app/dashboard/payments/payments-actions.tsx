"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  CreditCard, 
  Download
} from "lucide-react";
import { CreatePaymentLinkDialog } from "@/components/shared/CreatePaymentLinkDialog";

export function PaymentsActions() {
  const handleExport = async () => {
    try {
      const response = await fetch('/api/payments/export');
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `payments-${new Date().toISOString().split('T')[0]}.csv`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      } else {
        alert('Failed to export payments');
      }
    } catch (error) {
      alert('Failed to export payments');
    }
  };

  const handlePaymentLinkCreated = () => {
    // Refresh the page to show new payments
    window.location.reload();
  };

  return (
    <>
      {/* Header Actions */}
      <div className="flex gap-2">
        <Button variant="outline" onClick={handleExport}>
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button>
        <CreatePaymentLinkDialog onPaymentLinkCreated={handlePaymentLinkCreated} />
      </div>
    </>
  );
} 