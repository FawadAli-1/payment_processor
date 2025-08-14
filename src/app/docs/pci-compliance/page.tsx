import { Metadata } from "next";
import { DocsSidebar } from "@/components/docs/DocsSidebar";
import { DocsContent } from "@/components/docs/DocsContent";

export const metadata: Metadata = {
  title: "PCI DSS Compliance - PayFlow API Documentation",
  description: "Learn about PayFlow's PCI DSS compliance and what it means for your business security.",
  keywords: ["PayFlow PCI compliance", "PCI DSS", "security standards", "data protection", "compliance certification"],
};

export default function PciCompliancePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <DocsSidebar />
        <DocsContent />
      </div>
    </div>
  );
}
