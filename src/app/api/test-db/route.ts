import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    // Test database connection
    await db.$queryRaw`SELECT 1`;
    
    // Get user
    const user = await db.user.findUnique({
      where: { clerkId: userId },
    });

    // Get business
    const business = user ? await db.business.findFirst({
      where: { userId: user.id },
    }) : null;

    return NextResponse.json({
      success: true,
      userId,
      user: user ? { id: user.id, email: user.email } : null,
      business: business ? { id: business.id, name: business.name } : null,
      hasBusiness: !!business,
    });

  } catch {
    return NextResponse.json(
      { error: "Database connection failed" },
      { status: 500 }
    );
  }
} 