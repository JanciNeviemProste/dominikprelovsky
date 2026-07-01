import { NextRequest, NextResponse } from "next/server";
import {
  verifyMagicToken,
  createMemberSession,
  MEMBER_COOKIE_NAME,
  MEMBER_COOKIE_MAX_AGE,
} from "@/lib/premium-auth";
import { hasActiveMembership } from "@/lib/premium-membership";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || url.origin;
  const token = url.searchParams.get("token") || undefined;

  const email = verifyMagicToken(token);
  if (!email) {
    return NextResponse.redirect(`${baseUrl}/premium-videa?error=expired`);
  }

  const active = await hasActiveMembership(email);
  if (!active) {
    return NextResponse.redirect(`${baseUrl}/premium-videa?error=nomember`);
  }

  const res = NextResponse.redirect(`${baseUrl}/premium-videa/kniznica`);
  res.cookies.set({
    name: MEMBER_COOKIE_NAME,
    value: createMemberSession(email),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: MEMBER_COOKIE_MAX_AGE,
  });
  return res;
}
