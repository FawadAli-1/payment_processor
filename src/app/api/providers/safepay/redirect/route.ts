import { NextRequest } from "next/server";
import { db } from "@/lib/db";

function htmlRedirect(url: string) {
  return `<!doctype html><html><head><meta http-equiv="refresh" content="0;url='${url}'"/></head><body></body></html>`;
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const ref = searchParams.get("ref");
  const success = searchParams.get("success");
  if (!ref || !success) return new Response("Missing params", { status: 400 });

  // In a real integration, call Safepay to create a checkout session and get a redirect URL
  // For now, simulate immediate success redirect.
  // Optionally mark provider as SAFEPAY on the payment for demo
  try {
    await db.payment.update({ where: { id: ref }, data: { provider: "SAFEPAY", status: "COMPLETED" } });
    await db.paymentAttempt.updateMany({ where: { paymentId: ref }, data: { status: "SUCCEEDED" } });
  } catch {}

  return new Response(htmlRedirect(success), { status: 200, headers: { "Content-Type": "text/html" } });
}


