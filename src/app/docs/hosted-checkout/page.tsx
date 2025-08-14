import { Metadata } from "next";
import { DocsSidebar } from "@/components/docs/DocsSidebar";
import { DocsContent } from "@/components/docs/DocsContent";

export const metadata: Metadata = {
  title: "Hosted Checkout - PayFlow API Documentation",
  description: "Use PayFlow's hosted checkout pages for secure, optimized payment experiences.",
  keywords: ["PayFlow hosted checkout", "checkout pages", "secure payments", "payment optimization"],
};

export default function HostedCheckoutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <DocsSidebar />
        <DocsContent />
      </div>
    </div>
  );
}
