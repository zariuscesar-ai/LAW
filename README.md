# ⚖️ DocReview AI

**AI-powered legal document analysis for small law firms and solo practitioners.**

Upload any contract, lease, NDA, or legal document. Claude extracts key clauses, flags risks, identifies obligations, and delivers a plain-English summary — in minutes, not hours.

---

## 🎯 Business Model

| Tier | Price | Documents/Month | Target |
|------|-------|-----------------|--------|
| Starter | $29/mo | 10 | Solo practitioners testing the waters |
| **Professional** | **$79/mo** | 50 | Active attorneys (main tier) |
| Business | $199/mo | Unlimited | Small firms with teams |

**Goal:** $300/day ($9,000 MRR) = 114 Professional-tier customers.

---

## 🛠️ Tech Stack

- **Framework:** Next.js 15 (App Router, TypeScript)
- **Styling:** Tailwind CSS 3 + custom design tokens
- **AI:** Anthropic Claude API (structured legal analysis)
- **Database:** Supabase (PostgreSQL + Auth + Storage)
- **Payments:** Stripe (subscriptions + webhooks)
- **Deployment:** Vercel

---

## 🚀 Quick Start

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment

Copy `.env.local` and fill in your keys:

```env
# Supabase (supabase.com — free tier)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...

# AI (console.anthropic.com)
ANTHROPIC_API_KEY=sk-ant-...

# Stripe (dashboard.stripe.com)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_PRICE_STARTER=price_...
NEXT_PUBLIC_STRIPE_PRICE_PRO=price_...
NEXT_PUBLIC_STRIPE_PRICE_BUSINESS=price_...
```

### 3. Set up Supabase

Run these SQL statements in the Supabase SQL Editor:

```sql
-- Profiles table
CREATE TABLE profiles (
  id UUID REFERENCES auth.users PRIMARY KEY,
  email TEXT NOT NULL,
  full_name TEXT,
  firm_name TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Documents table
CREATE TABLE documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users NOT NULL,
  file_name TEXT NOT NULL,
  file_size INTEGER NOT NULL,
  file_type TEXT NOT NULL,
  status TEXT DEFAULT 'uploading' CHECK (status IN ('uploading','processing','completed','failed')),
  original_text TEXT,
  analysis_json JSONB,
  error_message TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Subscriptions table
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users NOT NULL UNIQUE,
  plan_tier TEXT NOT NULL CHECK (plan_tier IN ('starter','pro','business')),
  status TEXT DEFAULT 'active' CHECK (status IN ('active','cancelled','past_due','trialing')),
  current_period_start TIMESTAMPTZ NOT NULL,
  current_period_end TIMESTAMPTZ NOT NULL,
  stripe_subscription_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

-- RLS policies
CREATE POLICY "Users can read own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can read own documents" ON documents FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own documents" ON documents FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can read own subscription" ON subscriptions FOR SELECT USING (auth.uid() = user_id);
```

### 4. Set up Stripe

Create 3 subscription products in Stripe Dashboard:
- **Starter** — $29/month
- **Professional** — $79/month  
- **Business** — $199/month

Copy each price ID into `.env.local`.

### 5. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## 📁 Project Structure

```
src/
├── app/
│   ├── page.tsx                  # Landing page (hero, features, pricing)
│   ├── layout.tsx                # Root layout + metadata
│   ├── globals.css               # Design tokens + Tailwind
│   ├── dashboard/
│   │   └── page.tsx              # Document upload + analysis results
│   └── api/
│       ├── analyze/route.ts      # POST — AI document analysis
│       ├── create-checkout/route.ts  # POST — Stripe checkout session
│       └── webhook/stripe/route.ts   # POST — Stripe webhook handler
├── lib/
│   ├── ai.ts                     # Claude analysis pipeline + prompt templates
│   ├── stripe.ts                 # Stripe client + pricing plan definitions
│   ├── supabase.ts               # Supabase client + database types
│   └── utils.ts                  # cn(), formatCurrency(), helpers
└── types/
    └── index.ts                  # Shared TypeScript interfaces
```

---

## 🧠 How the AI Pipeline Works

1. User uploads a document (or pastes text) on the dashboard
2. Text is sent to `POST /api/analyze`
3. Server calls Claude with a **legal-expert system prompt** and structured output instructions
4. Claude returns JSON with: summary, key clauses, risk flags, obligations, important dates, recommendations
5. Results render in a tabbed interface (Summary / Risks / Clauses / Obligations / Dates)

The system prompt is tuned for legal documents and produces consistent, structured output. Temperature is set to 0.2 for reliability.

---

## 📈 Path to $300/day

```
Month 1:   $0         (build + beta)
Month 2:   $500       (first paying customers)
Month 3:   $1,500     (launch momentum)
Month 4:   $3,000     (content + outreach)
Month 5:   $5,000     (referrals kick in)
Month 6:   $7,000     (SEO working)
Month 7:   $9,000 ✅  ($300/day achieved)
```

---

## 🏗️ Built with Kun

This project was scaffolded and built in a single session using [Kun](https://kun.app) — the AI-native desktop app for developers.
