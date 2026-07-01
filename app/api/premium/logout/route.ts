import { NextResponse } from "next/server";
import { MEMBER_COOKIE_NAME } from "@/lib/premium-auth";

export async function POST() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set({ name: MEMBER_COOKIE_NAME, value: "", path: "/", maxAge: 0 });
  return res;
}
