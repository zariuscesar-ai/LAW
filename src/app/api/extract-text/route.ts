import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { success: false, error: "No file provided" },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const fileType = file.type;

    let text = "";

    if (fileType === "application/pdf") {
      // Dynamic import so pdf-parse only loads when needed
      const pdfParse = (await import("pdf-parse")).default;
      const data = await pdfParse(buffer);
      text = data.text;
    } else if (
      fileType ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
      file.name.endsWith(".docx")
    ) {
      // For DOCX: extract raw text (basic approach)
      const mammoth = (await import("mammoth")).default;
      const result = await mammoth.extractRawText({ buffer });
      text = result.value;
    } else if (fileType === "text/plain" || file.name.endsWith(".txt")) {
      text = buffer.toString("utf-8");
    } else {
      return NextResponse.json(
        {
          success: false,
          error: `Unsupported file type: ${fileType}. Please upload PDF, DOCX, or TXT.`,
        },
        { status: 400 }
      );
    }

    // Clean up extracted text
    text = text
      .replace(/\r\n/g, "\n")
      .replace(/\r/g, "\n")
      .replace(/\n{3,}/g, "\n\n")
      .trim();

    if (text.length < 100) {
      return NextResponse.json(
        {
          success: false,
          error: "Could not extract enough text from this document. The file may be scanned or image-based.",
        },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        text,
        fileName: file.name,
        fileSize: file.size,
        fileType,
      },
    });
  } catch (error) {
    console.error("Text extraction error:", error);
    return NextResponse.json(
      {
        success: false,
        error:
          "Failed to extract text. The document may be password-protected or corrupted.",
      },
      { status: 500 }
    );
  }
}
