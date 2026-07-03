import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/admin-auth";
import {
  CONTENT_FILES,
  isValidContentType,
  validateContent,
  type ContentType,
} from "@/lib/admin-content";
import { parsePath, setByPath } from "@/lib/json-path";

const REPO_OWNER = process.env.GITHUB_REPO_OWNER || "JanciNeviemProste";
const REPO_NAME = process.env.GITHUB_REPO_NAME || "dominikprelovsky";
const BRANCH = process.env.GITHUB_BRANCH || "main";

async function loadByType(type: ContentType): Promise<unknown> {
  switch (type) {
    case "testimonials":
      return (await import("@/data/testimonials.json")).default;
    case "services":
      return (await import("@/data/services.json")).default;
    case "philosophy":
      return (await import("@/data/philosophy.json")).default;
    case "profile":
      return (await import("@/data/profile.json")).default;
    case "transformations":
      return (await import("@/data/transformations.json")).default;
    case "highlights":
      return (await import("@/data/highlights.json")).default;
    case "site-settings":
      return (await import("@/data/site-settings.json")).default;
    case "ebooks":
      return (await import("@/data/ebooks.json")).default;
  }
}

export async function PATCH(req: NextRequest) {
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

  let body: { contentType?: string; path?: string; value?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Neplatný JSON." }, { status: 400 });
  }

  if (!body.contentType || !isValidContentType(body.contentType)) {
    return NextResponse.json({ error: "Neplatný typ obsahu." }, { status: 400 });
  }
  if (!body.path || !parsePath(body.path)) {
    return NextResponse.json({ error: "Neplatný path." }, { status: 400 });
  }
  if (typeof body.value !== "string" && typeof body.value !== "number" && typeof body.value !== "boolean") {
    return NextResponse.json({ error: "Hodnota musí byť text, číslo alebo boolean." }, { status: 400 });
  }

  // 1. Načítaj aktuálny JSON
  const raw = await loadByType(body.contentType);
  // Deep clone aby sa neškodilo bundlovanému objektu
  const cloned = JSON.parse(JSON.stringify(raw));

  // 2. Setni pole
  const ok = setByPath(cloned, body.path, body.value);
  if (!ok) {
    return NextResponse.json({ error: "Path neexistuje v dátach." }, { status: 400 });
  }

  // 3. Validuj
  const validated = validateContent(body.contentType, cloned);
  if (typeof validated === "string") {
    return NextResponse.json({ error: validated }, { status: 400 });
  }

  // 4. Commit do GitHubu
  const filePath = CONTENT_FILES[body.contentType];
  const apiUrl = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${filePath}?ref=${BRANCH}`;
  const headers = {
    Authorization: `Bearer ${token}`,
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };

  let sha: string;
  try {
    const res = await fetch(apiUrl, { headers, cache: "no-store" });
    if (!res.ok) {
      return NextResponse.json(
        { error: "GitHub API: nepodarilo sa načítať aktuálny súbor." },
        { status: 502 },
      );
    }
    const json = (await res.json()) as { sha: string };
    sha = json.sha;
  } catch {
    return NextResponse.json({ error: "Chyba siete (GitHub)." }, { status: 502 });
  }

  const newContent = JSON.stringify(validated, null, 2) + "\n";
  const base64 = Buffer.from(newContent, "utf-8").toString("base64");
  try {
    const res = await fetch(apiUrl, {
      method: "PUT",
      headers: { ...headers, "Content-Type": "application/json" },
      body: JSON.stringify({
        message: `chore(admin): inline edit ${body.contentType}.${body.path}`,
        content: base64,
        sha,
        branch: BRANCH,
      }),
    });
    if (!res.ok) {
      if (res.status === 409) {
        return NextResponse.json(
          {
            error:
              "Súbor bol medzičasom zmenený. Načítaj stránku znova (F5) a skús ešte raz.",
          },
          { status: 409 },
        );
      }
      return NextResponse.json(
        { error: "GitHub API: nepodarilo sa uložiť." },
        { status: 502 },
      );
    }
  } catch {
    return NextResponse.json({ error: "Chyba siete (GitHub)." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
