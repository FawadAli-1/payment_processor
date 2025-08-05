"use client";

import { Button } from "@/components/ui/button";
import { Eye, MoreHorizontal } from "lucide-react";

interface PaymentActionsProps {
  paymentId: string;
}

export function PaymentActions({ paymentId }: PaymentActionsProps) {
  return (
    <div className="flex gap-2">
      <Button 
        variant="ghost" 
        size="sm"
        onClick={() => console.log('View payment:', paymentId)}
      >
        <Eye className="h-4 w-4" />
      </Button>
      <Button 
        variant="ghost" 
        size="sm"
        onClick={() => console.log('More options for payment:', paymentId)}
      >
        <MoreHorizontal className="h-4 w-4" />
      </Button>
    </div>
  );
} 