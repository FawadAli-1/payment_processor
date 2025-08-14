import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function withCors(handler: (req: NextRequest) => Promise<NextResponse> | NextResponse) {
  return async (req: NextRequest) => {
    if (req.method === "OPTIONS") {
      return new NextResponse(null, { status: 204, headers: corsHeaders() });
    }
    const res = await handler(req);
    for (const [k, v] of Object.entries(corsHeaders())) {
      res.headers.set(k, v);
    }
    return res;
  };
}

function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
    "Access-Control-Allow-Headers": "Authorization, Content-Type, Idempotency-Key",
  } as Record<string, string>;
}


