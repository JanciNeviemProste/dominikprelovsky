"use client";

import { useState } from "react";
import AdminShell from "./AdminShell";
import SaveBar from "./SaveBar";
import { saveContent } from "@/lib/admin-save";
import { labelStyle, inputStyle, cardStyle } from "./common";

type Step = { number: string; title: string; text: string };

export default function PhilosophyEditor({ initial }: { initial: Step[] }) {
  const [items, setItems] = useState<Step[]>(initial);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<
    { type: "success" | "error"; text: string } | null
  >(null);

  function update(idx: number, patch: Partial<Step>) {
    setItems((prev) => prev.map((s, i) => (i === idx ? { ...s, ...patch } : s)));
  }

  async function save() {
    setSaving(true);
    setMessage(null);
    try {
      await saveContent("philosophy", items);
      setMessage({ type: "success", text: "Uložené!" });
    } catch (err) {
      setMessage({ type: "error", text: err instanceof Error ? err.message : "Chyba." });
    } finally {
      setSaving(false);
    }
  }

  return (
    <AdminShell title="AKO PRACUJEM" subtitle="3 kroky pod hero sekciou">
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {items.map((step, idx) => (
          <article key={idx} style={cardStyle}>
            <div style={{ display: "grid", gridTemplateColumns: "100px 1fr", gap: 16, marginBottom: 16 }}>
              <div>
                <label style={labelStyle}>Číslo</label>
                <input
                  type="text"
                  value={step.number}
                  onChange={(e) => update(idx, { number: e.target.value })}
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={labelStyle}>Názov</label>
                <input
                  type="text"
                  value={step.title}
                  onChange={(e) => update(idx, { title: e.target.value })}
                  style={inputStyle}
                />
              </div>
            </div>
            <div>
              <label style={labelStyle}>Text</label>
              <textarea
                value={step.text}
                onChange={(e) => update(idx, { text: e.target.value })}
                rows={6}
                style={{ ...inputStyle, resize: "vertical" }}
              />
            </div>
          </article>
        ))}
      </div>

      <SaveBar saving={saving} message={message} onSave={save} />
    </AdminShell>
  );
}
