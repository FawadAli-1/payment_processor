import { Metadata } from "next";
import { DocsSidebar } from "@/components/docs/DocsSidebar";
import { DocsContent } from "@/components/docs/DocsContent";

export const metadata: Metadata = {
  title: "SDKs & Libraries - PayFlow API Documentation",
  description: "Official and community SDKs for integrating PayFlow into your applications. JavaScript, Python, and more.",
  keywords: ["PayFlow SDKs", "client libraries", "JavaScript SDK", "Python SDK", "integration tools"],
};

export default function SdksPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <DocsSidebar />
        <DocsContent />
      </div>
    </div>
  );
}
