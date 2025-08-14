import { Metadata } from "next";
import { DocsSidebar } from "@/components/docs/DocsSidebar";
import { DocsContent } from "@/components/docs/DocsContent";

export const metadata: Metadata = {
  title: "Payment Flow - PayFlow API Documentation",
  description: "Understand the payment lifecycle and how PayFlow processes payments from creation to completion.",
  keywords: ["PayFlow payment flow", "payment lifecycle", "payment status", "payment processing"],
};

export default function PaymentFlowPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <DocsSidebar />
        <DocsContent />
      </div>
    </div>
  );
}
