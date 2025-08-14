import { Metadata } from "next";
import { DocsSidebar } from "@/components/docs/DocsSidebar";
import { DocsContent } from "@/components/docs/DocsContent";

export const metadata: Metadata = {
  title: "API Overview - PayFlow API Documentation",
  description: "Comprehensive overview of PayFlow's REST API structure, authentication, and endpoints.",
  keywords: ["PayFlow API", "REST API", "API structure", "endpoints", "base URL"],
};

export default function ApiOverviewPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <DocsSidebar />
        <DocsContent />
      </div>
    </div>
  );
}
