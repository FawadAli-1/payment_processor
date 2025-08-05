import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { DashboardLayoutClient } from "./layout-client";
import { requireAuth, getBusinessForUser } from "@/lib/auth";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  try {
    // This will create user if they don't exist and redirect to sign-in if not authenticated
    const user = await requireAuth();
    
    // Don't redirect here, let the page handle it
    return <DashboardLayoutClient>{children}</DashboardLayoutClient>;
  } catch (error) {
    // Handle authentication errors gracefully
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Authentication Error</h1>
          <p className="text-gray-600 mb-4">There was an issue with your authentication.</p>
          <a 
            href="/sign-in" 
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            Sign In Again
          </a>
        </div>
      </div>
    );
  }
} 