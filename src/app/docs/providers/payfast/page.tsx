import { Metadata } from "next";
import { DocsSidebar } from "@/components/docs/DocsSidebar";
import { DocsContent } from "@/components/docs/DocsContent";

export const metadata: Metadata = {
  title: "PayFast Integration - PayFlow API Documentation",
  description: "Integrate PayFast payment processing with PayFlow. Setup, configuration, and best practices.",
  keywords: ["PayFlow PayFast", "PayFast integration", "payment provider", "Pakistan payments"],
};

export default function PayFastPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <DocsSidebar />
        <DocsContent />
      </div>
    </div>
  );
}
