import { NextRequest, NextResponse } from "next/server";
import { getCurrentBusiness } from "@/lib/auth";
import { db } from "@/lib/db";
import { 
  calculateAnalyticsData, 
  calculatePaymentMethodDistribution,
  calculateTopProducts,
  calculateCustomerSegments,
  generateRecentActivity
} from "@/lib/analytics";

export async function GET(request: NextRequest) {
  try {
    const business = await getCurrentBusiness();
    
    if (!business) {
      return NextResponse.json({ error: "Business not found" }, { status: 404 });
    }

    const { searchParams } = new URL(request.url);
    const period = searchParams.get("period") || "30"; // days

    // Calculate date ranges
    const now = new Date();
    const currentPeriodStart = new Date(now.getTime() - parseInt(period) * 24 * 60 * 60 * 1000);
    const previousPeriodStart = new Date(currentPeriodStart.getTime() - parseInt(period) * 24 * 60 * 60 * 1000);

    // Get current period data
    const currentPayments = await db.payment.findMany({
      where: {
        businessId: business.id,
        createdAt: {
          gte: currentPeriodStart,
        },
      },
      include: {
        customer: true,
      },
    });

    const currentCustomers = await db.customer.findMany({
      where: {
        businessId: business.id,
        createdAt: {
          gte: currentPeriodStart,
        },
      },
    });

    // Get previous period data for comparison
    const previousPayments = await db.payment.findMany({
      where: {
        businessId: business.id,
        createdAt: {
          gte: previousPeriodStart,
          lt: currentPeriodStart,
        },
      },
      include: {
        customer: true,
      },
    });

    const previousCustomers = await db.customer.findMany({
      where: {
        businessId: business.id,
        createdAt: {
          gte: previousPeriodStart,
          lt: currentPeriodStart,
        },
      },
    });

    // Get all data for other analytics
    const allPayments = await db.payment.findMany({
      where: {
        businessId: business.id,
      },
      include: {
        customer: true,
      },
    });

    const allCustomers = await db.customer.findMany({
      where: {
        businessId: business.id,
      },
    });

    const allPaymentLinks = await db.paymentLink.findMany({
      where: {
        businessId: business.id,
      },
      include: {
        payments: {
          where: {
            status: "COMPLETED",
          },
        },
      },
    });

    // Calculate analytics data
    const analyticsData = calculateAnalyticsData(
      currentPayments,
      previousPayments,
      currentCustomers,
      previousCustomers
    );

    const paymentMethods = calculatePaymentMethodDistribution(allPayments);
    const topProducts = calculateTopProducts(allPaymentLinks);
    const customerSegments = calculateCustomerSegments(allCustomers);
    const recentActivity = generateRecentActivity(allPayments, allCustomers, allPaymentLinks);

    return NextResponse.json({
      analytics: analyticsData,
      paymentMethods,
      topProducts,
      customerSegments,
      recentActivity,
    });
  } catch (error) {
    console.error("Error fetching analytics:", error);
    return NextResponse.json(
      { error: "Failed to fetch analytics" },
      { status: 500 }
    );
  }
} 