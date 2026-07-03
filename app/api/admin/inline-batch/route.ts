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

type IncomingChange = {
  contentType: ContentType;
  path: string;
  value: string | number | boolean;
};

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

async function commitOne(
  type: ContentType,
  newJson: unknown,
  changesCount: number,
  token: string,
): Promise<{ ok: true } | { ok: false; status: number; error: string }> {
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
      return { ok: false, status: 502, error: `GitHub GET zlyhal pre ${type}.` };
    }
    const json = (await res.json()) as { sha: string };
    sha = json.sha;
  } catch {
    return { ok: false, status: 502, error: `Chyba siete (GitHub) pre ${type}.` };
  }

  // 2. PUT new content
  const newContent = JSON.stringify(newJson, null, 2) + "\n";
  const base64 = Buffer.from(newContent, "utf-8").toString("base64");
  try {
    const res = await fetch(apiUrl, {
      method: "PUT",
      headers: { ...headers, "Content-Type": "application/json" },
      body: JSON.stringify({
        message: `chore(admin): ${changesCount} inline ${
          changesCount === 1 ? "edit" : "edits"
        } to ${type}`,
        content: base64,
        sha,
        branch: BRANCH,
      }),
    });
    if (!res.ok) {
      if (res.status === 409) {
        return {
          ok: false,
          status: 409,
          error: `Súbor ${type} bol medzičasom zmenený. Načítaj stránku znova (F5).`,
        };
      }
      return {
        ok: false,
        status: 502,
        error: `GitHub PUT zlyhal pre ${type}.`,
      };
    }
    return { ok: true };
  } catch {
    return { ok: false, status: 502, error: `Chyba siete pri uložení ${type}.` };
  }
}

export async function POST(req: NextRequest) {
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

  let body: { changes?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Neplatný JSON." }, { status: 400 });
  }

  if (!Array.isArray(body.changes) || body.changes.length === 0) {
    return NextResponse.json({ error: "Žiadne zmeny." }, { status: 400 });
  }
  if (body.changes.length > 200) {
    return NextResponse.json({ error: "Príliš veľa zmien naraz." }, { status: 400 });
  }

  // Validuj a zoskup zmeny podľa contentType
  const grouped = new Map<ContentType, IncomingChange[]>();
  for (const raw of body.changes) {
    if (!raw || typeof raw !== "object") {
      return NextResponse.json({ error: "Neplatná zmena." }, { status: 400 });
    }
    const c = raw as Record<string, unknown>;
    if (typeof c.contentType !== "string" || !isValidContentType(c.contentType)) {
      return NextResponse.json({ error: "Neplatný contentType." }, { status: 400 });
    }
    if (typeof c.path !== "string" || !parsePath(c.path)) {
      return NextResponse.json({ error: "Neplatný path." }, { status: 400 });
    }
    if (
      typeof c.value !== "string" &&
      typeof c.value !== "number" &&
      typeof c.value !== "boolean"
    ) {
      return NextResponse.json(
        { error: "Hodnota musí byť text, číslo alebo boolean." },
        { status: 400 },
      );
    }
    const change: IncomingChange = {
      contentType: c.contentType,
      path: c.path,
      value: c.value as string | number | boolean,
    };
    const arr = grouped.get(change.contentType) || [];
    arr.push(change);
    grouped.set(change.contentType, arr);
  }

  // Pre každú group: load, set all paths, validate, commit
  const results: Array<{ contentType: ContentType; ok: boolean; error?: string }> = [];
  let totalCommits = 0;

  for (const [type, changes] of grouped.entries()) {
    const raw = await loadByType(type);
    const cloned = JSON.parse(JSON.stringify(raw));
    let setOk = true;
    for (const ch of changes) {
      if (!setByPath(cloned, ch.path, ch.value)) {
        results.push({ contentType: type, ok: false, error: `Path ${ch.path} neexistuje.` });
        setOk = false;
        break;
      }
    }
    if (!setOk) continue;

    const validated = validateContent(type, cloned);
    if (typeof validated === "string") {
      results.push({ contentType: type, ok: false, error: validated });
      continue;
    }

    const commit = await commitOne(type, validated, changes.length, token);
    if (!commit.ok) {
      results.push({ contentType: type, ok: false, error: commit.error });
    } else {
      results.push({ contentType: type, ok: true });
      totalCommits += 1;
    }
  }

  const failed = results.filter((r) => !r.ok);
  if (failed.length > 0) {
    return NextResponse.json(
      {
        error: failed.map((f) => `${f.contentType}: ${f.error}`).join("; "),
        results,
      },
      { status: 207 }, // partial
    );
  }

  return NextResponse.json({ ok: true, commits: totalCommits });
}
