import crypto from "crypto";

const ALG = "aes-256-gcm";

function getKey(): Buffer | null {
  const raw = process.env.CREDENTIALS_ENCRYPTION_KEY;
  if (!raw) return null;
  // Accept hex or base64; otherwise treat as utf8 and hash to 32 bytes
  try {
    if (/^[0-9a-fA-F]{64}$/.test(raw)) return Buffer.from(raw, "hex");
    const b64 = Buffer.from(raw, "base64");
    if (b64.length === 32) return b64;
  } catch {}
  // Derive a 32-byte key from the provided string
  return crypto.createHash("sha256").update(raw).digest();
}

export function encryptJson(value: unknown): Record<string, unknown> | null {
  const key = getKey();
  if (!key) return null;
  const iv = crypto.randomBytes(12);
  const plaintext = Buffer.from(JSON.stringify(value), "utf8");
  const cipher = crypto.createCipheriv(ALG, key, iv);
  const enc = Buffer.concat([cipher.update(plaintext), cipher.final()]);
  const tag = cipher.getAuthTag();
  return {
    __enc: true,
    alg: ALG,
    iv: iv.toString("base64"),
    data: enc.toString("base64"),
    tag: tag.toString("base64"),
  };
}

export function decryptJson(wrapped: Record<string, unknown>): unknown | null {
  if (!wrapped || typeof wrapped !== "object" || !wrapped.__enc) return null;
  const key = getKey();
  if (!key) return null;
  const iv = Buffer.from(String(wrapped.iv), "base64");
  const data = Buffer.from(String(wrapped.data), "base64");
  const tag = Buffer.from(String(wrapped.tag), "base64");
  const decipher = crypto.createDecipheriv(ALG, key, iv);
  decipher.setAuthTag(tag);
  const dec = Buffer.concat([decipher.update(data), decipher.final()]);
  try {
    return JSON.parse(dec.toString("utf8"));
  } catch {
    return null;
  }
}

export function isEncryptedCredentials(obj: Record<string, unknown>): boolean {
  return !!(obj && typeof obj === "object" && obj.__enc && obj.iv && obj.data && obj.tag);
}


