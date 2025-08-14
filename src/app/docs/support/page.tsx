import { Metadata } from "next";
import { DocsSidebar } from "@/components/docs/DocsSidebar";
import { DocsContent } from "@/components/docs/DocsContent";

export const metadata: Metadata = {
  title: "Support - PayFlow API Documentation",
  description: "Get help and support for your PayFlow integration. Contact our team and access resources.",
  keywords: ["PayFlow support", "help", "contact", "troubleshooting", "customer service"],
};

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <DocsSidebar />
        <DocsContent />
      </div>
    </div>
  );
}
