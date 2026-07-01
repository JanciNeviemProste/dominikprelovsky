import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/admin-auth";
import { saveBytes } from "@/lib/storage";

// Limit pre request body serverless funkcie. Väčšie súbory by potrebovali
// priamy client-side upload do úložiska.
const MAX_BYTES = 4 * 1024 * 1024; // 4 MB
const PDF_MAGIC = Buffer.from([0x25, 0x50, 0x44, 0x46]); // %PDF

export async function POST(req: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json({ error: "Neplatný request." }, { status: 400 });
  }

  const file = form.get("file");
  const ebookId = form.get("ebookId");

  if (!(file instanceof File) || !file) {
    return NextResponse.json({ error: "Chýba súbor." }, { status: 400 });
  }
  if (typeof ebookId !== "string" || !/^[a-z0-9-]+$/.test(ebookId)) {
    return NextResponse.json({ error: "Neplatný ebookId." }, { status: 400 });
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json(
      {
        error: `Súbor je príliš veľký (max ${MAX_BYTES / 1024 / 1024} MB). Pre väčšie PDF napíš mailom.`,
      },
      { status: 400 },
    );
  }
  if (file.type && file.type !== "application/pdf") {
    return NextResponse.json(
      { error: "Iba PDF súbory sú povolené." },
      { status: 400 },
    );
  }

  // Magic-bytes check — overí že súbor je naozaj PDF
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  if (buffer.length < 4 || !buffer.subarray(0, 4).equals(PDF_MAGIC)) {
    return NextResponse.json(
      { error: "Súbor nie je platné PDF (chýba %PDF hlavička)." },
      { status: 400 },
    );
  }

  // Timestamp v kľúči zachová viac verzií. Kľúč (nie verejná URL) sa uloží do ebooks.json.
  const timestamp = Date.now();
  const blobKey = `ebooks/${ebookId}-${timestamp}.pdf`;

  try {
    await saveBytes(blobKey, buffer);
    return NextResponse.json({ key: blobKey });
  } catch (err) {
    console.error("Blob upload error:", err);
    return NextResponse.json({ error: "Nepodarilo sa nahrať súbor." }, { status: 502 });
  }
}
