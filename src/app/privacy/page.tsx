import Link from "next/link";
import { FileCheck } from "lucide-react";

export const metadata = {
  title: "Privacy Policy — DocReview AI",
  description: "How DocReview AI collects, uses, and protects your data.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      <header className="border-b bg-white">
        <div className="max-w-3xl mx-auto px-4 h-16 flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2 font-semibold text-lg">
            <FileCheck className="h-5 w-5 text-blue-600" />
            DocReview AI
          </Link>
          <span className="text-gray-300">|</span>
          <span className="text-sm text-gray-500">Privacy Policy</span>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-12 prose prose-gray prose-sm">
        <p className="text-sm text-gray-400">Last updated: July 27, 2026</p>

        <h1>Privacy Policy</h1>

        <p>
          DocReview AI (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;)
          is committed to protecting your privacy. This Privacy Policy explains how
          we collect, use, disclose, and safeguard your information when you use
          our AI-powered document analysis service.
        </p>

        <h2>1. Information We Collect</h2>

        <h3>1.1 Information You Provide</h3>
        <ul>
          <li><strong>Account Information:</strong> Name, email address, law firm name, and password when you create an account.</li>
          <li><strong>Payment Information:</strong> Billing details processed securely through Stripe. We never store full credit card numbers.</li>
          <li><strong>Document Content:</strong> Legal documents you upload for analysis, including the full text of contracts, leases, NDAs, and other legal materials.</li>
          <li><strong>Communications:</strong> Messages you send to our support team or through contact forms.</li>
        </ul>

        <h3>1.2 Information Collected Automatically</h3>
        <ul>
          <li><strong>Usage Data:</strong> Pages visited, features used, time spent, and interaction patterns.</li>
          <li><strong>Device Information:</strong> Browser type, operating system, IP address, and device identifiers.</li>
          <li><strong>Cookies:</strong> Essential session cookies and optional analytics cookies (see Section 7).</li>
        </ul>

        <h2>2. How We Use Your Information</h2>
        <ul>
          <li>To provide, maintain, and improve our document analysis service</li>
          <li>To process your subscription payments through Stripe</li>
          <li>To communicate with you about your account, updates, and support</li>
          <li>To analyze usage patterns and improve our AI models (in anonymized, aggregated form only)</li>
          <li>To comply with legal obligations and enforce our Terms of Service</li>
          <li>To detect and prevent fraud, abuse, and security incidents</li>
        </ul>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 my-6">
          <p className="text-sm text-blue-800 font-medium mb-1">🔒 Important</p>
          <p className="text-sm text-blue-700">
            <strong>We do NOT use your uploaded documents to train our AI models.</strong>{" "}
            Documents are processed transiently through the Anthropic Claude API,
            which does not retain or train on API-submitted data. See{" "}
            <a href="https://docs.anthropic.com/en/docs/privacy" target="_blank" rel="noopener" className="underline">
              Anthropic&apos;s data usage policy
            </a>.
          </p>
        </div>

        <h2>3. How We Share Your Information</h2>
        <p>We share information only as necessary to provide our service:</p>
        <ul>
          <li><strong>Service Providers:</strong> Anthropic (AI processing), Supabase (database hosting), Stripe (payment processing), Vercel (hosting), and Resend (email delivery).</li>
          <li><strong>Legal Requirements:</strong> When required by law, subpoena, or to protect our rights, property, or safety.</li>
          <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets.</li>
        </ul>
        <p>We <strong>never sell</strong> your personal data or uploaded documents.</p>

        <h2>4. Data Retention</h2>
        <ul>
          <li><strong>Account Data:</strong> Retained while your account is active. Deleted within 30 days of account termination.</li>
          <li><strong>Uploaded Documents:</strong> Retained for the duration of your analysis session plus 30 days, unless you choose to save them to your account.</li>
          <li><strong>Analysis Results:</strong> Stored with your account until you delete them or close your account.</li>
          <li><strong>Payment Records:</strong> Retained for 7 years as required by tax and accounting regulations.</li>
        </ul>

        <h2>5. Data Security</h2>
        <p>
          We implement industry-standard security measures including:
        </p>
        <ul>
          <li>Encryption in transit (TLS 1.3) and at rest (AES-256)</li>
          <li>Row-Level Security (RLS) on our database to isolate tenant data</li>
          <li>Regular security audits and vulnerability scanning</li>
          <li>Access controls limiting data access to essential personnel only</li>
        </ul>
        <p>
          However, no method of electronic storage is 100% secure. We cannot
          guarantee absolute security.
        </p>

        <h2>6. Your Rights</h2>
        <p>Depending on your jurisdiction, you may have the right to:</p>
        <ul>
          <li>Access the personal data we hold about you</li>
          <li>Correct inaccurate or incomplete data</li>
          <li>Request deletion of your data (&ldquo;right to be forgotten&rdquo;)</li>
          <li>Export your data in a portable format</li>
          <li>Object to or restrict certain processing activities</li>
          <li>Withdraw consent where processing is based on consent</li>
        </ul>
        <p>
          To exercise these rights, contact us at{" "}
          <strong>privacy@docreview.ai</strong>. We will respond within 30 days.
        </p>

        <h3>6.1 California Residents (CCPA/CPRA)</h3>
        <p>
          If you are a California resident, you have additional rights under the CCPA/CPRA,
          including the right to know what personal information is collected, the right to
          delete, and the right to opt-out of the sale of personal information. We do not
          sell personal information. To exercise CCPA rights, email{" "}
          <strong>privacy@docreview.ai</strong>.
        </p>

        <h3>6.2 EEA/UK Residents (GDPR)</h3>
        <p>
          We process personal data under the following lawful bases: contractual necessity
          (providing our service), legitimate interest (improving our service, security),
          and consent (marketing communications). Our Data Protection Officer can be
          reached at <strong>dpo@docreview.ai</strong>. You have the right to lodge a
          complaint with your local supervisory authority.
        </p>

        <h2>7. Cookies</h2>
        <p>We use the following types of cookies:</p>
        <ul>
          <li><strong>Essential Cookies:</strong> Required for authentication, security, and core functionality. Cannot be disabled.</li>
          <li><strong>Analytics Cookies (Optional):</strong> Help us understand how users interact with our service to improve it. You may opt out.</li>
        </ul>

        <h2>8. Children&apos;s Privacy</h2>
        <p>
          Our service is not intended for individuals under 18 years of age. We do not
          knowingly collect data from children.
        </p>

        <h2>9. International Data Transfers</h2>
        <p>
          Your data may be processed in the United States and other countries where our
          service providers operate. We ensure appropriate safeguards (Standard Contractual
          Clauses) are in place for transfers outside the EEA/UK.
        </p>

        <h2>10. Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. We will notify you of
          material changes via email or through our service. Continued use after changes
          constitutes acceptance.
        </p>

        <h2>11. Contact Us</h2>
        <p>
          For privacy-related inquiries:<br />
          Email: <strong>privacy@docreview.ai</strong><br />
          Mail: DocReview AI, [Business Address]<br />
          Data Protection Officer: <strong>dpo@docreview.ai</strong>
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
          <Link href="/disclaimer" className="hover:text-gray-600">AI Disclaimer</Link>
        </div>
      </footer>
    </div>
  );
}
