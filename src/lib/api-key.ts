import type { NextRequest } from "next/server";
import { db } from "@/lib/db";

export async function getBusinessByApiKey(request: NextRequest) {
  const auth = request.headers.get("authorization") || request.headers.get("Authorization");
  if (!auth) return null;
  const [scheme, token] = auth.split(" ");
  if (scheme?.toLowerCase() !== "bearer" || !token) return null;
  const business = await db.business.findUnique({ where: { apiKey: token } });
  return business;
}


