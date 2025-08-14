type Bucket = {
  windowStart: number;
  count: number;
};

type IdempotencyEntry = {
  createdAt: number;
  body: any;
  status: number;
};

const globalStore = globalThis as unknown as {
  __rateBuckets?: Map<string, Bucket>;
  __idempotency?: Map<string, IdempotencyEntry>;
};

const buckets = (globalStore.__rateBuckets ||= new Map<string, Bucket>());
const idempotency = (globalStore.__idempotency ||= new Map<string, IdempotencyEntry>());

export function rateLimit(key: string, limit = 60, windowMs = 60_000) {
  const now = Date.now();
  const bucket = buckets.get(key);
  if (!bucket || now - bucket.windowStart >= windowMs) {
    buckets.set(key, { windowStart: now, count: 1 });
    return { allowed: true, remaining: limit - 1, resetInMs: windowMs };
  }
  if (bucket.count < limit) {
    bucket.count += 1;
    return { allowed: true, remaining: limit - bucket.count, resetInMs: windowMs - (now - bucket.windowStart) };
  }
  return { allowed: false, remaining: 0, resetInMs: windowMs - (now - bucket.windowStart) };
}

export function getIdempotencyKey(headers: Headers) {
  const h = headers.get("Idempotency-Key") || headers.get("idempotency-key");
  return h?.trim() || null;
}

export function getIdempotentResponse(key: string) {
  const entry = idempotency.get(key);
  if (!entry) return null;
  return entry;
}

export function setIdempotentResponse(key: string, status: number, body: any, ttlMs = 24 * 60 * 60 * 1000) {
  idempotency.set(key, { status, body, createdAt: Date.now() });
  // naive cleanup
  setTimeout(() => idempotency.delete(key), ttlMs).unref?.();
}


