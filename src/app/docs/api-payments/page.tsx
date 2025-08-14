import { Metadata } from "next";
import { DocsSidebar } from "@/components/docs/DocsSidebar";
import { DocsContent } from "@/components/docs/DocsContent";

export const metadata: Metadata = {
  title: "Payments API - PayFlow API Documentation",
  description: "Complete API reference for processing payments and managing payment intents with PayFlow.",
  keywords: ["PayFlow payments API", "payment intents", "payment processing", "payment endpoints"],
};

export default function ApiPaymentsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <DocsSidebar />
        <DocsContent />
      </div>
    </div>
  );
}
