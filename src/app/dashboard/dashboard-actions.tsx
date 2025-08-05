"use client";

import { Button } from "@/components/ui/button";
import { Plus, CreditCard, Users, TrendingUp } from "lucide-react";
import { useRouter } from "next/navigation";

export function DashboardActions() {
  const router = useRouter();

  return (
    <div className="space-y-3">
      <Button 
        className="w-full justify-start" 
        variant="outline"
        onClick={() => router.push("/dashboard/links")}
      >
        <Plus className="mr-2 h-4 w-4" />
        <span className="hidden sm:inline">Create Payment Link</span>
        <span className="sm:hidden">Payment Link</span>
      </Button>
      <Button 
        className="w-full justify-start" 
        variant="outline"
        onClick={() => router.push("/dashboard/checkout")}
      >
        <CreditCard className="mr-2 h-4 w-4" />
        <span className="hidden sm:inline">New Checkout Page</span>
        <span className="sm:hidden">Checkout</span>
      </Button>
      <Button 
        className="w-full justify-start" 
        variant="outline"
        onClick={() => router.push("/dashboard/customers")}
      >
        <Users className="mr-2 h-4 w-4" />
        <span className="hidden sm:inline">View Customers</span>
        <span className="sm:hidden">Customers</span>
      </Button>
      <Button 
        className="w-full justify-start" 
        variant="outline"
        onClick={() => router.push("/dashboard/analytics")}
      >
        <TrendingUp className="mr-2 h-4 w-4" />
        <span className="hidden sm:inline">Analytics Report</span>
        <span className="sm:hidden">Analytics</span>
      </Button>
    </div>
  );
} 