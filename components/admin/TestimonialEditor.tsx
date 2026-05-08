"use client";

import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import AdminShell from "./AdminShell";
import SaveBar from "./SaveBar";
import { saveContent } from "@/lib/admin-save";

type Testimonial = {
  clientName: string;
  role?: string;
  rating?: number;
  text: string;
};

interface Props {
  initialTestimonials: Testimonial[];
}

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: 12,
  fontWeight: 600,
  color: "#555",
  marginBottom: 4,
  textTransform: "uppercase",
  letterSpacing: "0.5px",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "10px 12px",
  fontSize: 14,
  border: "1px solid #ccc",
  borderRadius: 6,
  outline: "none",
  boxSizing: "border-box",
  fontFamily: "inherit",
};

const ratingButtonStyle = (active: boolean): React.CSSProperties => ({
  width: 36,
  height: 36,
  borderRadius: 6,
  border: active ? "2px solid #f73131" : "1px solid #ccc",
  backgroundColor: active ? "#fff5f5" : "#fff",
  color: active ? "#f73131" : "#888",
  fontSize: 16,
  fontWeight: 700,
  cursor: "pointer",
  transition: "all 0.15s",
});

export default function TestimonialEditor({ initialTestimonials }: Props) {
  const [items, setItems] = useState<Testimonial[]>(initialTestimonials);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<
    { type: "success" | "error"; text: string } | null
  >(null);

  function update(idx: number, patch: Partial<Testimonial>) {
    setItems((prev) =>
      prev.map((t, i) => (i === idx ? { ...t, ...patch } : t)),
    );
  }

  function add() {
    setItems((prev) => [
      ...prev,
      { clientName: "", role: "", rating: 5, text: "" },
    ]);
  }

  function remove(idx: number) {
    if (!confirm("Zmazať túto recenziu?")) return;
    setItems((prev) => prev.filter((_, i) => i !== idx));
  }

  async function save() {
    setSaving(true);
    setMessage(null);
    try {
      const cleaned = items.filter((t) => t.clientName.trim() && t.text.trim());
      await saveContent("testimonials", cleaned);
      setMessage({
        type: "success",
        text: "Uložené! Zmena bude na webe za ~60 sekúnd.",
      });
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
    <AdminShell
      title="RECENZIE"
      subtitle={`${items.length} ${items.length === 1 ? "recenzia" : items.length < 5 ? "recenzie" : "recenzií"}`}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        {items.map((t, idx) => (
          <article
            key={idx}
            style={{
              backgroundColor: "#fff",
              padding: 24,
              borderRadius: 8,
              boxShadow: "0 1px 4px rgba(0, 0, 0, 0.06)",
              borderLeft: "4px solid #f73131",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
                marginBottom: 16,
              }}
            >
              <span style={{ fontSize: 12, color: "#888", fontWeight: 600 }}>
                #{idx + 1}
              </span>
              <button
                type="button"
                onClick={() => remove(idx)}
                aria-label="Zmazať"
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

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 16,
                marginBottom: 16,
              }}
            >
              <div>
                <label style={labelStyle}>Meno klienta *</label>
                <input
                  type="text"
                  value={t.clientName}
                  onChange={(e) => update(idx, { clientName: e.target.value })}
                  placeholder="napr. Marek"
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={labelStyle}>Rola / spolupráca</label>
                <input
                  type="text"
                  value={t.role || ""}
                  onChange={(e) => update(idx, { role: e.target.value })}
                  placeholder="napr. Online coaching"
                  style={inputStyle}
                />
              </div>
            </div>

            <div style={{ marginBottom: 16 }}>
              <label style={labelStyle}>Hodnotenie</label>
              <div style={{ display: "flex", gap: 6 }}>
                {[1, 2, 3, 4, 5].map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => update(idx, { rating: n })}
                    style={ratingButtonStyle((t.rating ?? 5) === n)}
                  >
                    {n}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label style={labelStyle}>Text recenzie *</label>
              <textarea
                value={t.text}
                onChange={(e) => update(idx, { text: e.target.value })}
                rows={4}
                placeholder="Plný text recenzie…"
                style={{ ...inputStyle, resize: "vertical" }}
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
            <Plus size={18} /> Pridať recenziu
          </button>
        }
      />
    </AdminShell>
  );
}
