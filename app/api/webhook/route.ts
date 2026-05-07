import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { Resend } from "resend";
import { getEbookById } from "@/lib/ebooks";
import { generateDownloadToken } from "@/lib/download-token";

function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY!);
}

function getResend() {
  return new Resend(process.env.RESEND_API_KEY);
}

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  if (!sig) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  const stripe = getStripe();
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const ebookId = session.metadata?.ebookId;
    const customerEmail = session.customer_details?.email;

    if (!ebookId || !customerEmail) {
      console.error("Missing ebookId or email:", { ebookId, customerEmail });
      return NextResponse.json({ received: true });
    }

    const ebook = getEbookById(ebookId);
    if (!ebook) {
      console.error("E-book not found:", ebookId);
      return NextResponse.json({ received: true });
    }

    // Generate download token
    const token = generateDownloadToken(ebookId);
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const downloadUrl = `${baseUrl}/api/download?ebook=${ebookId}&token=${token}`;

    // Send email
    try {
      const resend = getResend();
      await resend.emails.send({
        from: "Dominik Prelovsky <noreply@dominikprelovsky.sk>",
        to: customerEmail,
        subject: `Tvoj e-book: ${ebook.name}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
            <h1 style="font-size: 36px; color: #2b2b2b; margin-bottom: 8px;">
              Ďakujem za nákup!
            </h1>
            <p style="font-size: 14px; color: #2b2b2b; line-height: 1.7; margin-bottom: 24px;">
              Tvoj e-book <strong>${ebook.name}</strong> je pripravený na stiahnutie.
            </p>
            <a href="${downloadUrl}" style="display: inline-block; background-color: #f73131; color: #ffffff; padding: 14px 32px; border-radius: 9999px; font-size: 16px; font-weight: 600; text-decoration: none; text-transform: uppercase; letter-spacing: 1px;">
              STIAHNUŤ E-BOOK
            </a>
            <p style="font-size: 12px; color: #888888; margin-top: 32px; line-height: 1.6;">
              Link je platný 72 hodín. Ak máš akékoľvek otázky, napíš mi na
              <a href="mailto:prelovskydominik@gmail.com" style="color: #f73131;">prelovskydominik@gmail.com</a>.
            </p>
            <hr style="border: none; border-top: 1px solid #eeeeee; margin: 32px 0;" />
            <p style="font-size: 12px; color: #888888;">
              Dominik Prelovský — Science-Based Tréner
            </p>
          </div>
        `,
      });
    } catch (emailErr) {
      console.error("Email send error:", emailErr);
    }
  }

  return NextResponse.json({ received: true });
}
