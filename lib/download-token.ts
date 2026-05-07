import { createHmac } from "crypto";

const SECRET = process.env.DOWNLOAD_TOKEN_SECRET || "default-secret-change-me";
const EXPIRY_MS = 72 * 60 * 60 * 1000; // 72 hodín

export function generateDownloadToken(ebookId: string): string {
  const timestamp = Date.now().toString();
  const data = `${ebookId}:${timestamp}`;
  const hmac = createHmac("sha256", SECRET).update(data).digest("hex");
  // Token formát: timestamp.hmac
  return `${timestamp}.${hmac}`;
}

export function verifyDownloadToken(
  ebookId: string,
  token: string
): boolean {
  const parts = token.split(".");
  if (parts.length !== 2) return false;

  const [timestamp, hmac] = parts;
  const ts = parseInt(timestamp, 10);
  if (isNaN(ts)) return false;

  // Overenie expirácie
  if (Date.now() - ts > EXPIRY_MS) return false;

  // Overenie HMAC
  const data = `${ebookId}:${timestamp}`;
  const expectedHmac = createHmac("sha256", SECRET).update(data).digest("hex");

  return hmac === expectedHmac;
}
