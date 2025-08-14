import { Metadata } from "next";
import { DocsSidebar } from "@/components/docs/DocsSidebar";
import { DocsContent } from "@/components/docs/DocsContent";

export const metadata: Metadata = {
  title: "Best Practices - PayFlow API Documentation",
  description: "Learn best practices for building secure, reliable, and scalable PayFlow integrations.",
  keywords: ["PayFlow best practices", "integration guidelines", "security practices", "performance optimization"],
};

export default function BestPracticesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <DocsSidebar />
        <DocsContent />
      </div>
    </div>
  );
}
