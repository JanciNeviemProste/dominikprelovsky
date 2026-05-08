"use client";

import type { ContentType } from "./admin-content";

export async function saveContent(type: ContentType, data: unknown): Promise<void> {
  const res = await fetch(`/api/admin/content/${type}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ data }),
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || "Nepodarilo sa uložiť.");
  }
}
