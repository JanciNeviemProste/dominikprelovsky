import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/admin-auth";
import {
  CONTENT_FILES,
  ContentType,
  isValidContentType,
  validateContent,
} from "@/lib/admin-content";

const REPO_OWNER = "JanciNeviemProste";
const REPO_NAME = "dominikprelovsky";
const BRANCH = "main";

export async function GET(
  _req: NextRequest,
  ctx: { params: Promise<{ type: string }> },
) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { type } = await ctx.params;
  if (!isValidContentType(type)) {
    return NextResponse.json({ error: "Neplatný typ obsahu." }, { status: 400 });
  }
  const data = await loadByType(type);
  return NextResponse.json({ data });
}

async function loadByType(type: ContentType) {
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
  }
}

export async function PUT(
  req: NextRequest,
  ctx: { params: Promise<{ type: string }> },
) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { type } = await ctx.params;
  if (!isValidContentType(type)) {
    return NextResponse.json({ error: "Neplatný typ obsahu." }, { status: 400 });
  }

  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    return NextResponse.json(
      { error: "Server nie je nakonfigurovaný (chýba GITHUB_TOKEN)." },
      { status: 500 },
    );
  }

  let body: { data?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Neplatný formát." }, { status: 400 });
  }

  const validated = validateContent(type, body.data);
  if (typeof validated === "string") {
    return NextResponse.json({ error: validated }, { status: 400 });
  }

  const filePath = CONTENT_FILES[type];
  const apiUrl = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${filePath}?ref=${BRANCH}`;
  const headers = {
    Authorization: `Bearer ${token}`,
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };

  // 1. GET sha
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
        message: `chore(admin): update ${type}`,
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
