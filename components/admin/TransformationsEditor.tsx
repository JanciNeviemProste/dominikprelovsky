"use client";

import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import AdminShell from "./AdminShell";
import SaveBar from "./SaveBar";
import { saveContent } from "@/lib/admin-save";
import { labelStyle, inputStyle } from "./common";

type Item = { image: string; headline?: string; caption?: string };

export default function TransformationsEditor({ initial }: { initial: Item[] }) {
  const [items, setItems] = useState<Item[]>(initial);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<
    { type: "success" | "error"; text: string } | null
  >(null);

  function update(idx: number, patch: Partial<Item>) {
    setItems((prev) => prev.map((s, i) => (i === idx ? { ...s, ...patch } : s)));
  }

  function add() {
    setItems((prev) => [...prev, { image: "", headline: "", caption: "" }]);
  }

  function remove(idx: number) {
    if (!confirm("Zmazať túto premenu?")) return;
    setItems((prev) => prev.filter((_, i) => i !== idx));
  }

  async function save() {
    setSaving(true);
    setMessage(null);
    try {
      const cleaned = items.filter((x) => x.image.trim());
      await saveContent("transformations", cleaned);
      setItems(cleaned);
      setMessage({ type: "success", text: "Uložené!" });
    } catch (err) {
      setMessage({ type: "error", text: err instanceof Error ? err.message : "Chyba." });
    } finally {
      setSaving(false);
    }
  }

  return (
    <AdminShell title="PREMENY KLIENTOV" subtitle={`${items.length} fotiek`}>
      <p style={{ fontSize: 13, color: "#888", marginBottom: 16 }}>
        Tip: Headline (napr. „-20 kg") sa zobrazí ako červená nálepka v ľavom hornom rohu fotky.
        Pre nahranie nových fotiek ich pridaj do priečinka <code>public/images/transformations/</code> v repe.
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {items.map((item, idx) => (
          <article
            key={idx}
            style={{
              backgroundColor: "#fff",
              padding: 16,
              borderRadius: 8,
              boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
              display: "grid",
              gridTemplateColumns: "100px 1fr auto",
              gap: 16,
              alignItems: "center",
            }}
          >
            {item.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={item.image}
                alt=""
                style={{
                  width: 100,
                  height: 80,
                  objectFit: "cover",
                  borderRadius: 6,
                  backgroundColor: "#000",
                }}
              />
            ) : (
              <div
                style={{
                  width: 100,
                  height: 80,
                  borderRadius: 6,
                  backgroundColor: "#eee",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#999",
                  fontSize: 12,
                }}
              >
                bez fotky
              </div>
            )}

            <div style={{ display: "grid", gap: 8 }}>
              <div>
                <label style={{ ...labelStyle, marginBottom: 2 }}>Cesta k obrázku</label>
                <input
                  type="text"
                  value={item.image}
                  onChange={(e) => update(idx, { image: e.target.value })}
                  style={{ ...inputStyle, padding: "6px 10px", fontSize: 13 }}
                  placeholder="/images/transformations/imageX.jpeg"
                />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "120px 1fr", gap: 8 }}>
                <input
                  type="text"
                  value={item.headline || ""}
                  onChange={(e) => update(idx, { headline: e.target.value })}
                  style={{ ...inputStyle, padding: "6px 10px", fontSize: 13 }}
                  placeholder="Headline (-20 kg)"
                />
                <input
                  type="text"
                  value={item.caption || ""}
                  onChange={(e) => update(idx, { caption: e.target.value })}
                  style={{ ...inputStyle, padding: "6px 10px", fontSize: 13 }}
                  placeholder="Popisok (voliteľné)"
                />
              </div>
            </div>

            <button
              type="button"
              onClick={() => remove(idx)}
              aria-label="Zmazať"
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
            <Plus size={18} /> Pridať fotku
          </button>
        }
      />
    </AdminShell>
  );
}
