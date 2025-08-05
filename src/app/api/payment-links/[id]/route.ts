import { NextRequest, NextResponse } from "next/server";
import { getCurrentBusiness } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const business = await getCurrentBusiness();
    
    if (!business) {
      return NextResponse.json({ error: "Business not found" }, { status: 404 });
    }

    const paymentLink = await db.paymentLink.findFirst({
      where: {
        id: params.id,
        businessId: business.id,
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

    if (!paymentLink) {
      return NextResponse.json({ error: "Payment link not found" }, { status: 404 });
    }

    return NextResponse.json({ paymentLink });
  } catch (error) {
    console.error("Error fetching payment link:", error);
    return NextResponse.json(
      { error: "Failed to fetch payment link" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const business = await getCurrentBusiness();
    
    if (!business) {
      return NextResponse.json({ error: "Business not found" }, { status: 404 });
    }

    const body = await request.json();
    const { title, description, amount, currency, status, expiresAt } = body;

    const paymentLink = await db.paymentLink.findFirst({
      where: {
        id: params.id,
        businessId: business.id,
      },
    });

    if (!paymentLink) {
      return NextResponse.json({ error: "Payment link not found" }, { status: 404 });
    }

    const updatedPaymentLink = await db.paymentLink.update({
      where: { id: params.id },
      data: {
        title,
        description,
        amount: amount ? parseInt(amount) : undefined,
        currency,
        status,
        expiresAt: expiresAt ? new Date(expiresAt) : undefined,
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

    return NextResponse.json({ paymentLink: updatedPaymentLink });
  } catch (error) {
    console.error("Error updating payment link:", error);
    return NextResponse.json(
      { error: "Failed to update payment link" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const business = await getCurrentBusiness();
    
    if (!business) {
      return NextResponse.json({ error: "Business not found" }, { status: 404 });
    }

    const paymentLink = await db.paymentLink.findFirst({
      where: {
        id: params.id,
        businessId: business.id,
      },
    });

    if (!paymentLink) {
      return NextResponse.json({ error: "Payment link not found" }, { status: 404 });
    }

    await db.paymentLink.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: "Payment link deleted successfully" });
  } catch (error) {
    console.error("Error deleting payment link:", error);
    return NextResponse.json(
      { error: "Failed to delete payment link" },
      { status: 500 }
    );
  }
} 