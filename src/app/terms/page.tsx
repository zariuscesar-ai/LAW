import Link from "next/link";
import { FileCheck } from "lucide-react";

export const metadata = {
  title: "Terms of Service — DocReview AI",
  description: "Terms and conditions for using DocReview AI's legal document analysis service.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      <header className="border-b">
        <div className="max-w-3xl mx-auto px-4 h-16 flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2 font-semibold text-lg">
            <FileCheck className="h-5 w-5 text-blue-600" />
            DocReview AI
          </Link>
          <span className="text-gray-300">/</span>
          <span className="text-sm text-gray-500">Terms of Service</span>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-12 prose prose-gray">
        <p className="text-sm text-gray-400 mb-8">Last updated: July 27, 2026</p>

        <h1>Terms of Service</h1>

        <h2>1. Acceptance of Terms</h2>
        <p>
          By accessing or using DocReview AI (&ldquo;the Service&rdquo;), you agree to be bound by
          these Terms of Service (&ldquo;Terms&rdquo;). If you do not agree, do not use the Service.
        </p>

        <h2>2. Description of Service</h2>
        <p>
          DocReview AI provides an artificial intelligence-powered document analysis platform
          designed to assist legal professionals in reviewing contracts, agreements, and other
          legal documents. The Service generates summaries, identifies key clauses, flags
          potential risks, and offers suggestions based on machine learning models.
        </p>

        <h2>3. NOT A SUBSTITUTE FOR LEGAL ADVICE</h2>
        <div className="border-l-4 border-red-500 bg-red-50 p-4 my-4 rounded-r-lg">
          <p className="font-bold text-red-800">
            IMPORTANT: DOCREVIEW AI IS NOT A SUBSTITUTE FOR PROFESSIONAL LEGAL ADVICE.
          </p>
          <p className="text-red-700">
            The Service is a productivity tool intended to assist licensed attorneys and legal
            professionals. It does not provide legal advice, establish an attorney-client
            relationship, or replace the professional judgment of a qualified lawyer. ALL AI-generated
            analysis MUST be reviewed, verified, and approved by a licensed attorney before use in
            any legal matter. Users are solely responsible for the accuracy and appropriateness of
            any work product derived from the Service.
          </p>
        </div>

        <h2>4. User Eligibility and Accounts</h2>
        <p>
          You must be at least 18 years old to use the Service. You are responsible for
          maintaining the confidentiality of your account credentials and for all activities
          that occur under your account. You agree to provide accurate and complete
          registration information.
        </p>

        <h2>5. Subscription and Payment</h2>
        <p>
          Certain features of the Service require a paid subscription. Subscription fees are
          billed in advance on a monthly or annual basis and are non-refundable except as
          required by applicable law. We reserve the right to change pricing with 30 days&apos;
          notice. You may cancel your subscription at any time through your account settings
          or by contacting support.
        </p>

        <h2>6. Acceptable Use</h2>
        <p>You agree not to:</p>
        <ul>
          <li>Use the Service for any unlawful purpose or in violation of any applicable laws or regulations</li>
          <li>Upload documents containing malware, viruses, or malicious code</li>
          <li>Attempt to reverse engineer, decompile, or extract the underlying AI models</li>
          <li>Use the Service to generate content that is fraudulent, deceptive, or infringes on third-party rights</li>
          <li>Exceed rate limits or use automated means to access the Service without authorization</li>
          <li>Resell, sublicense, or redistribute the Service without our express written permission</li>
        </ul>

        <h2>7. Intellectual Property</h2>
        <p>
          The Service, including its software, algorithms, user interface, and documentation,
          is owned by DocReview AI and protected by copyright, trademark, and other
          intellectual property laws. You retain ownership of the documents you upload. We
          claim no ownership over your content. By using the Service, you grant us a limited
          license to process your documents solely for the purpose of providing the Service to
          you.
        </p>

        <h2>8. Data Privacy and Confidentiality</h2>
        <p>
          We take the confidentiality of your legal documents seriously. Document data is
          encrypted in transit and at rest. We do not use your documents to train our AI
          models. We do not sell, rent, or share your document data with third parties except
          as necessary to provide the Service (e.g., AI processing via our API providers) or
          as required by law. See our{" "}
          <Link href="/privacy" className="text-blue-600 hover:text-blue-800 underline">
            Privacy Policy
          </Link>{" "}
          for complete details.
        </p>

        <h2>9. Third-Party AI Providers</h2>
        <p>
          The Service utilizes third-party artificial intelligence APIs, including but not
          limited to Anthropic (&ldquo;Claude&rdquo;). We do not control these third-party
          services and are not responsible for their availability, accuracy, or data handling
          practices. Use of these third-party services is subject to their respective terms of
          service.
        </p>

        <h2>10. NO WARRANTY; LIMITATION OF LIABILITY</h2>
        <div className="border-l-4 border-amber-500 bg-amber-50 p-4 my-4 rounded-r-lg">
          <p className="font-bold text-amber-800">
            THE SERVICE IS PROVIDED &ldquo;AS IS&rdquo; WITHOUT WARRANTY OF ANY KIND.
          </p>
          <p className="text-amber-700">
            WE MAKE NO REPRESENTATIONS OR WARRANTIES REGARDING THE ACCURACY, COMPLETENESS, OR
            RELIABILITY OF AI-GENERATED ANALYSIS. TO THE MAXIMUM EXTENT PERMITTED BY LAW,
            DOCREVIEW AI SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL,
            CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING LOST PROFITS, LEGAL MALPRACTICE
            CLAIMS, OR DECISIONS MADE IN RELIANCE ON THE SERVICE.
          </p>
        </div>

        <h2>11. Indemnification</h2>
        <p>
          You agree to indemnify and hold harmless DocReview AI, its officers, directors,
          employees, and agents from any claims, damages, liabilities, and expenses arising
          from your use of the Service, your violation of these Terms, or your violation of
          any third-party rights.
        </p>

        <h2>12. Termination</h2>
        <p>
          We reserve the right to suspend or terminate your access to the Service at any time,
          with or without cause, and with or without notice. Upon termination, your right to
          use the Service will immediately cease. Provisions that by their nature should
          survive termination (including disclaimers, limitations of liability, and
          indemnification) shall survive.
        </p>

        <h2>13. Changes to Terms</h2>
        <p>
          We may modify these Terms at any time. We will notify you of material changes via
          email or through the Service. Your continued use of the Service after such
          modifications constitutes acceptance of the updated Terms.
        </p>

        <h2>14. Governing Law and Dispute Resolution</h2>
        <p>
          These Terms shall be governed by the laws of the State of Delaware, USA, without
          regard to conflict of law principles. Any disputes arising from these Terms shall be
          resolved through binding arbitration in accordance with the rules of the American
          Arbitration Association, and judgment on the award may be entered in any court having
          jurisdiction.
        </p>

        <h2>15. Contact</h2>
        <p>
          Questions about these Terms? Contact us at{" "}
          <a href="mailto:legal@docreview.ai" className="text-blue-600 hover:text-blue-800 underline">
            legal@docreview.ai
          </a>
          .
        </p>
      </main>

      <footer className="border-t py-8 mt-12">
        <div className="max-w-3xl mx-auto px-4 text-center text-sm text-gray-400">
          <Link href="/" className="hover:text-gray-600">
            ← Back to DocReview AI
          </Link>
        </div>
      </footer>
    </div>
  );
}
