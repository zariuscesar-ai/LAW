import Link from "next/link";
import { Layers } from "lucide-react";

export const metadata = {
  title: "Terms of Service — GlassEstimate",
  description: "Terms and conditions for using GlassEstimate's glass estimation service.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      <header className="border-b">
        <div className="max-w-3xl mx-auto px-4 h-16 flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2 font-semibold text-lg">
            <Layers className="h-5 w-5 text-emerald-600" />
            GlassEstimate
          </Link>
          <span className="text-gray-300">/</span>
          <span className="text-sm text-gray-500">Terms of Service</span>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-12 prose prose-gray">
        <p className="text-sm text-gray-400 mb-8">Last updated: August 2026</p>

        <h1>Terms of Service</h1>

        <h2>1. Acceptance of Terms</h2>
        <p>
          By accessing or using GlassEstimate (&ldquo;the Service&rdquo;), you agree to be bound by
          these Terms of Service (&ldquo;Terms&rdquo;). If you do not agree, do not use the Service.
        </p>

        <h2>2. Description of Service</h2>
        <p>
          GlassEstimate provides an AI-assisted glass estimation platform designed to help glass
          professionals configure and price glass systems including storefronts, curtain walls,
          office enclosures, and shower enclosures. Estimates are for planning purposes and must
          be verified by a qualified professional before use.
        </p>

        <h2>3. NOT A SUBSTITUTE FOR PROFESSIONAL JUDGMENT</h2>
        <div className="border-l-4 border-red-500 bg-red-50 p-4 my-4 rounded-r-lg">
          <p className="font-bold text-red-800">
            IMPORTANT: GLASSESTIMATE IS AN ESTIMATION TOOL, NOT A REPLACEMENT FOR PROFESSIONAL MEASUREMENT OR JUDGMENT.
          </p>
          <p className="text-red-700">
            The Service generates estimates based on user-provided inputs and industry-standard data.
            ALL estimates must be verified by a qualified glass professional. Users are solely
            responsible for final measurements, pricing, and compliance with building codes.
          </p>
        </div>

        <h2>4. User Eligibility and Accounts</h2>
        <p>
          You must be at least 18 years old to use the Service. You are responsible for
          maintaining the confidentiality of your account credentials and for all activities
          under your account.
        </p>

        <h2>5. Subscription and Payment</h2>
        <p>
          Certain features require a paid subscription. Fees are billed in advance on a monthly
          or annual basis and are non-refundable except as required by applicable law. We reserve
          the right to change pricing with 30 days&apos; notice. You may cancel anytime through
          your account settings.
        </p>

        <h2>6. Acceptable Use</h2>
        <p>You agree not to:</p>
        <ul>
          <li>Use the Service for any unlawful purpose</li>
          <li>Attempt to reverse engineer, decompile, or extract the underlying systems</li>
          <li>Exceed rate limits or use automated means to access the Service without authorization</li>
          <li>Resell, sublicense, or redistribute the Service without our express written permission</li>
        </ul>

        <h2>7. Intellectual Property</h2>
        <p>
          The Service, including its software, algorithms, user interface, and documentation,
          is owned by GlassEstimate and protected by copyright, trademark, and other
          intellectual property laws. You retain ownership of your project data and estimates.
        </p>

        <h2>8. NO WARRANTY; LIMITATION OF LIABILITY</h2>
        <div className="border-l-4 border-amber-500 bg-amber-50 p-4 my-4 rounded-r-lg">
          <p className="font-bold text-amber-800">
            THE SERVICE IS PROVIDED &ldquo;AS IS&rdquo; WITHOUT WARRANTY OF ANY KIND.
          </p>
          <p className="text-amber-700">
            GLASSESTIMATE SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL,
            CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING FROM YOUR USE OF THE SERVICE,
            INCLUDING PRICING ERRORS, MEASUREMENT MISTAKES, OR INSTALLATION ISSUES.
          </p>
        </div>

        <h2>9. Indemnification</h2>
        <p>
          You agree to indemnify and hold harmless GlassEstimate, its officers, directors,
          employees, and agents from any claims, damages, liabilities, and expenses arising
          from your use of the Service.
        </p>

        <h2>10. Termination</h2>
        <p>
          We reserve the right to suspend or terminate your access to the Service at any time,
          with or without cause.
        </p>

        <h2>11. Changes to Terms</h2>
        <p>
          We may modify these Terms at any time. We will notify you of material changes via
          email or through the Service. Continued use constitutes acceptance.
        </p>

        <h2>12. Contact</h2>
        <p>
          Questions about these Terms? Contact us at{" "}
          <a href="mailto:legal@glassestimate.app" className="text-emerald-600 hover:text-emerald-800 underline">
            legal@glassestimate.app
          </a>.
        </p>
      </main>

      <footer className="border-t py-8 mt-12">
        <div className="max-w-3xl mx-auto px-4 text-center text-sm text-gray-400">
          <Link href="/" className="hover:text-gray-600">
            ← Back to GlassEstimate
          </Link>
        </div>
      </footer>
    </div>
  );
}
