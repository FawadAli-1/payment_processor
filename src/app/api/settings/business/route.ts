import { NextRequest, NextResponse } from "next/server";
import { getCurrentBusiness } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const business = await getCurrentBusiness();
    
    if (!business) {
      return NextResponse.json({ error: "Business not found" }, { status: 404 });
    }

    return NextResponse.json({ business });
  } catch (error) {
    console.error("Error fetching business settings:", error);
    return NextResponse.json(
      { error: "Failed to fetch business settings" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const business = await getCurrentBusiness();
    
    if (!business) {
      return NextResponse.json({ error: "Business not found" }, { status: 404 });
    }

    const body = await request.json();
    const { name, email, phone, address, website, logo } = body;

    const updatedBusiness = await db.business.update({
      where: { id: business.id },
      data: {
        name,
        email,
        phone,
        address,
        website,
        logo,
      },
    });

    return NextResponse.json({ business: updatedBusiness });
  } catch (error) {
    console.error("Error updating business settings:", error);
    return NextResponse.json(
      { error: "Failed to update business settings" },
      { status: 500 }
    );
  }
} 