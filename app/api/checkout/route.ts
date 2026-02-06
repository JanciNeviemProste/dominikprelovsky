import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { getEbookById } from "@/lib/ebooks";

function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY!);
}

export async function POST(req: NextRequest) {
  try {
    const { ebookId } = await req.json();
    const ebook = getEbookById(ebookId);

    if (!ebook) {
      return NextResponse.json({ error: "E-book nenájdený" }, { status: 404 });
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const stripe = getStripe();

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: ebook.name,
              description: "Digitalny e-book od Dominika Prelovskeho",
            },
            unit_amount: ebook.price,
          },
          quantity: 1,
        },
      ],
      metadata: {
        ebookId: ebook.id,
      },
      success_url: `${baseUrl}/dakujem`,
      cancel_url: `${baseUrl}/#novinky`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Stripe checkout error:", err);
    return NextResponse.json(
      { error: "Chyba pri vytvarani platby" },
      { status: 500 }
    );
  }
}
