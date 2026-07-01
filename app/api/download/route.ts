import { NextRequest, NextResponse } from "next/server";
import { readFile } from "fs/promises";
import path from "path";
import { getEbookById } from "@/lib/ebooks";
import { verifyDownloadToken } from "@/lib/download-token";
import { readBytes } from "@/lib/storage";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const ebookId = searchParams.get("ebook");
  const token = searchParams.get("token");

  if (!ebookId || !token) {
    return NextResponse.json({ error: "Chýbajúce parametre" }, { status: 400 });
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

  // 1) PDF z úložiska (Netlify Blobs) podľa kľúča
  if (ebook.blobKey && ebook.blobKey.length > 0) {
    try {
      const data = await readBytes(ebook.blobKey);
      if (data) {
        return new NextResponse(Buffer.from(data), {
          headers: {
            "Content-Type": "application/pdf",
            "Content-Disposition": `attachment; filename="${ebook.id}.pdf"`,
          },
        });
      }
    } catch (err) {
      console.error("Blob download error:", err);
      // Pokračuj na legacy fallback
    }
  }

  // 2) Fallback — legacy PDF v private/ebooks/
  if (ebook.legacyFile) {
    const filePath = path.join(
      process.cwd(),
      "private",
      "ebooks",
      ebook.legacyFile,
    );
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
      error:
        "Súbor zatiaľ nie je k dispozícii. Kontaktuj prelovskydominik@gmail.com.",
    },
    { status: 404 }
  );
}
