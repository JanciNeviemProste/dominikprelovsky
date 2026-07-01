import crypto from "node:crypto";
import { cookies } from "next/headers";
import { getStoredPasswordHash, verifyAgainstHash } from "./admin-password-store";

const COOKIE_NAME = "admin_session";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 30; // 30 dní

function getSecret(): string {
  const secret = process.env.ADMIN_SECRET;
  if (!secret) throw new Error("ADMIN_SECRET nie je nastavený");
  return secret;
}

export async function verifyPassword(input: string): Promise<boolean> {
  // 1) Ak bolo heslo zmenené cez admin, over ho voči hashu uloženému v Blobe.
  const storedHash = await getStoredPasswordHash();
  if (storedHash) {
    return verifyAgainstHash(input, storedHash);
  }
  // 2) Fallback: pôvodné heslo z env ADMIN_PASSWORD.
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;
  // Hash both with same secret — guarantees equal length + constant-time compare
  // independent of password length.
  const secret = getSecret();
  const inputHash = crypto.createHmac("sha256", secret).update(input).digest();
  const expectedHash = crypto.createHmac("sha256", secret).update(expected).digest();
  return crypto.timingSafeEqual(inputHash, expectedHash);
}

function sign(payload: string): string {
  const h = crypto.createHmac("sha256", getSecret());
  h.update(payload);
  return h.digest("hex");
}

export function createSessionToken(): string {
  const issued = Date.now().toString();
  const sig = sign(issued);
  return `${issued}.${sig}`;
}

export function verifySessionToken(token: string | undefined): boolean {
  if (!token) return false;
  const parts = token.split(".");
  if (parts.length !== 2) return false;
  const [issued, sig] = parts;
  const issuedNum = Number(issued);
  if (!Number.isFinite(issuedNum)) return false;
  const ageMs = Date.now() - issuedNum;
  if (ageMs < 0 || ageMs > COOKIE_MAX_AGE * 1000) return false;
  const expected = sign(issued);
  if (sig.length !== expected.length) return false;
  return crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected));
}

export async function isAuthenticated(): Promise<boolean> {
  try {
    const store = await cookies();
    return verifySessionToken(store.get(COOKIE_NAME)?.value);
  } catch {
    return false;
  }
}

export const ADMIN_COOKIE_NAME = COOKIE_NAME;
export const ADMIN_COOKIE_MAX_AGE = COOKIE_MAX_AGE;
