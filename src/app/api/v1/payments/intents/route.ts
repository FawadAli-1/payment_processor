import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getBusinessByApiKey } from "@/lib/api-key";
import { initiateCheckout as initiatePayfast } from "@/lib/providers/payfast";
import { withCors } from "../../middleware";
import { getIdempotencyKey, getIdempotentResponse, setIdempotentResponse, rateLimit } from "@/lib/rate-limit";

export const POST = withCors(async function POST(request: NextRequest) {
  try {
    const business = await getBusinessByApiKey(request);
    if (!business) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const rl = rateLimit(`pi:${business.id}`);
    if (!rl.allowed) return NextResponse.json({ error: "rate_limited", retryInMs: rl.resetInMs }, { status: 429 });

    const idem = getIdempotencyKey(request.headers);
    if (idem) {
      const cached = getIdempotentResponse(idem);
      if (cached) return NextResponse.json(cached.body, { status: cached.status });
    }

    const body = await request.json();
    const { paymentLinkId } = body || {};
    if (!paymentLinkId) return NextResponse.json({ error: "paymentLinkId required" }, { status: 400 });

    const link = await db.paymentLink.findFirst({ where: { id: paymentLinkId, businessId: business.id } });
    if (!link) return NextResponse.json({ error: "Payment link not found" }, { status: 404 });

    const payment = await db.payment.create({
      data: {
        amount: link.amount,
        currency: link.currency,
        status: "PENDING",
        provider: "PAYFAST",
        businessId: business.id,
        paymentLinkId: link.id,
        description: link.description,
      },
    });

    const returnUrl = `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/pay/${link.url.split("/pay/")[1]}/success`;
    const notifyUrl = `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/api/webhooks/payfast`;

    const { redirectUrl } = await initiatePayfast({
      amount: payment.amount,
      currency: payment.currency,
      description: payment.description,
      reference: payment.id,
      returnUrl,
      notifyUrl,
      credentials: {},
    });

    // MVP: mark completed immediately
    const completed = await db.payment.update({ where: { id: payment.id }, data: { status: "COMPLETED" } });
    const resp = { data: { id: completed.id, status: completed.status, redirectUrl } };
    if (idem) setIdempotentResponse(idem, 200, resp);
    return NextResponse.json(resp);
  } catch {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
});


