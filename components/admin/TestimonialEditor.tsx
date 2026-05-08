"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Trash2, Save, LogOut, ExternalLink } from "lucide-react";

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
  const router = useRouter();
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
      // Filter out completely empty entries
      const cleaned = items.filter(
        (t) => t.clientName.trim() && t.text.trim(),
      );
      const res = await fetch("/api/admin/testimonials", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ testimonials: cleaned }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Nepodarilo sa uložiť.");
      }
      setMessage({
        type: "success",
        text: "Uložené! Zmena bude na webe za ~60 sekúnd (po novom deploy-i).",
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

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "32px 20px" }}>
      {/* Header */}
      <header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 16,
          marginBottom: 32,
          paddingBottom: 16,
          borderBottom: "2px solid #e0e0e0",
        }}
      >
        <div>
          <h1
            style={{
              fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif",
              fontSize: 36,
              color: "#2b2b2b",
              margin: 0,
            }}
          >
            RECENZIE
          </h1>
          <p style={{ color: "#888", fontSize: 13, margin: "4px 0 0 0" }}>
            {items.length} {items.length === 1 ? "recenzia" : items.length < 5 ? "recenzie" : "recenzií"}
          </p>
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              padding: "8px 14px",
              fontSize: 13,
              color: "#666",
              textDecoration: "none",
              border: "1px solid #ddd",
              borderRadius: 6,
              backgroundColor: "#fff",
            }}
          >
            <ExternalLink size={14} /> Pozri web
          </a>
          <button
            type="button"
            onClick={logout}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              padding: "8px 14px",
              fontSize: 13,
              color: "#666",
              border: "1px solid #ddd",
              borderRadius: 6,
              backgroundColor: "#fff",
              cursor: "pointer",
            }}
          >
            <LogOut size={14} /> Odhlásiť
          </button>
        </div>
      </header>

      {/* Message banner */}
      {message && (
        <div
          style={{
            marginBottom: 24,
            padding: 14,
            fontSize: 14,
            borderRadius: 6,
            color: message.type === "success" ? "#0a6e3a" : "#b00020",
            backgroundColor: message.type === "success" ? "#e8f5ee" : "#ffeaea",
            border:
              message.type === "success"
                ? "1px solid #b3deca"
                : "1px solid #f5c2c2",
          }}
        >
          {message.text}
        </div>
      )}

      {/* List */}
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

      {/* Footer actions */}
      <div
        style={{
          marginTop: 24,
          display: "flex",
          gap: 12,
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          padding: 20,
          backgroundColor: "#fff",
          borderRadius: 8,
          boxShadow: "0 1px 4px rgba(0, 0, 0, 0.06)",
          position: "sticky",
          bottom: 16,
        }}
      >
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

        <button
          type="button"
          onClick={save}
          disabled={saving}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "12px 28px",
            fontSize: 14,
            fontWeight: 700,
            color: "#fff",
            backgroundColor: "#f73131",
            border: 0,
            borderRadius: 9999,
            textTransform: "uppercase",
            letterSpacing: "1px",
            cursor: saving ? "wait" : "pointer",
            opacity: saving ? 0.6 : 1,
          }}
        >
          <Save size={16} /> {saving ? "Ukladám…" : "Uložiť zmeny"}
        </button>
      </div>

      <p style={{ marginTop: 16, fontSize: 12, color: "#888", textAlign: "center" }}>
        Po uložení sa zmena prejaví na webe do ~60 sekúnd (Vercel automaticky deployne).
      </p>
    </div>
  );
}
