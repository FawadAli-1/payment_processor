import { Metadata } from "next";
import { DocsSidebar } from "@/components/docs/DocsSidebar";
import { DocsContent } from "@/components/docs/DocsContent";

export const metadata: Metadata = {
  title: "Testing - PayFlow API Documentation",
  description: "Test your PayFlow integration with test mode, sandbox credentials, and webhook testing tools.",
  keywords: ["PayFlow testing", "test mode", "sandbox", "webhook testing", "integration testing"],
};

export default function TestingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <DocsSidebar />
        <DocsContent />
      </div>
    </div>
  );
}
