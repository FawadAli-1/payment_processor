import { Metadata } from "next";
import { DocsSidebar } from "@/components/docs/DocsSidebar";
import { DocsContent } from "@/components/docs/DocsContent";

export const metadata: Metadata = {
  title: "Webhooks API - PayFlow API Documentation",
  description: "Configure and manage webhook endpoints for real-time notifications with PayFlow.",
  keywords: ["PayFlow webhooks API", "webhook configuration", "webhook endpoints", "notifications"],
};

export default function ApiWebhooksPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <DocsSidebar />
        <DocsContent />
      </div>
    </div>
  );
}
