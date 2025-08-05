import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { randomBytes } from "crypto";

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { name, email, phone, address, website } = body;

    // Validate required fields
    if (!name || !email) {
      return NextResponse.json(
        { error: "Business name and email are required" },
        { status: 400 }
      );
    }

    // Check if user exists, create if not
    let user = await db.user.findUnique({
      where: { clerkId: userId },
    });

    if (!user) {
      user = await db.user.create({
        data: {
          clerkId: userId,
          email: email,
        },
      });
    } else {
      // Update user email if it's different
      if (user.email !== email) {
        user = await db.user.update({
          where: { id: user.id },
          data: { email },
        });
      }
    }

    // Check if business already exists
    const existingBusiness = await db.business.findFirst({
      where: { userId: user.id },
    });

    if (existingBusiness) {
      return NextResponse.json(
        { error: "Business already exists" },
        { status: 400 }
      );
    }

    // Generate API key
    const apiKey = `pk_live_${randomBytes(32).toString('hex')}`;

    // Create business
    const business = await db.business.create({
      data: {
        name,
        email,
        phone,
        address,
        website,
        userId: user.id,
        apiKey,
      },
    });

    return NextResponse.json({ 
      success: true, 
      business: {
        id: business.id,
        name: business.name,
        email: business.email,
        apiKey: business.apiKey,
      },
      message: "Business created successfully" 
    });

  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create business. Please try again." },
      { status: 500 }
    );
  }
} 