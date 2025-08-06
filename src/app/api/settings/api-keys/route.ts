import { NextRequest, NextResponse } from "next/server";
import { getCurrentBusiness } from "@/lib/auth";
import { db } from "@/lib/db";
import crypto from "crypto";

export async function GET() {
  try {
    const business = await getCurrentBusiness();
    
    if (!business) {
      return NextResponse.json({ error: "Business not found" }, { status: 404 });
    }

    // Return the current API key
    return NextResponse.json({ 
      apiKey: business.apiKey,
      createdAt: business.createdAt
    });
  } catch (error) {
    console.error("Error fetching API key:", error);
    return NextResponse.json(
      { error: "Failed to fetch API key" },
      { status: 500 }
    );
  }
}

export async function POST() {
  try {
    const business = await getCurrentBusiness();
    
    if (!business) {
      return NextResponse.json({ error: "Business not found" }, { status: 404 });
    }

    // Generate new API key
    const newApiKey = `pk_${crypto.randomBytes(32).toString('hex')}`;

    const updatedBusiness = await db.business.update({
      where: { id: business.id },
      data: {
        apiKey: newApiKey,
      },
    });

    return NextResponse.json({ 
      apiKey: updatedBusiness.apiKey,
      message: "API key generated successfully"
    });
  } catch (error) {
    console.error("Error generating API key:", error);
    return NextResponse.json(
      { error: "Failed to generate API key" },
      { status: 500 }
    );
  }
} 