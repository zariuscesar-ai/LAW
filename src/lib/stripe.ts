import Stripe from "stripe";

let stripeInstance: Stripe | null = null;

export function getStripe(): Stripe {
  if (!stripeInstance) {
    stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
      apiVersion: "2025-02-24.acacia",
      typescript: true,
    });
  }
  return stripeInstance;
}

/**
 * Pricing plans — keep in sync with Stripe dashboard.
 * Create these products + prices in Stripe first.
 */
export const PLANS = {
  starter: {
    id: "starter",
    name: "Starter",
    priceCents: 2900, // $29/mo
    documentsPerMonth: 10,
    features: [
      "10 document analyses per month",
      "Plain-English summaries",
      "Risk flag detection",
      "Email support",
    ],
    stripePriceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_STARTER || "",
  },
  pro: {
    id: "pro",
    name: "Professional",
    priceCents: 7900, // $79/mo
    documentsPerMonth: 50,
    features: [
      "50 document analyses per month",
      "Everything in Starter",
      "Key clause extraction",
      "Obligation & deadline tracking",
      "Export to PDF",
      "Priority support",
    ],
    stripePriceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_PRO || "",
  },
  business: {
    id: "business",
    name: "Business",
    priceCents: 19900, // $199/mo
    documentsPerMonth: 999, // effectively unlimited
    features: [
      "Unlimited document analyses",
      "Everything in Professional",
      "Multi-user team access",
      "Custom clause templates",
      "API access",
      "Dedicated account manager",
    ],
    stripePriceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_BUSINESS || "",
  },
} as const;

export type PlanId = keyof typeof PLANS;
