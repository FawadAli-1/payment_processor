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
        createdAt: { gte: currentPeriodStart },
      },
      select: {
        status: true,
        amount: true,
      },
    });

    const currentCustomers = await db.customer.count({
      where: {
        businessId: business.id,
        createdAt: { gte: currentPeriodStart },
        status: 'ACTIVE'
      }
    });

    // Get previous period data for comparison
    const previousPayments = await db.payment.findMany({
      where: {
        businessId: business.id,
        createdAt: { gte: previousPeriodStart, lt: currentPeriodStart },
      },
      select: {
        status: true,
        amount: true,
      },
    });

    const previousCustomers = await db.customer.count({
      where: {
        businessId: business.id,
        createdAt: { gte: previousPeriodStart, lt: currentPeriodStart },
        status: 'ACTIVE'
      }
    });

    // Get all data for other analytics (with limits for performance)
    const [allPayments, allPaymentLinks, allCustomers] = await Promise.all([
      db.payment.findMany({
        where: { businessId: business.id },
        select: {
          status: true,
          provider: true,
        },
        take: 1000, // Limit for performance
      }),
      
      db.paymentLink.findMany({
        where: { businessId: business.id },
        select: {
          id: true,
          title: true,
          createdAt: true,
          payments: {
            where: { status: "COMPLETED" },
            select: { amount: true, status: true }
          }
        },
        orderBy: { createdAt: 'desc' },
        take: 50, // Limit to recent payment links
      }),
      
      db.customer.findMany({
        where: { businessId: business.id },
        select: {
          status: true,
          payments: {
            select: { amount: true, status: true }
          }
        },
        orderBy: { createdAt: 'desc' },
        take: 200, // Limit to recent customers
      })
    ]);

    // Transform data for calculations
    const currentCustomersArray = Array(currentCustomers).fill({ status: 'ACTIVE' });
    const previousCustomersArray = Array(previousCustomers).fill({ status: 'ACTIVE' });

    // Calculate analytics data
    const analyticsData = calculateAnalyticsData(
      currentPayments,
      previousPayments,
      currentCustomersArray,
      previousCustomersArray
    );

    const paymentMethods = calculatePaymentMethodDistribution(allPayments);
    const topProducts = calculateTopProducts(allPaymentLinks);
    const customerSegments = calculateCustomerSegments(
      allCustomers.map(customer => ({
        status: customer.status,
        totalSpent: customer.payments.reduce((sum, p) => sum + p.amount, 0)
      }))
    );
    
    const recentActivity = generateRecentActivity(
      allPayments.slice(0, 50).map(p => ({
        id: p.status, // Use status as ID for simplicity
        status: p.status,
        createdAt: new Date(),
        customerName: null,
        amount: 0
      })),
      allCustomers.slice(0, 50).map(c => ({ 
        id: c.status, 
        name: c.status, 
        createdAt: new Date() 
      })),
      allPaymentLinks
    );

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