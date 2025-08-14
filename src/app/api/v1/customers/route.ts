import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getBusinessByApiKey } from "@/lib/api-key";
import { withCors } from "../../v1/middleware";
import { getIdempotencyKey, getIdempotentResponse, setIdempotentResponse, rateLimit } from "@/lib/rate-limit";

export const GET = withCors(async function GET(request: NextRequest) {
  try {
    const business = await getBusinessByApiKey(request);
    if (!business) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const customers = await db.customer.findMany({ where: { businessId: business.id }, orderBy: { createdAt: 'desc' } });
    return NextResponse.json({ data: customers });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
});

export const POST = withCors(async function POST(request: NextRequest) {
  try {
    const business = await getBusinessByApiKey(request);
    if (!business) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const rl = rateLimit(`cu:${business.id}`);
    if (!rl.allowed) return NextResponse.json({ error: "rate_limited", retryInMs: rl.resetInMs }, { status: 429 });

    const idem = getIdempotencyKey(request.headers);
    if (idem) {
      const cached = getIdempotentResponse(idem);
      if (cached) return NextResponse.json(cached.body, { status: cached.status });
    }

    const body = await request.json();
    const { name, email, phone, address } = body || {};
    if (!name || !email) {
      return NextResponse.json({ error: "name and email are required" }, { status: 400 });
    }
    const existing = await db.customer.findFirst({ where: { email, businessId: business.id } });
    if (existing) {
      return NextResponse.json({ error: "customer with email exists" }, { status: 400 });
    }
    const customer = await db.customer.create({
      data: { name, email, phone, address, businessId: business.id, status: 'ACTIVE' },
    });
    const resp = { data: customer };
    if (idem) setIdempotentResponse(idem, 201, resp);
    return NextResponse.json(resp, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
});


