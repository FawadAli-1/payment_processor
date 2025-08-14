import { Metadata } from "next";
import { DocsSidebar } from "@/components/docs/DocsSidebar";
import { DocsContent } from "@/components/docs/DocsContent";

export const metadata: Metadata = {
  title: "Payment Links API - PayFlow API Documentation",
  description: "Complete API reference for creating and managing payment links with PayFlow.",
  keywords: ["PayFlow payment links API", "create payment links", "payment links endpoints"],
};

export default function ApiPaymentLinksPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <DocsSidebar />
        <DocsContent />
      </div>
    </div>
  );
}
