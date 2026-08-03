# ⚖️ DocReview AI — Complete Deployment Guide (v2)

**Repo:** `github.com/zariuscesar-ai/LAW`  
**Last updated:** July 28, 2026  
**Architecture:** Next.js 15 + Vercel Postgres + NextAuth.js + Anthropic Claude  

---

## VERCEL SETUP (3 steps — 5 minutes)

### Step 1: Add Vercel Postgres (FREE)

1. Go to **Vercel → Your Project → Storage**
2. Click **Create Database → Postgres**
3. Accept defaults → Create
4. Vercel auto-injects `POSTGRES_URL` and other env vars

### Step 2: Add env vars

In **Vercel → Settings → Environment Variables**, add:

```
AUTH_SECRET=                 # Run: openssl rand -base64 32
ANTHROPIC_API_KEY=           # From console.anthropic.com
NEXT_PUBLIC_APP_URL=         # Your Vercel URL (e.g. https://law.vercel.app)
STRIPE_SECRET_KEY=           # Optional (for payments later)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
```

### Step 3: Deploy

Push to GitHub → Vercel auto-deploys. Tables auto-create on first request.

---

## LOCAL DEV

```bash
cd /Users/zarius/.kun/default_workspace/docreview-ai

# Create .env.local with:
#   POSTGRES_URL=           (from Vercel Postgres dashboard)
#   AUTH_SECRET=            (any random string)
#   ANTHROPIC_API_KEY=      (your key)

git add -A
git commit -m "Your message"
git push
```

---

## ARCHITECTURE

| Layer | Technology | Cost |
|-------|-----------|------|
| Database | Vercel Postgres (Neon) | Free (0.5GB) |
| Auth | NextAuth.js v5 (credentials) | Free (open source) |
| AI | Anthropic Claude API | Pay-per-use (~$0.50/100 docs) |
| Hosting | Vercel | Free |
| Payments | Stripe | 2.9% + $0.30 |

---

## PRICING (unchanged)

| Tier | Price | Target |
|------|-------|--------|
| Starter | $29/mo | Hobby |
| **Pro** | **$79/mo** | **Main tier — 114 users = $300/day** |
| Business | $199/mo | Firms |
