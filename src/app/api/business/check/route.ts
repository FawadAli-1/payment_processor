import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get user
    const user = await db.user.findUnique({
      where: { clerkId: userId },
    });

    if (!user) {
      return NextResponse.json({ hasBusiness: false });
    }

    // Check if user has a business
    const business = await db.business.findFirst({
      where: { userId: user.id },
    });

    return NextResponse.json({ 
      hasBusiness: !!business,
      business: business ? {
        id: business.id,
        name: business.name,
        email: business.email,
      } : null
    });

  } catch (error) {
    return NextResponse.json(
      { error: "Failed to check business status" },
      { status: 500 }
    );
  }
} 