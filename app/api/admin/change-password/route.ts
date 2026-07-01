import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated, verifyPassword } from "@/lib/admin-auth";
import { storePasswordHash } from "@/lib/admin-password-store";

export async function POST(req: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Neprihlásený." }, { status: 401 });
  }

  let body: { currentPassword?: string; newPassword?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Neplatný formát." }, { status: 400 });
  }

  const current = body.currentPassword || "";
  const next = body.newPassword || "";

  if (!(await verifyPassword(current))) {
    return NextResponse.json({ error: "Súčasné heslo je nesprávne." }, { status: 401 });
  }
  if (next.length < 8) {
    return NextResponse.json(
      { error: "Nové heslo musí mať aspoň 8 znakov." },
      { status: 400 },
    );
  }
  if (next === current) {
    return NextResponse.json(
      { error: "Nové heslo sa musí líšiť od súčasného." },
      { status: 400 },
    );
  }

  try {
    await storePasswordHash(next);
  } catch {
    return NextResponse.json({ error: "Uloženie nového hesla zlyhalo." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
