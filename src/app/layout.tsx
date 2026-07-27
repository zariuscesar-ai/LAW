import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { CookieBanner } from "@/components/CookieBanner";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "DocReview AI — AI-Powered Legal Document Analysis",
  description:
    "Upload any legal document. AI extracts key clauses, flags risks, and generates plain-English summaries. Built for small law firms and solo practitioners.",
  keywords: ["AI legal document review", "contract analysis", "legal AI", "law firm software"],
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://docreview.ai"),
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-background font-sans antialiased">
        {children}
        <CookieBanner />
      </body>
    </html>
  );
}
