import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getBusinessByApiKey } from "@/lib/api-key";
import { withCors } from "../../v1/middleware";
import { getIdempotencyKey, getIdempotentResponse, setIdempotentResponse, rateLimit } from "@/lib/rate-limit";

export const GET = withCors(async function GET(request: NextRequest) {
  try {
    const business = await getBusinessByApiKey(request);
    if (!business) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const links = await db.paymentLink.findMany({
      where: { businessId: business.id },
      orderBy: { createdAt: "desc" },
      include: { payments: { select: { id: true, amount: true, status: true, createdAt: true } } },
    });
    return NextResponse.json({ data: links });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
});

export const POST = withCors(async function POST(request: NextRequest) {
  try {
    const business = await getBusinessByApiKey(request);
    if (!business) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const rl = rateLimit(`pl:${business.id}`);
    if (!rl.allowed) return NextResponse.json({ error: "rate_limited", retryInMs: rl.resetInMs }, { status: 429 });

    const idem = getIdempotencyKey(request.headers);
    if (idem) {
      const cached = getIdempotentResponse(idem);
      if (cached) return NextResponse.json(cached.body, { status: cached.status });
    }

    const body = await request.json();
    const { title, description, amount, currency = "PKR", expiresAt } = body || {};
    if (!title || !amount) {
      return NextResponse.json({ error: "title and amount are required" }, { status: 400 });
    }
    const url = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/pay/${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const link = await db.paymentLink.create({
      data: {
        title,
        description,
        amount: parseInt(String(amount), 10),
        currency,
        status: "ACTIVE",
        businessId: business.id,
        url,
        expiresAt: expiresAt ? new Date(expiresAt) : null,
      },
    });
    const resp = { data: link };
    if (idem) setIdempotentResponse(idem, 201, resp);
    return NextResponse.json(resp, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
});


