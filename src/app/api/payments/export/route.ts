import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get user and business
    const user = await db.user.findUnique({
      where: { clerkId: userId },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const business = await db.business.findFirst({
      where: { userId: user.id },
      include: {
        payments: {
          orderBy: { createdAt: 'desc' },
          include: {
            customer: true
          }
        }
      }
    });

    if (!business) {
      return NextResponse.json({ error: "Business not found" }, { status: 404 });
    }

    // Convert payments to CSV format
    const csvData = business.payments.map(payment => ({
      id: payment.id,
      amount: payment.amount,
      currency: payment.currency,
      status: payment.status,
      provider: payment.provider,
      customerName: payment.customerName || 'Unknown',
      customerEmail: payment.customerEmail || 'No email',
      description: payment.description || 'No description',
      createdAt: new Date(payment.createdAt).toISOString(),
      updatedAt: new Date(payment.updatedAt).toISOString()
    }));

    // Create CSV content
    const headers = ['ID', 'Amount', 'Currency', 'Status', 'Provider', 'Customer Name', 'Customer Email', 'Description', 'Created At', 'Updated At'];
    const csvContent = [
      headers.join(','),
      ...csvData.map(row => [
        row.id,
        row.amount,
        row.currency,
        row.status,
        row.provider,
        `"${row.customerName}"`,
        `"${row.customerEmail}"`,
        `"${row.description}"`,
        row.createdAt,
        row.updatedAt
      ].join(','))
    ].join('\n');

    // Return CSV file
    return new NextResponse(csvContent, {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename="payments-${new Date().toISOString().split('T')[0]}.csv"`
      }
    });

  } catch {
    return NextResponse.json(
      { error: "Failed to export payments" },
      { status: 500 }
    );
  }
} 