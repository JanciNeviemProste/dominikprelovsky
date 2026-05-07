import { NextRequest, NextResponse } from "next/server";
import { readFile } from "fs/promises";
import path from "path";
import { getEbookById } from "@/lib/ebooks";
import { verifyDownloadToken } from "@/lib/download-token";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const ebookId = searchParams.get("ebook");
  const token = searchParams.get("token");

  if (!ebookId || !token) {
    return NextResponse.json(
      { error: "Chýbajúce parametre" },
      { status: 400 }
    );
  }

  const ebook = getEbookById(ebookId);
  if (!ebook) {
    return NextResponse.json(
      { error: "E-book nenájdený" },
      { status: 404 }
    );
  }

  // Overenie tokenu
  if (!verifyDownloadToken(ebookId, token)) {
    return NextResponse.json(
      { error: "Neplatný alebo expirovaný link. Kontaktuj prelovskydominik@gmail.com." },
      { status: 403 }
    );
  }

  // Načítanie PDF
  const filePath = path.join(process.cwd(), "private", "ebooks", ebook.file);

  try {
    const fileBuffer = await readFile(filePath);

    return new NextResponse(fileBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${ebook.file}"`,
      },
    });
  } catch {
    return NextResponse.json(
      { error: "Súbor nenájdený. Kontaktuj prelovskydominik@gmail.com." },
      { status: 404 }
    );
  }
}
