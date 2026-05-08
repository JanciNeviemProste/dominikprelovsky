"use client";

import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import AdminShell from "./AdminShell";
import SaveBar from "./SaveBar";
import { saveContent } from "@/lib/admin-save";
import { labelStyle, inputStyle, cardStyle } from "./common";

type Service = {
  slug: string;
  title: string;
  tagline: string;
  bullets: string[];
  price: string;
  featured: boolean;
};

export default function ServicesEditor({ initial }: { initial: Service[] }) {
  const [items, setItems] = useState<Service[]>(initial);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<
    { type: "success" | "error"; text: string } | null
  >(null);

  function update(idx: number, patch: Partial<Service>) {
    setItems((prev) => prev.map((s, i) => (i === idx ? { ...s, ...patch } : s)));
  }

  function setFeatured(idx: number) {
    setItems((prev) => prev.map((s, i) => ({ ...s, featured: i === idx })));
  }

  function updateBullet(serviceIdx: number, bulletIdx: number, value: string) {
    setItems((prev) =>
      prev.map((s, i) =>
        i === serviceIdx
          ? { ...s, bullets: s.bullets.map((b, j) => (j === bulletIdx ? value : b)) }
          : s,
      ),
    );
  }

  function addBullet(serviceIdx: number) {
    setItems((prev) =>
      prev.map((s, i) => (i === serviceIdx ? { ...s, bullets: [...s.bullets, ""] } : s)),
    );
  }

  function removeBullet(serviceIdx: number, bulletIdx: number) {
    setItems((prev) =>
      prev.map((s, i) =>
        i === serviceIdx
          ? { ...s, bullets: s.bullets.filter((_, j) => j !== bulletIdx) }
          : s,
      ),
    );
  }

  async function save() {
    setSaving(true);
    setMessage(null);
    try {
      const cleaned = items.map((s) => ({
        ...s,
        bullets: s.bullets.filter((b) => b.trim()),
      }));
      await saveContent("services", cleaned);
      setItems(cleaned);
      setMessage({ type: "success", text: "Uložené!" });
    } catch (err) {
      setMessage({ type: "error", text: err instanceof Error ? err.message : "Chyba." });
    } finally {
      setSaving(false);
    }
  }

  return (
    <AdminShell title="CENNÍK SLUŽIEB" subtitle={`${items.length} služieb`}>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {items.map((s, idx) => (
          <article key={s.slug} style={cardStyle}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 140px", gap: 16, marginBottom: 16 }}>
              <div>
                <label style={labelStyle}>Názov *</label>
                <input
                  type="text"
                  value={s.title}
                  onChange={(e) => update(idx, { title: e.target.value })}
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={labelStyle}>Slug (URL)</label>
                <input
                  type="text"
                  value={s.slug}
                  onChange={(e) => update(idx, { slug: e.target.value })}
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={labelStyle}>Cena *</label>
                <input
                  type="text"
                  value={s.price}
                  onChange={(e) => update(idx, { price: e.target.value })}
                  style={inputStyle}
                  placeholder="600 €"
                />
              </div>
            </div>

            <div style={{ marginBottom: 16 }}>
              <label style={labelStyle}>Tagline / krátky popis</label>
              <textarea
                value={s.tagline}
                onChange={(e) => update(idx, { tagline: e.target.value })}
                rows={2}
                style={{ ...inputStyle, resize: "vertical" }}
              />
            </div>

            <div style={{ marginBottom: 16 }}>
              <label style={labelStyle}>Bullet pointy ({s.bullets.length})</label>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {s.bullets.map((b, j) => (
                  <div key={j} style={{ display: "flex", gap: 8 }}>
                    <input
                      type="text"
                      value={b}
                      onChange={(e) => updateBullet(idx, j, e.target.value)}
                      style={{ ...inputStyle, flex: 1 }}
                    />
                    <button
                      type="button"
                      onClick={() => removeBullet(idx, j)}
                      style={{
                        padding: "8px 10px",
                        border: "1px solid #f5c2c2",
                        borderRadius: 6,
                        backgroundColor: "#fff",
                        color: "#b00020",
                        cursor: "pointer",
                      }}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addBullet(idx)}
                  style={{
                    alignSelf: "flex-start",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    padding: "8px 14px",
                    fontSize: 13,
                    color: "#2b2b2b",
                    border: "1px dashed #ccc",
                    borderRadius: 6,
                    backgroundColor: "#fafafa",
                    cursor: "pointer",
                  }}
                >
                  <Plus size={14} /> Pridať bullet
                </button>
              </div>
            </div>

            <label
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                fontSize: 14,
                color: "#2b2b2b",
                cursor: "pointer",
              }}
            >
              <input
                type="radio"
                name="featured"
                checked={s.featured}
                onChange={() => setFeatured(idx)}
              />
              <span>Zvýrazniť ako „Najobľúbenejšie" (max 1)</span>
            </label>
          </article>
        ))}
      </div>

      <SaveBar saving={saving} message={message} onSave={save} />
    </AdminShell>
  );
}
