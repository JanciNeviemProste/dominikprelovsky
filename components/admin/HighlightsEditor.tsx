"use client";

import { useState } from "react";
import AdminShell from "./AdminShell";
import SaveBar from "./SaveBar";
import { saveContent } from "@/lib/admin-save";
import { labelStyle, inputStyle, cardStyle } from "./common";

type Highlight = { image: string; label: string; ebookId: string };

export default function HighlightsEditor({ initial }: { initial: Highlight[] }) {
  const [items, setItems] = useState<Highlight[]>(initial);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<
    { type: "success" | "error"; text: string } | null
  >(null);

  function update(idx: number, patch: Partial<Highlight>) {
    setItems((prev) => prev.map((s, i) => (i === idx ? { ...s, ...patch } : s)));
  }

  async function save() {
    setSaving(true);
    setMessage(null);
    try {
      await saveContent("highlights", items);
      setMessage({ type: "success", text: "Uložené!" });
    } catch (err) {
      setMessage({ type: "error", text: err instanceof Error ? err.message : "Chyba." });
    } finally {
      setSaving(false);
    }
  }

  return (
    <AdminShell title="NOVINKY (E-BOOKY)" subtitle="3 e-booky v sekcii Novinky">
      <p style={{ fontSize: 13, color: "#888", marginBottom: 16 }}>
        Pozn.: <code>ebookId</code> sa nemení — je to identifikátor produktu pre Stripe.
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {items.map((h, idx) => (
          <article key={idx} style={cardStyle}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
              <div>
                <label style={labelStyle}>Label / názov</label>
                <input
                  type="text"
                  value={h.label}
                  onChange={(e) => update(idx, { label: e.target.value })}
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={labelStyle}>ebookId (nemeniť)</label>
                <input
                  type="text"
                  value={h.ebookId}
                  onChange={(e) => update(idx, { ebookId: e.target.value })}
                  style={{ ...inputStyle, backgroundColor: "#f5f5f5" }}
                  readOnly
                />
              </div>
            </div>
            <div>
              <label style={labelStyle}>Cover obrázok</label>
              <input
                type="text"
                value={h.image}
                onChange={(e) => update(idx, { image: e.target.value })}
                style={inputStyle}
              />
            </div>
          </article>
        ))}
      </div>

      <SaveBar saving={saving} message={message} onSave={save} />
    </AdminShell>
  );
}
