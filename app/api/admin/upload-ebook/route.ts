import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { isAuthenticated } from "@/lib/admin-auth";

// Vercel serverless function má 4.5 MB limit pre request body na Hobby tier.
// Pre väčšie súbory by sme potrebovali client-side direct upload (handleUpload + upload z @vercel/blob/client).
const MAX_BYTES = 4 * 1024 * 1024; // 4 MB
const PDF_MAGIC = Buffer.from([0x25, 0x50, 0x44, 0x46]); // %PDF

export async function POST(req: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json(
      { error: "Server nie je nakonfigurovaný (chýba BLOB_READ_WRITE_TOKEN)." },
      { status: 500 },
    );
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

  // Pridávam timestamp do filename aby sme zachovali viac verzií + obfuscation
  const timestamp = Date.now();
  const blobPath = `ebooks/${ebookId}-${timestamp}.pdf`;

  try {
    const blob = await put(blobPath, buffer, {
      access: "public",
      contentType: "application/pdf",
      addRandomSuffix: true,
    });
    return NextResponse.json({ url: blob.url });
  } catch (err) {
    console.error("Vercel Blob upload error:", err);
    return NextResponse.json({ error: "Nepodarilo sa nahrať súbor." }, { status: 502 });
  }
}
