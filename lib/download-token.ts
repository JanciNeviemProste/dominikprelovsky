import { createHmac, timingSafeEqual } from "crypto";

const EXPIRY_MS = 72 * 60 * 60 * 1000; // 72 hodín

function getSecret(): string {
  const s = process.env.DOWNLOAD_TOKEN_SECRET;
  if (!s) {
    throw new Error("DOWNLOAD_TOKEN_SECRET nie je nastavený v env premenných.");
  }
  return s;
}

export function generateDownloadToken(ebookId: string): string {
  const timestamp = Date.now().toString();
  const data = `${ebookId}:${timestamp}`;
  const hmac = createHmac("sha256", getSecret()).update(data).digest("hex");
  return `${timestamp}.${hmac}`;
}

export function verifyDownloadToken(ebookId: string, token: string): boolean {
  const parts = token.split(".");
  if (parts.length !== 2) return false;

  const [timestamp, hmac] = parts;
  const ts = parseInt(timestamp, 10);
  if (isNaN(ts)) return false;

  // Expirácia
  if (Date.now() - ts > EXPIRY_MS) return false;
  if (Date.now() - ts < 0) return false;

  // HMAC compare — constant-time
  const data = `${ebookId}:${timestamp}`;
  let expected: string;
  try {
    expected = createHmac("sha256", getSecret()).update(data).digest("hex");
  } catch {
    return false;
  }
  if (hmac.length !== expected.length) return false;
  try {
    return timingSafeEqual(Buffer.from(hmac, "hex"), Buffer.from(expected, "hex"));
  } catch {
    return false;
  }
}
