import Stripe from "stripe";

// Členstvo premium videí = aktívne (alebo trialové) Stripe predplatné na danom
// e-maile. Stripe je zdroj pravdy — netreba vlastnú DB.

export function getStripe(): Stripe {
  return new Stripe(process.env.STRIPE_SECRET_KEY!);
}

export function getPremiumPriceId(): string | undefined {
  return process.env.STRIPE_PREMIUM_PRICE_ID;
}

export function isPremiumConfigured(): boolean {
  return !!(process.env.STRIPE_SECRET_KEY && process.env.STRIPE_PREMIUM_PRICE_ID);
}

// Má daný e-mail aktívne členstvo? Prejde všetkých Stripe zákazníkov s týmto
// e-mailom a hľadá aktívne/trialové predplatné na premium cene.
export async function hasActiveMembership(email: string): Promise<boolean> {
  const priceId = getPremiumPriceId();
  if (!priceId || !process.env.STRIPE_SECRET_KEY) return false;
  const stripe = getStripe();
  try {
    const customers = await stripe.customers.list({
      email: email.toLowerCase(),
      limit: 20,
    });
    for (const customer of customers.data) {
      const subs = await stripe.subscriptions.list({
        customer: customer.id,
        price: priceId,
        status: "all",
        limit: 20,
      });
      if (
        subs.data.some(
          (s) => s.status === "active" || s.status === "trialing",
        )
      ) {
        return true;
      }
    }
  } catch (err) {
    console.error("Stripe membership check error:", err);
    return false;
  }
  return false;
}
