import { Metadata } from "next";
import { DocsSidebar } from "@/components/docs/DocsSidebar";
import { DocsContent } from "@/components/docs/DocsContent";

export const metadata: Metadata = {
  title: "Customers API - PayFlow API Documentation",
  description: "Manage customer data and relationships with PayFlow's Customers API.",
  keywords: ["PayFlow customers API", "customer management", "customer data", "customer endpoints"],
};

export default function ApiCustomersPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <DocsSidebar />
        <DocsContent />
      </div>
    </div>
  );
}
