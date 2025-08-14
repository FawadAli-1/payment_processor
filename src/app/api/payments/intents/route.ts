import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { initiateCheckoutStub } from "@/lib/providers";
import { db as prisma } from "@/lib/db";
import type { PaymentProvider } from "@prisma/client";
import { decryptJson, isEncryptedCredentials } from "@/lib/security/crypto";
import { initiateCheckout as initiatePayfast } from "@/lib/providers/payfast";
import { initiateCheckout as initiateSafepay } from "@/lib/providers/safepay";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { slug } = body as { slug?: string };

    if (!slug) {
      return NextResponse.json({ error: "Missing slug" }, { status: 400 });
    }

    // Find the PaymentLink by slug (stored as absolute URL currently)
    const link = await db.paymentLink.findFirst({
      where: {
        url: {
          endsWith: `/pay/${slug}`,
        },
      },
    });

    if (!link) {
      return NextResponse.json({ error: "Payment link not found" }, { status: 404 });
    }

    // Choose provider from ProviderConfig (first enabled)
    const providerConfig = await prisma.providerConfig.findFirst({
      where: { businessId: link.businessId, enabled: true },
      orderBy: { createdAt: "asc" },
    });

    // Create a Payment in PENDING with selected provider
    const payment = await db.payment.create({
      data: {
        amount: link.amount,
        currency: link.currency,
        status: "PENDING",
        provider: (providerConfig?.provider || "PAYFAST"),
        businessId: link.businessId,
        paymentLinkId: link.id,
        description: link.description,
      },
    });

    // Record attempt (idempotency could attach header if present)
    try {
      await db.paymentAttempt.create({
        data: {
          paymentId: payment.id,
          provider: (providerConfig?.provider || "PAYFAST"),
          status: "PENDING",
        },
      });
    } catch (e) {
      // If the table isn't present in dev DB yet, continue flow
      console.log(e);
      
    }

    const returnUrl = `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/pay/${slug}/success?pid=${encodeURIComponent(payment.id)}`;
    const notifyUrl = `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/api/webhooks/${(providerConfig?.provider || "payfast").toString().toLowerCase()}`;

    let redirectUrl: string;
    let creds: Record<string, unknown> = (providerConfig?.credentials as Record<string, unknown>) || {};
    if (isEncryptedCredentials(creds)) {
      const d = decryptJson(creds);
      if (d && typeof d === "object") creds = d as Record<string, unknown>;
    }

    const baseInput = {
      amount: payment.amount,
      currency: payment.currency,
      description: payment.description,
      reference: payment.id,
      returnUrl,
      notifyUrl,
      credentials: creds,
    };

    const provider: PaymentProvider = providerConfig?.provider || "PAYFAST";
    switch (provider) {
      case "PAYFAST": {
        const res = await initiatePayfast(baseInput);
        redirectUrl = res.redirectUrl;
        break;
      }
      case "SAFEPAY": {
        const res = await initiateSafepay(baseInput);
        redirectUrl = res.redirectUrl;
        break;
      }
      default: {
        const res = await initiateCheckoutStub(baseInput);
        redirectUrl = res.redirectUrl;
        break;
      }
    }

    // Do not auto-complete; rely on provider redirect/webhook
    return NextResponse.json({ id: payment.id, status: payment.status, redirectUrl });
  } catch (error) {
    console.error("Error creating payment intent:", error);
    return NextResponse.json({ error: "Failed to initiate payment" }, { status: 500 });
  }
}


