"use client";

import { useRef, useState } from "react";
import { Plus, Trash2, Upload, Check } from "lucide-react";
import AdminShell from "./AdminShell";
import SaveBar from "./SaveBar";
import { saveContent } from "@/lib/admin-save";
import { labelStyle, inputStyle, cardStyle } from "./common";

type Ebook = {
  id: string;
  name: string;
  price: number;
  blobUrl?: string;
  legacyFile?: string;
};

export default function EbooksEditor({ initial }: { initial: Ebook[] }) {
  const [items, setItems] = useState<Ebook[]>(initial);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState<string | null>(null);
  const [message, setMessage] = useState<
    { type: "success" | "error"; text: string } | null
  >(null);
  const fileInputs = useRef<Record<string, HTMLInputElement | null>>({});

  function update(idx: number, patch: Partial<Ebook>) {
    setItems((prev) => prev.map((s, i) => (i === idx ? { ...s, ...patch } : s)));
  }

  function add() {
    const id = `ebook-${Date.now()}`;
    setItems((prev) => [...prev, { id, name: "Nový e-book", price: 1990 }]);
  }

  function remove(idx: number) {
    if (!confirm("Zmazať tento e-book?")) return;
    setItems((prev) => prev.filter((_, i) => i !== idx));
  }

  async function uploadPdf(idx: number, file: File) {
    const ebook = items[idx];
    setUploading(ebook.id);
    setMessage(null);
    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("ebookId", ebook.id);
      const res = await fetch("/api/admin/upload-ebook", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");
      // Aktualizuj lokálny state + okamžite ulož JSON aby PDF nebolo orphaned.
      const nextItems = items.map((s, i) =>
        i === idx ? { ...s, blobUrl: data.url } : s,
      );
      setItems(nextItems);
      try {
        await saveContent("ebooks", nextItems);
        setMessage({
          type: "success",
          text: `PDF nahraté a uložené pre „${ebook.name}".`,
        });
      } catch (saveErr) {
        setMessage({
          type: "error",
          text: `PDF nahraté, ale uloženie metadát zlyhalo: ${
            saveErr instanceof Error ? saveErr.message : ""
          }. Klikni „Uložiť zmeny".`,
        });
      }
    } catch (err) {
      setMessage({
        type: "error",
        text: err instanceof Error ? err.message : "Chyba pri nahrávaní.",
      });
    } finally {
      setUploading(null);
    }
  }

  async function save() {
    setSaving(true);
    setMessage(null);
    try {
      await saveContent("ebooks", items);
      setItems(items);
      setMessage({ type: "success", text: "Uložené!" });
    } catch (err) {
      setMessage({ type: "error", text: err instanceof Error ? err.message : "Chyba." });
    } finally {
      setSaving(false);
    }
  }

  return (
    <AdminShell title="E-BOOKY" subtitle={`${items.length} e-bookov v predaji`}>
      <p style={{ fontSize: 13, color: "#888", marginBottom: 16 }}>
        Tip: cena je v <strong>centoch</strong> (1990 = 19,90 €). PDF súbor sa nahrá
        do Vercel Blob; po Save sa zmena URL prejaví na webe za ~60 s.
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {items.map((e, idx) => (
          <article key={`${e.id}-${idx}`} style={cardStyle}>
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
                marginBottom: 12,
              }}
            >
              <span style={{ fontSize: 12, color: "#888", fontWeight: 600 }}>
                #{idx + 1} — id: <code>{e.id}</code>
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

            <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 16, marginBottom: 16 }}>
              <div>
                <label style={labelStyle}>Názov</label>
                <input
                  type="text"
                  value={e.name}
                  onChange={(ev) => update(idx, { name: ev.target.value })}
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={labelStyle}>Cena (centy) — napr. 1990 = 19,90 €</label>
                <input
                  type="number"
                  value={e.price}
                  onChange={(ev) => update(idx, { price: Number(ev.target.value) })}
                  style={inputStyle}
                  min={100}
                  step={10}
                />
              </div>
            </div>

            <div style={{ marginBottom: 12 }}>
              <label style={labelStyle}>PDF súbor</label>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center" }}>
                <input
                  ref={(el) => {
                    fileInputs.current[e.id] = el;
                  }}
                  type="file"
                  accept="application/pdf"
                  style={{ display: "none" }}
                  onChange={(ev) => {
                    const f = ev.target.files?.[0];
                    if (f) uploadPdf(idx, f);
                    ev.target.value = "";
                  }}
                />
                <button
                  type="button"
                  onClick={() => fileInputs.current[e.id]?.click()}
                  disabled={uploading === e.id}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    padding: "10px 16px",
                    fontSize: 13,
                    fontWeight: 600,
                    color: "#2b2b2b",
                    border: "1px solid #ccc",
                    borderRadius: 6,
                    backgroundColor: "#fff",
                    cursor: uploading === e.id ? "wait" : "pointer",
                    opacity: uploading === e.id ? 0.6 : 1,
                  }}
                >
                  <Upload size={14} />
                  {uploading === e.id ? "Nahrávam…" : "Nahrať PDF"}
                </button>
                {e.blobUrl ? (
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 4,
                      fontSize: 12,
                      color: "#0a6e3a",
                    }}
                  >
                    <Check size={14} /> nahraté
                    <a
                      href={e.blobUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ marginLeft: 6, color: "#666", fontSize: 11 }}
                    >
                      otvor
                    </a>
                  </span>
                ) : e.legacyFile ? (
                  <span style={{ fontSize: 12, color: "#888" }}>
                    legacy: <code>{e.legacyFile}</code>
                  </span>
                ) : (
                  <span style={{ fontSize: 12, color: "#b00020" }}>chýba PDF</span>
                )}
              </div>
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
            <Plus size={18} /> Pridať e-book
          </button>
        }
      />
    </AdminShell>
  );
}
