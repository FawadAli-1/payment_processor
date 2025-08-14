import { Metadata } from "next";
import { DocsSidebar } from "@/components/docs/DocsSidebar";
import { DocsContent } from "@/components/docs/DocsContent";

export const metadata: Metadata = {
  title: "Quick Start - PayFlow API Documentation",
  description: "Get started with PayFlow in minutes. Step-by-step guide to create your first payment.",
  keywords: ["PayFlow quick start", "getting started", "first payment", "integration guide"],
};

export default function QuickStartPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <DocsSidebar />
        <DocsContent />
      </div>
    </div>
  );
}
