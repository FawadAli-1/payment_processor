import { Metadata } from "next";
import { DocsSidebar } from "@/components/docs/DocsSidebar";
import { DocsContent } from "@/components/docs/DocsContent";

export const metadata: Metadata = {
  title: "PayFlow API Documentation - Complete Guide to Integration",
  description: "Comprehensive documentation for PayFlow payment platform. Learn how to integrate payments, use our APIs, and build payment experiences for Pakistan.",
  keywords: ["PayFlow API", "payment integration", "documentation", "Pakistan payments", "PayFast", "Safepay", "Easypaisa", "JazzCash"],
};

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <DocsSidebar />
        <DocsContent />
      </div>
    </div>
  );
}
