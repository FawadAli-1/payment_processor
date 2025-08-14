import { NextResponse } from "next/server";

export async function GET() {
  const spec = {
    openapi: "3.0.0",
    info: { title: "PayFlow API", version: "1.0.0" },
    servers: [{ url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000" }],
    paths: {
      "/api/v1/payment_links": {
        get: { summary: "List payment links", security: [{ bearerAuth: [] }] },
        post: { summary: "Create payment link", security: [{ bearerAuth: [] }] },
      },
      "/api/v1/customers": {
        get: { summary: "List customers", security: [{ bearerAuth: [] }] },
        post: { summary: "Create customer", security: [{ bearerAuth: [] }] },
      },
      "/api/v1/payments/intents": {
        post: { summary: "Create payment intent", security: [{ bearerAuth: [] }] },
      },
    },
    components: { securitySchemes: { bearerAuth: { type: "http", scheme: "bearer" } } },
  };
  return NextResponse.json(spec);
}


