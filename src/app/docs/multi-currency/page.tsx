import { Metadata } from "next";
import { DocsSidebar } from "@/components/docs/DocsSidebar";
import { DocsContent } from "@/components/docs/DocsContent";

export const metadata: Metadata = {
  title: "Multi-Currency - PayFlow API Documentation",
  description: "Accept payments in multiple currencies and expand your business globally with PayFlow.",
  keywords: ["PayFlow multi-currency", "multiple currencies", "USD", "EUR", "GBP", "exchange rates"],
};

export default function MultiCurrencyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <DocsSidebar />
        <DocsContent />
      </div>
    </div>
  );
}
