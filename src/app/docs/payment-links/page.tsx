import { Metadata } from "next";
import { DocsSidebar } from "@/components/docs/DocsSidebar";
import { DocsContent } from "@/components/docs/DocsContent";

export const metadata: Metadata = {
  title: "Payment Links - PayFlow API Documentation",
  description: "Create and manage payment links for instant, shareable payment collection.",
  keywords: ["PayFlow payment links", "payment URLs", "instant payments", "shareable payments"],
};

export default function PaymentLinksPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <DocsSidebar />
        <DocsContent />
      </div>
    </div>
  );
}
