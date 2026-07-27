/**
 * AI Document Analysis Pipeline
 *
 * Uses Claude API for legal document analysis.
 * Structured prompts produce consistent, reliable output.
 */

import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || "",
});

// ── Types ──────────────────────────────────────────────

export interface DocumentAnalysis {
  summary: string;
  keyClauses: KeyClause[];
  riskFlags: RiskFlag[];
  obligations: Obligation[];
  dates: DateItem[];
  recommendations: string;
}

export interface KeyClause {
  title: string;
  content: string;
  page?: number;
}

export interface RiskFlag {
  severity: "high" | "medium" | "low";
  clause: string;
  explanation: string;
  suggestion: string;
}

export interface Obligation {
  party: string;
  description: string;
  deadline?: string;
}

export interface DateItem {
  label: string;
  date: string;
  description: string;
}

// ── Prompt Template ───────────────────────────────────

const SYSTEM_PROMPT = `You are a senior legal document analyst with 20 years of experience in contract law. 
You analyze legal documents and produce structured, actionable reports for attorneys.

Rules:
1. Flag genuinely risky or unusual clauses. Do not flag standard boilerplate.
2. Write summaries at an 8th-grade reading level — clients must understand these.
3. Be specific. Reference actual clause text. Do not be generic.
4. If you are uncertain about something, note your uncertainty rather than guessing.
5. Format output as clean JSON matching the schema exactly.

You must respond ONLY with valid JSON. No markdown, no preamble, no explanation outside the JSON.`;

const ANALYSIS_PROMPT = `Analyze the following legal document text. Produce a structured analysis with these fields:

1. "summary": A 3-5 sentence plain-English summary of what this document does and its key points.
2. "keyClauses": Array of {title, content, page?} for the 3-8 most important clauses.
3. "riskFlags": Array of {severity: "high"|"medium"|"low", clause, explanation, suggestion} for clauses that pose risk to the reviewing party. Flag 2-6 items.
4. "obligations": Array of {party, description, deadline?} for concrete obligations each party must fulfill.
5. "dates": Array of {label, date, description} for all significant dates (effective date, termination, renewal, deadlines).
6. "recommendations": 2-4 sentences with actionable next steps for the attorney.

Document text:
---
{document_text}
---`;

// ── Analysis Function ─────────────────────────────────

export async function analyzeDocument(
  documentText: string
): Promise<DocumentAnalysis> {
  if (!process.env.ANTHROPIC_API_KEY) {
    throw new Error("ANTHROPIC_API_KEY is not configured");
  }

  const userPrompt = ANALYSIS_PROMPT.replace("{document_text}", documentText);

  const response = await anthropic.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 4096,
    system: SYSTEM_PROMPT,
    messages: [{ role: "user", content: userPrompt }],
    temperature: 0.2, // Low temp for consistency
  });

  // Extract JSON from response
  const textContent = response.content
    .filter((block) => block.type === "text")
    .map((block) => block.text)
    .join("");

  return parseAnalysisResponse(textContent);
}

// ── Parsing ───────────────────────────────────────────

function parseAnalysisResponse(text: string): DocumentAnalysis {
  // Try to extract JSON from the response (handles occasional markdown wrapping)
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error("Failed to extract JSON from AI response");
  }

  const parsed = JSON.parse(jsonMatch[0]);

  // Validate and provide defaults for missing fields
  return {
    summary: parsed.summary || "Analysis completed. See details below.",
    keyClauses: Array.isArray(parsed.keyClauses) ? parsed.keyClauses : [],
    riskFlags: Array.isArray(parsed.riskFlags) ? parsed.riskFlags : [],
    obligations: Array.isArray(parsed.obligations) ? parsed.obligations : [],
    dates: Array.isArray(parsed.dates) ? parsed.dates : [],
    recommendations:
      parsed.recommendations || "Review the flagged clauses with your client.",
  };
}
