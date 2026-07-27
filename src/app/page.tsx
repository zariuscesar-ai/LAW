import { ArrowRight, FileCheck, Shield, Clock, Star } from "lucide-react";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Nav */}
      <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 font-semibold text-xl">
            <FileCheck className="h-6 w-6 text-blue-600" />
            DocReview AI
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
            <a href="#features" className="hover:text-foreground transition-colors">Features</a>
            <a href="#pricing" className="hover:text-foreground transition-colors">Pricing</a>
            <a href="#faq" className="hover:text-foreground transition-colors">FAQ</a>
          </nav>
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Sign in
            </Link>
            <Link
              href="/signup"
              className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition-colors"
            >
              Start free trial <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 to-transparent" />
        <div className="container relative pt-24 pb-16 md:pt-32 md:pb-24">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border bg-white px-4 py-1.5 text-sm text-muted-foreground">
              <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
              Trusted by 200+ law firms
            </div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Review legal documents{" "}
              <span className="text-blue-600">in minutes, not hours</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground md:text-xl max-w-2xl mx-auto">
              Upload any contract, lease, or NDA. Our AI extracts key clauses, flags
              risks, and delivers a plain-English summary — so you can focus on your
              clients, not paperwork.
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/signup"
                className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-base font-semibold text-white hover:bg-blue-700 transition-colors shadow-sm"
              >
                Start free 14-day trial <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                href="#demo"
                className="inline-flex items-center gap-2 rounded-lg border px-6 py-3 text-base font-medium hover:bg-gray-50 transition-colors"
              >
                Watch demo
              </Link>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              No credit card required · Cancel anytime
            </p>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="border-y bg-gray-50/50">
        <div className="container py-8">
          <p className="text-center text-sm text-muted-foreground mb-6">
            Backed by attorneys from
          </p>
          <div className="flex flex-wrap items-center justify-center gap-12 opacity-50">
            <span className="text-lg font-bold text-gray-400">Kirkland &amp; Ellis</span>
            <span className="text-lg font-bold text-gray-400">Latham &amp; Watkins</span>
            <span className="text-lg font-bold text-gray-400">Skadden</span>
            <span className="text-lg font-bold text-gray-400">Jones Day</span>
            <span className="text-lg font-bold text-gray-400">Sidley Austin</span>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 md:py-28">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Everything a modern law firm needs
            </h2>
            <p className="mt-4 text-muted-foreground">
              Built by lawyers, for lawyers. No AI hype — just practical tools that save
              billable hours.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {features.map((f) => (
              <div
                key={f.title}
                className="rounded-xl border bg-white p-6 hover:shadow-md transition-shadow"
              >
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                  {f.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-gray-50 py-20 md:py-28">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Three steps to review any document
            </h2>
          </div>
          <div className="mx-auto max-w-4xl grid gap-8 md:grid-cols-3">
            {steps.map((s, i) => (
              <div key={s.title} className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-2xl font-bold text-white">
                  {i + 1}
                </div>
                <h3 className="text-lg font-semibold mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground">{s.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 md:py-28">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Simple, transparent pricing
            </h2>
            <p className="mt-4 text-muted-foreground">
              Start free. Upgrade when you&apos;re ready. Cancel anytime.
            </p>
          </div>
          <div className="mx-auto max-w-4xl grid gap-8 md:grid-cols-3">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-xl border p-8 ${
                  plan.featured
                    ? "border-blue-600 ring-2 ring-blue-600 shadow-lg relative"
                    : "hover:shadow-md transition-shadow"
                }`}
              >
                {plan.featured && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white">
                    Most Popular
                  </span>
                )}
                <h3 className="text-lg font-semibold">{plan.name}</h3>
                <div className="mt-4 mb-6">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  {plan.price !== "Free" && (
                    <span className="text-muted-foreground">/month</span>
                  )}
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <FileCheck className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/signup"
                  className={`block w-full rounded-lg py-2.5 text-center text-sm font-semibold transition-colors ${
                    plan.featured
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "border hover:bg-gray-50"
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gray-900 py-20 md:py-28">
        <div className="container text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Ready to review documents 10x faster?
          </h2>
          <p className="mt-4 text-gray-400 max-w-xl mx-auto">
            Join 200+ law firms already using DocReview AI. Start your free 14-day trial
            today.
          </p>
          <div className="mt-8">
            <Link
              href="/signup"
              className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-base font-semibold text-white hover:bg-blue-700 transition-colors"
            >
              Start free trial <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12">
        <div className="container flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex items-center gap-2 font-semibold">
            <FileCheck className="h-5 w-5 text-blue-600" />
            DocReview AI
          </div>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} DocReview AI. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-foreground transition-colors">Terms</Link>
            <Link href="/disclaimer" className="hover:text-foreground transition-colors">AI Disclaimer</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

const features = [
  {
    icon: <Shield className="h-6 w-6" />,
    title: "Risk Flagging",
    description:
      "Automatically identify unusual clauses, missing provisions, and potential liabilities — color-coded by severity.",
  },
  {
    icon: <Clock className="h-6 w-6" />,
    title: "Plain-English Summaries",
    description:
      "Every document gets a one-page executive summary your clients can actually understand. No legalese.",
  },
  {
    icon: <FileCheck className="h-6 w-6" />,
    title: "Document Comparison",
    description:
      "Upload two versions of a contract and instantly see what changed, added, or removed — with AI commentary.",
  },
  {
    icon: <Shield className="h-6 w-6" />,
    title: "Clause Library",
    description:
      "Build your firm's library of approved clauses. AI suggests them when reviewing new documents.",
  },
  {
    icon: <Clock className="h-6 w-6" />,
    title: "Batch Processing",
    description:
      "Drop 50 NDAs at once. Get all reviews back in minutes. Perfect for due diligence.",
  },
  {
    icon: <FileCheck className="h-6 w-6" />,
    title: "Export & Share",
    description:
      "Export annotated PDFs, share review links with clients, or push directly to your practice management tool.",
  },
];

const steps = [
  {
    title: "Upload",
    description:
      "Drag and drop any PDF, DOCX, or scanned document. We handle OCR automatically.",
  },
  {
    title: "Review",
    description:
      "AI analyzes the document in seconds. Review the flagged clauses and AI suggestions.",
  },
  {
    title: "Act",
    description:
      "Accept AI suggestions, add your own notes, and export the annotated document.",
  },
];

const plans = [
  {
    name: "Starter",
    price: "Free",
    features: [
      "5 documents/month",
      "Basic clause detection",
      "Plain-English summary",
      "PDF export",
    ],
    cta: "Get started",
    featured: false,
  },
  {
    name: "Professional",
    price: "$79",
    features: [
      "50 documents/month",
      "Advanced risk analysis",
      "Document comparison",
      "Clause library",
      "Batch processing",
      "Priority support",
    ],
    cta: "Start free trial",
    featured: true,
  },
  {
    name: "Firm",
    price: "$199",
    features: [
      "Unlimited documents",
      "Everything in Professional",
      "5 team members",
      "Custom clause templates",
      "API access",
      "Dedicated account manager",
    ],
    cta: "Start free trial",
    featured: false,
  },
];
