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
    return NextResponse.json({ error: "E-book nenájdený" }, { status: 404 });
  }

  if (!verifyDownloadToken(ebookId, token)) {
    return NextResponse.json(
      {
        error:
          "Neplatný alebo expirovaný link. Kontaktuj prelovskydominik@gmail.com.",
      },
      { status: 403 }
    );
  }

  // 1) Ak má e-book Vercel Blob URL — fetch z Blob a stream na klienta
  if (ebook.blobUrl) {
    try {
      const upstream = await fetch(ebook.blobUrl);
      if (!upstream.ok || !upstream.body) {
        throw new Error(`Blob fetch failed: ${upstream.status}`);
      }
      const filename = `${ebook.id}.pdf`;
      return new NextResponse(upstream.body, {
        headers: {
          "Content-Type": "application/pdf",
          "Content-Disposition": `attachment; filename="${filename}"`,
        },
      });
    } catch (err) {
      console.error("Blob download error:", err);
      // Pokračuj na legacy fallback nižšie ak by Blob bol nedostupný a legacyFile existoval
    }
  }

  // 2) Fallback — legacy PDF v private/ebooks/
  if (ebook.legacyFile) {
    const filePath = path.join(process.cwd(), "private", "ebooks", ebook.legacyFile);
    try {
      const fileBuffer = await readFile(filePath);
      return new NextResponse(fileBuffer, {
        headers: {
          "Content-Type": "application/pdf",
          "Content-Disposition": `attachment; filename="${ebook.legacyFile}"`,
        },
      });
    } catch {
      // padne nižšie
    }
  }

  return NextResponse.json(
    {
      error: "Súbor zatiaľ nie je k dispozícii. Kontaktuj prelovskydominik@gmail.com.",
    },
    { status: 404 }
  );
}
