import { Metadata } from "next";
import { DocsSidebar } from "@/components/docs/DocsSidebar";
import { DocsContent } from "@/components/docs/DocsContent";

export const metadata: Metadata = {
  title: "Troubleshooting - PayFlow API Documentation",
  description: "Common issues and solutions for PayFlow integration. Fix problems quickly with our troubleshooting guide.",
  keywords: ["PayFlow troubleshooting", "common issues", "error solutions", "problem solving", "debugging"],
};

export default function TroubleshootingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <DocsSidebar />
        <DocsContent />
      </div>
    </div>
  );
}
