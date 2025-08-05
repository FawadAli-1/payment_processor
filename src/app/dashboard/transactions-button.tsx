"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function TransactionsButton() {
  const router = useRouter();

  return (
    <Button 
      variant="outline" 
      className="w-full"
      onClick={() => router.push("/dashboard/payments")}
    >
      View All Transactions
    </Button>
  );
} 