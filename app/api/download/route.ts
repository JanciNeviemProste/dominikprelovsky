import { NextRequest, NextResponse } from "next/server";
import { readFile } from "fs/promises";
import path from "path";
import { getEbookById } from "@/lib/ebooks";
import { verifyDownloadToken } from "@/lib/download-token";

/**
 * Bezpečnostne whitelist domén z ktorých môžeme strihovať PDF.
 * Vercel Blob URLs majú formát:
 *   https://<storeId>.public.blob.vercel-storage.com/<path>
 */
function isAllowedBlobUrl(url: string): boolean {
  try {
    const u = new URL(url);
    if (u.protocol !== "https:") return false;
    return u.hostname.endsWith(".public.blob.vercel-storage.com");
  } catch {
    return false;
  }
}

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

  // 1) Vercel Blob URL — len ak je z whitelisted domény
  if (ebook.blobUrl && isAllowedBlobUrl(ebook.blobUrl)) {
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
      // Pokračuj na legacy fallback
    }
  } else if (ebook.blobUrl) {
    console.warn(
      `Ebook ${ebook.id}: blobUrl nie je z dôveryhodnej domény, ignorujem.`,
    );
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
