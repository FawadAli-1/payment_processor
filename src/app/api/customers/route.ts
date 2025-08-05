import { NextRequest, NextResponse } from "next/server";
import { getCurrentBusiness } from "@/lib/auth";
import { db } from "@/lib/db";
import { filterCustomers } from "@/lib/customers";

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

    // Get customers
    const customers = await db.customer.findMany({
      where: { businessId: business.id },
      orderBy: { createdAt: "desc" },
    });

    // Filter the results
    const filteredCustomers = filterCustomers(
      customers,
      searchQuery,
      filterStatus,
      { start: startDate, end: endDate }
    );

    return NextResponse.json({ customers: filteredCustomers });
  } catch (error) {
    console.error("Error fetching customers:", error);
    return NextResponse.json(
      { error: "Failed to fetch customers" },
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
    const { name, email, phone, address } = body;

    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required" },
        { status: 400 }
      );
    }

    // Check if customer with this email already exists for this business
    const existingCustomer = await db.customer.findFirst({
      where: {
        email,
        businessId: business.id,
      },
    });

    if (existingCustomer) {
      return NextResponse.json(
        { error: "Customer with this email already exists" },
        { status: 400 }
      );
    }

    const customer = await db.customer.create({
      data: {
        name,
        email,
        phone,
        address,
        businessId: business.id,
        status: "ACTIVE",
      },
    });

    return NextResponse.json({ customer }, { status: 201 });
  } catch (error) {
    console.error("Error creating customer:", error);
    return NextResponse.json(
      { error: "Failed to create customer" },
      { status: 500 }
    );
  }
} 