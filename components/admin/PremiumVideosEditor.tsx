"use client";

import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import AdminShell from "./AdminShell";
import SaveBar from "./SaveBar";
import { saveContent } from "@/lib/admin-save";
import { labelStyle, inputStyle, cardStyle } from "./common";

type Video = {
  id: string;
  title: string;
  description?: string;
  provider: "youtube" | "vimeo";
  videoId: string;
};

// Ak admin vloží celú URL, vytiahni z nej ID.
function extractVideoId(provider: "youtube" | "vimeo", raw: string): string {
  const value = raw.trim();
  if (provider === "youtube") {
    const m =
      value.match(/(?:youtu\.be\/|v=|\/embed\/|\/shorts\/)([A-Za-z0-9_-]{6,})/) ||
      null;
    return m ? m[1] : value;
  }
  const m = value.match(/vimeo\.com\/(?:video\/)?(\d+)/) || null;
  return m ? m[1] : value;
}

export default function PremiumVideosEditor({ initial }: { initial: Video[] }) {
  const [items, setItems] = useState<Video[]>(initial);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<
    { type: "success" | "error"; text: string } | null
  >(null);

  function update(idx: number, patch: Partial<Video>) {
    setItems((prev) => prev.map((v, i) => (i === idx ? { ...v, ...patch } : v)));
  }

  function add() {
    setItems((prev) => [
      ...prev,
      {
        id: `video-${Date.now()}`,
        title: "Nové video",
        description: "",
        provider: "youtube",
        videoId: "",
      },
    ]);
  }

  function remove(idx: number) {
    if (!confirm("Zmazať toto video?")) return;
    setItems((prev) => prev.filter((_, i) => i !== idx));
  }

  async function save() {
    setSaving(true);
    setMessage(null);
    try {
      await saveContent("premium-videos", items);
      setMessage({ type: "success", text: "Uložené!" });
    } catch (err) {
      setMessage({
        type: "error",
        text: err instanceof Error ? err.message : "Chyba.",
      });
    } finally {
      setSaving(false);
    }
  }

  return (
    <AdminShell title="PREMIUM VIDEÁ" subtitle={`${items.length} videí v knižnici`}>
      <p style={{ fontSize: 13, color: "#888", marginBottom: 16 }}>
        Vlož ID videa alebo celú URL zo súkromného YouTube/Vimeo. Videá vidia iba
        platiaci členovia. Po uložení sa zmena prejaví na webe za ~60 s.
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {items.map((v, idx) => (
          <article key={`${v.id}-${idx}`} style={cardStyle}>
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
                marginBottom: 12,
              }}
            >
              <span style={{ fontSize: 12, color: "#888", fontWeight: 600 }}>
                #{idx + 1} — id: <code>{v.id}</code>
              </span>
              <button
                type="button"
                onClick={() => remove(idx)}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 4,
                  padding: "6px 10px",
                  fontSize: 12,
                  color: "#b00020",
                  border: "1px solid #f5c2c2",
                  borderRadius: 6,
                  backgroundColor: "#fff",
                  cursor: "pointer",
                }}
              >
                <Trash2 size={14} /> Vymazať
              </button>
            </div>

            <div style={{ marginBottom: 12 }}>
              <label style={labelStyle}>Názov</label>
              <input
                type="text"
                value={v.title}
                onChange={(e) => update(idx, { title: e.target.value })}
                style={inputStyle}
              />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 16, marginBottom: 12 }}>
              <div>
                <label style={labelStyle}>Platforma</label>
                <select
                  value={v.provider}
                  onChange={(e) =>
                    update(idx, { provider: e.target.value as "youtube" | "vimeo" })
                  }
                  style={inputStyle}
                >
                  <option value="youtube">YouTube</option>
                  <option value="vimeo">Vimeo</option>
                </select>
              </div>
              <div>
                <label style={labelStyle}>ID videa alebo URL</label>
                <input
                  type="text"
                  value={v.videoId}
                  placeholder={v.provider === "youtube" ? "napr. dQw4w9WgXcQ" : "napr. 123456789"}
                  onChange={(e) =>
                    update(idx, { videoId: extractVideoId(v.provider, e.target.value) })
                  }
                  style={inputStyle}
                />
              </div>
            </div>

            <div>
              <label style={labelStyle}>Popis (voliteľné)</label>
              <textarea
                value={v.description || ""}
                onChange={(e) => update(idx, { description: e.target.value })}
                rows={2}
                style={{ ...inputStyle, resize: "vertical" as const }}
              />
            </div>
          </article>
        ))}
      </div>

      <SaveBar
        saving={saving}
        message={message}
        onSave={save}
        leftSlot={
          <button
            type="button"
            onClick={add}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "12px 20px",
              fontSize: 14,
              fontWeight: 600,
              color: "#2b2b2b",
              border: "2px dashed #ccc",
              borderRadius: 6,
              backgroundColor: "#fafafa",
              cursor: "pointer",
            }}
          >
            <Plus size={18} /> Pridať video
          </button>
        }
      />
    </AdminShell>
  );
}
