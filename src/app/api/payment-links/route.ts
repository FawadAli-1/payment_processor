import { NextRequest, NextResponse } from "next/server";
import { getCurrentBusiness } from "@/lib/auth";
import { db } from "@/lib/db";
import { filterPaymentLinks } from "@/lib/payment-links";

export async function GET(request: NextRequest) {
  try {
    const business = await getCurrentBusiness();
    
    if (!business) {
      return NextResponse.json({ error: "Business not found" }, { status: 404 });
    }

    const { searchParams } = new URL(request.url);
    const searchQuery = searchParams.get("search") || "";
    const filterStatus = searchParams.get("status") || "all";
    const startDate = searchParams.get("startDate") || "";
    const endDate = searchParams.get("endDate") || "";

    // Get payment links with payments
    const paymentLinks = await db.paymentLink.findMany({
      where: { businessId: business.id },
      include: {
        payments: {
          select: {
            id: true,
            amount: true,
            status: true,
            createdAt: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    // Filter the results
    const filteredLinks = filterPaymentLinks(
      paymentLinks,
      searchQuery,
      filterStatus,
      { start: startDate, end: endDate }
    );

    return NextResponse.json({ paymentLinks: filteredLinks });
  } catch (error) {
    console.error("Error fetching payment links:", error);
    return NextResponse.json(
      { error: "Failed to fetch payment links" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const business = await getCurrentBusiness();
    
    if (!business) {
      return NextResponse.json({ error: "Business not found" }, { status: 404 });
    }

    const body = await request.json();
    const { title, description, amount, currency = "PKR", expiresAt } = body;

    if (!title || !amount) {
      return NextResponse.json(
        { error: "Title and amount are required" },
        { status: 400 }
      );
    }

    // Generate unique URL
    const url = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/pay/${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    const paymentLink = await db.paymentLink.create({
      data: {
        title,
        description,
        amount: parseInt(amount),
        currency,
        status: "ACTIVE",
        businessId: business.id,
        url,
        expiresAt: expiresAt ? new Date(expiresAt) : null,
      },
      include: {
        payments: {
          select: {
            id: true,
            amount: true,
            status: true,
            createdAt: true,
          },
        },
      },
    });

    return NextResponse.json({ paymentLink }, { status: 201 });
  } catch (error) {
    console.error("Error creating payment link:", error);
    return NextResponse.json(
      { error: "Failed to create payment link" },
      { status: 500 }
    );
  }
} 