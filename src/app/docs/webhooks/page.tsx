import { Metadata } from "next";
import { DocsSidebar } from "@/components/docs/DocsSidebar";
import { DocsContent } from "@/components/docs/DocsContent";

export const metadata: Metadata = {
  title: "Webhooks - PayFlow API Documentation",
  description: "Set up webhooks to receive real-time notifications about payment events.",
  keywords: ["PayFlow webhooks", "payment notifications", "real-time updates", "event handling"],
};

export default function WebhooksPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <DocsSidebar />
        <DocsContent />
      </div>
    </div>
  );
}
