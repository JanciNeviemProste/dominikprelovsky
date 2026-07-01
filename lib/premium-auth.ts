import crypto from "node:crypto";

// Passwordless členská autentifikácia. Žiadne heslá ani DB — všetko sú podpísané
// HMAC tokeny (rovnaký princíp ako admin-auth). Zdroj pravdy o platnom členstve
// je Stripe (viď lib/premium-membership.ts); tieto tokeny len dokazujú, že
// používateľ vlastní daný e-mail (magic link) a drží prihlásenú session.

const MEMBER_COOKIE = "member_session";
const SESSION_MAX_AGE = 60 * 60 * 24 * 30; // 30 dní
const MAGIC_MAX_AGE = 60 * 5; // 5 minút

function getSecret(): string {
  const s = process.env.PREMIUM_SESSION_SECRET;
  if (!s) throw new Error("PREMIUM_SESSION_SECRET nie je nastavený");
  return s;
}

function sign(payload: string): string {
  return crypto.createHmac("sha256", getSecret()).update(payload).digest("hex");
}

function b64(email: string): string {
  return Buffer.from(email.toLowerCase(), "utf8").toString("base64url");
}

function unb64(s: string): string {
  return Buffer.from(s, "base64url").toString("utf8");
}

function safeEqualHex(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(Buffer.from(a), Buffer.from(b));
}

// --- Magic link token (krátka platnosť, posiela sa e-mailom) ---
export function createMagicToken(email: string): string {
  const exp = (Date.now() + MAGIC_MAX_AGE * 1000).toString();
  const payload = `${b64(email)}.${exp}`;
  return `${payload}.${sign("magic:" + payload)}`;
}

export function verifyMagicToken(token: string | undefined): string | null {
  if (!token) return null;
  const parts = token.split(".");
  if (parts.length !== 3) return null;
  const [e, exp, sig] = parts;
  if (!safeEqualHex(sig, sign("magic:" + `${e}.${exp}`))) return null;
  const expNum = Number(exp);
  if (!Number.isFinite(expNum) || Date.now() > expNum) return null;
  try {
    return unb64(e);
  } catch {
    return null;
  }
}

// --- Member session cookie (dlhá platnosť) ---
export function createMemberSession(email: string): string {
  const issued = Date.now().toString();
  const payload = `${b64(email)}.${issued}`;
  return `${payload}.${sign("session:" + payload)}`;
}

export function verifyMemberSession(token: string | undefined): string | null {
  if (!token) return null;
  const parts = token.split(".");
  if (parts.length !== 3) return null;
  const [e, issued, sig] = parts;
  if (!safeEqualHex(sig, sign("session:" + `${e}.${issued}`))) return null;
  const issuedNum = Number(issued);
  if (!Number.isFinite(issuedNum)) return null;
  const age = Date.now() - issuedNum;
  if (age < 0 || age > SESSION_MAX_AGE * 1000) return null;
  try {
    return unb64(e);
  } catch {
    return null;
  }
}

export async function getSessionEmail(): Promise<string | null> {
  try {
    // next/headers načítame lazy — modul tak zostáva importovateľný mimo requestu (testy).
    const { cookies } = await import("next/headers");
    const store = await cookies();
    return verifyMemberSession(store.get(MEMBER_COOKIE)?.value);
  } catch {
    return null;
  }
}

export const MEMBER_COOKIE_NAME = MEMBER_COOKIE;
export const MEMBER_COOKIE_MAX_AGE = SESSION_MAX_AGE;
