import Link from "next/link";
import { Layers } from "lucide-react";

export const metadata = {
  title: "Privacy Policy — GlassEstimate",
  description: "How GlassEstimate collects, uses, and protects your data.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      <header className="border-b bg-white">
        <div className="max-w-3xl mx-auto px-4 h-16 flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2 font-semibold text-lg">
            <Layers className="h-5 w-5 text-emerald-600" />
            GlassEstimate
          </Link>
          <span className="text-gray-300">|</span>
          <span className="text-sm text-gray-500">Privacy Policy</span>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-12 prose prose-gray prose-sm">
        <p className="text-sm text-gray-400">Last updated: August 2026</p>
        <h1>Privacy Policy</h1>
        <p>
          GlassEstimate (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;)
          is committed to protecting your privacy. This Privacy Policy explains how
          we collect, use, disclose, and safeguard your information when you use
          our glass estimation service.
        </p>

        <h2>1. Information We Collect</h2>
        <h3>1.1 Information You Provide</h3>
        <ul>
          <li><strong>Account Information:</strong> Name, email address, company name, and password when you create an account.</li>
          <li><strong>Payment Information:</strong> Billing details processed securely through Stripe. We never store full credit card numbers.</li>
          <li><strong>Estimate Data:</strong> Project dimensions, glass specifications, hardware selections, and pricing configurations you create.</li>
          <li><strong>Communications:</strong> Messages you send to our support team or through contact forms.</li>
        </ul>

        <h3>1.2 Information Collected Automatically</h3>
        <ul>
          <li><strong>Usage Data:</strong> Pages visited, features used, time spent, and interaction patterns.</li>
          <li><strong>Device Information:</strong> Browser type, operating system, IP address, and device identifiers.</li>
          <li><strong>Cookies:</strong> Essential session cookies and optional analytics cookies.</li>
        </ul>

        <h2>2. How We Use Your Information</h2>
        <ul>
          <li>To provide, maintain, and improve our glass estimation service</li>
          <li>To process your subscription payments through Stripe</li>
          <li>To communicate with you about your account, updates, and support</li>
          <li>To analyze usage patterns and improve our service</li>
          <li>To comply with legal obligations and enforce our Terms of Service</li>
        </ul>

        <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 my-6">
          <p className="text-sm text-emerald-800 font-medium mb-1">🔒 Important</p>
          <p className="text-sm text-emerald-700">
            <strong>We do not sell your data.</strong> Your project data, pricing configurations,
            and client information remain yours. We do not share your data with third parties
            except as necessary to provide the service.
          </p>
        </div>

        <h2>3. Data Retention</h2>
        <ul>
          <li><strong>Account Data:</strong> Retained while your account is active. Deleted within 30 days of account termination.</li>
          <li><strong>Estimate Data:</strong> Stored with your account until you delete it or close your account.</li>
          <li><strong>Payment Records:</strong> Retained for 7 years as required by tax and accounting regulations.</li>
        </ul>

        <h2>4. Data Security</h2>
        <p>We implement industry-standard security measures including encryption in transit (TLS 1.3) and at rest (AES-256), access controls, and regular security audits.</p>

        <h2>5. Contact Us</h2>
        <p>
          For privacy-related inquiries:<br />
          Email: <strong>privacy@glassestimate.app</strong><br />
          Mail: GlassEstimate, [Business Address]
        </p>
      </main>

      <footer className="border-t py-8 mt-12">
        <div className="max-w-3xl mx-auto px-4 text-center text-sm text-gray-400">
          <Link href="/" className="hover:text-gray-600">Home</Link>
          {" · "}
          <Link href="/terms" className="hover:text-gray-600">Terms</Link>
          {" · "}
          <Link href="/privacy" className="hover:text-gray-600">Privacy</Link>
          {" · "}
          <Link href="/disclaimer" className="hover:text-gray-600">Disclaimer</Link>
        </div>
      </footer>
    </div>
  );
}
