import { NextRequest, NextResponse } from "next/server";
import { getStripe, getPremiumPriceId } from "@/lib/premium-membership";

export async function POST(req: NextRequest) {
  try {
    const priceId = getPremiumPriceId();
    if (!priceId || !process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json(
        { error: "Členstvo zatiaľ nie je nakonfigurované." },
        { status: 500 },
      );
    }

    let email: string | undefined;
    try {
      const body = await req.json();
      email = typeof body?.email === "string" ? body.email.trim() : undefined;
    } catch {
      // telo je voliteľné
    }
    const validEmail =
      email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? email : undefined;

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const stripe = getStripe();

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [{ price: priceId, quantity: 1 }],
      customer_email: validEmail,
      allow_promotion_codes: true,
      metadata: { kind: "premium-membership" },
      subscription_data: { metadata: { kind: "premium-membership" } },
      success_url: `${baseUrl}/premium-videa/vitaj`,
      cancel_url: `${baseUrl}/premium-videa`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Premium checkout error:", err);
    return NextResponse.json(
      { error: "Chyba pri vytváraní platby." },
      { status: 500 },
    );
  }
}
