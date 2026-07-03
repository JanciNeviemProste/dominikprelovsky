import { NextRequest, NextResponse } from "next/server";
import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { isAuthenticated } from "@/lib/admin-auth";

// Client-side direct upload do Vercel Blob.
// PDF ide priamo z prehliadača do Blobu (obíde 4.5 MB limit serverless requestu),
// takže vieme nahrať aj veľké e-booky (desiatky MB). Tento route len:
//   1) pri žiadosti o upload token overí, že ide o prihláseného admina
//      (onBeforeGenerateToken), a
//   2) prijme Vercel callback po dokončení uploadu (onUploadCompleted).
// POZOR: auth sa NESMIE robiť na vrchu POST-u — `blob.upload-completed` callback
// posiela Vercel server-to-server BEZ admin cookie a handleUpload ho overuje sám
// podpisom. Auth patrí výhradne do onBeforeGenerateToken.
const MAX_BYTES = 100 * 1024 * 1024; // 100 MB strop

export async function POST(req: NextRequest): Promise<NextResponse> {
  const body = (await req.json()) as HandleUploadBody;

  try {
    const jsonResponse = await handleUpload({
      body,
      request: req,
      onBeforeGenerateToken: async () => {
        if (!(await isAuthenticated())) {
          throw new Error("Unauthorized");
        }
        return {
          allowedContentTypes: ["application/pdf"],
          addRandomSuffix: true,
          maximumSizeInBytes: MAX_BYTES,
        };
      },
      // Beží na Verceli po nahraní; lokálne (localhost) Vercel callback nezavolá,
      // ale URL rieši klient z návratovej hodnoty upload(), takže tu netreba nič.
      onUploadCompleted: async () => {},
    });
    return NextResponse.json(jsonResponse);
  } catch (err) {
    console.error("Ebook upload (handleUpload) error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Upload zlyhal." },
      { status: 400 },
    );
  }
}
