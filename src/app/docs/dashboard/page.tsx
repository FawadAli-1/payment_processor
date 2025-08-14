import { Metadata } from "next";
import { DocsSidebar } from "@/components/docs/DocsSidebar";
import { DocsContent } from "@/components/docs/DocsContent";

export const metadata: Metadata = {
  title: "Dashboard - PayFlow API Documentation",
  description: "Learn how to use the PayFlow dashboard to manage payments, view analytics, and configure your account.",
  keywords: ["PayFlow dashboard", "payment management", "analytics", "account settings", "business tools"],
};

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <DocsSidebar />
        <DocsContent />
      </div>
    </div>
  );
}
