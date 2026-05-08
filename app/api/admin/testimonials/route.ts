import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/admin-auth";
import testimonials from "@/data/testimonials.json";

const REPO_OWNER = "JanciNeviemProste";
const REPO_NAME = "dominikprelovsky";
const FILE_PATH = "data/testimonials.json";
const BRANCH = "main";

type Testimonial = {
  clientName: string;
  role?: string;
  rating?: number;
  text: string;
};

function validate(input: unknown): Testimonial[] | null {
  if (!Array.isArray(input)) return null;
  const result: Testimonial[] = [];
  for (const item of input) {
    if (!item || typeof item !== "object") return null;
    const t = item as Record<string, unknown>;
    if (typeof t.clientName !== "string" || t.clientName.length < 1 || t.clientName.length > 100) {
      return null;
    }
    if (typeof t.text !== "string" || t.text.length < 1 || t.text.length > 5000) {
      return null;
    }
    if (t.role !== undefined && (typeof t.role !== "string" || t.role.length > 200)) {
      return null;
    }
    if (
      t.rating !== undefined &&
      (typeof t.rating !== "number" || t.rating < 1 || t.rating > 5)
    ) {
      return null;
    }
    result.push({
      clientName: t.clientName,
      role: t.role as string | undefined,
      rating: t.rating as number | undefined,
      text: t.text,
    });
  }
  return result;
}

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json({ testimonials });
}

export async function PUT(req: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    return NextResponse.json(
      { error: "Server nie je nakonfigurovaný (chýba GITHUB_TOKEN)." },
      { status: 500 },
    );
  }

  let body: { testimonials?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Neplatný formát." }, { status: 400 });
  }

  const validated = validate(body.testimonials);
  if (!validated) {
    return NextResponse.json({ error: "Neplatné údaje recenzií." }, { status: 400 });
  }

  // 1. Get current SHA from GitHub
  const apiUrl = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${FILE_PATH}?ref=${BRANCH}`;
  const headers = {
    Authorization: `Bearer ${token}`,
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };

  let sha: string;
  try {
    const res = await fetch(apiUrl, { headers, cache: "no-store" });
    if (!res.ok) {
      const errBody = await res.text();
      console.error("GitHub GET failed:", res.status, errBody);
      return NextResponse.json(
        { error: "GitHub API: nepodarilo sa načítať aktuálny súbor." },
        { status: 502 },
      );
    }
    const json = (await res.json()) as { sha: string };
    sha = json.sha;
  } catch (err) {
    console.error("GitHub GET error:", err);
    return NextResponse.json({ error: "Chyba siete (GitHub)." }, { status: 502 });
  }

  // 2. PUT new content
  const newContent = JSON.stringify(validated, null, 2) + "\n";
  const base64 = Buffer.from(newContent, "utf-8").toString("base64");
  try {
    const res = await fetch(apiUrl, {
      method: "PUT",
      headers: { ...headers, "Content-Type": "application/json" },
      body: JSON.stringify({
        message: "chore(admin): update testimonials",
        content: base64,
        sha,
        branch: BRANCH,
      }),
    });
    if (!res.ok) {
      const errBody = await res.text();
      console.error("GitHub PUT failed:", res.status, errBody);
      return NextResponse.json(
        { error: "GitHub API: nepodarilo sa uložiť zmeny." },
        { status: 502 },
      );
    }
  } catch (err) {
    console.error("GitHub PUT error:", err);
    return NextResponse.json({ error: "Chyba siete (GitHub)." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
