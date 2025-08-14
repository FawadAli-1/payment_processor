import { Metadata } from "next";
import { DocsSidebar } from "@/components/docs/DocsSidebar";
import { DocsContent } from "@/components/docs/DocsContent";

export const metadata: Metadata = {
  title: "Security - PayFlow API Documentation",
  description: "Learn about PayFlow's security features, best practices, and how to secure your integration.",
  keywords: ["PayFlow security", "API security", "data protection", "fraud prevention", "encryption"],
};

export default function SecurityPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <DocsSidebar />
        <DocsContent />
      </div>
    </div>
  );
}
