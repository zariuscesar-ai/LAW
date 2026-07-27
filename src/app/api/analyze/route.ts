import { NextRequest, NextResponse } from "next/server";
import { analyzeDocument } from "@/lib/ai";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { text } = body;

    if (!text || typeof text !== "string") {
      return NextResponse.json(
        { success: false, error: "Document text is required" },
        { status: 400 }
      );
    }

    if (text.length < 100) {
      return NextResponse.json(
        {
          success: false,
          error: "Document is too short. Please upload a complete document.",
        },
        { status: 400 }
      );
    }

    // Truncate very long documents to ~50K chars to control token costs
    const truncatedText = text.slice(0, 50000);

    const analysis = await analyzeDocument(truncatedText);

    return NextResponse.json({ success: true, data: analysis });
  } catch (error) {
    console.error("Analysis error:", error);
    const message =
      error instanceof Error ? error.message : "Analysis failed";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
