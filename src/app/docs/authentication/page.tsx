import { Metadata } from "next";
import { DocsSidebar } from "@/components/docs/DocsSidebar";
import { DocsContent } from "@/components/docs/DocsContent";

export const metadata: Metadata = {
  title: "Authentication - PayFlow API Documentation",
  description: "Learn how to authenticate with PayFlow API using API keys and security best practices.",
  keywords: ["PayFlow authentication", "API keys", "security", "bearer token"],
};

export default function AuthenticationPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <DocsSidebar />
        <DocsContent />
      </div>
    </div>
  );
}
