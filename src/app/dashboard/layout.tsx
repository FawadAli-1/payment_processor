import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { DashboardLayoutClient } from "./layout-client";
import { getCurrentBusiness } from "@/lib/auth";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();
  
  if (!userId) {
    redirect("/sign-in");
  }

  // Check if user has a business, if not redirect to setup
  const business = await getCurrentBusiness();
  
  if (!business) {
    redirect("/dashboard/setup");
  }

  return <DashboardLayoutClient>{children}</DashboardLayoutClient>;
} 