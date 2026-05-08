"use client";

import { useState } from "react";
import AdminShell from "./AdminShell";
import SaveBar from "./SaveBar";
import { saveContent } from "@/lib/admin-save";
import { labelStyle, inputStyle, cardStyle } from "./common";

type Profile = {
  name: string;
  role: string;
  photo: string;
  bio: string;
};

export default function ProfileEditor({ initial }: { initial: Profile }) {
  const [data, setData] = useState<Profile>(initial);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<
    { type: "success" | "error"; text: string } | null
  >(null);

  async function save() {
    setSaving(true);
    setMessage(null);
    try {
      await saveContent("profile", data);
      setMessage({ type: "success", text: "Uložené!" });
    } catch (err) {
      setMessage({ type: "error", text: err instanceof Error ? err.message : "Chyba." });
    } finally {
      setSaving(false);
    }
  }

  return (
    <AdminShell title="PROFIL" subtitle="Tvoj bio v sekcii O mne">
      <div style={cardStyle}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
          <div>
            <label style={labelStyle}>Meno *</label>
            <input
              type="text"
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
              style={inputStyle}
            />
          </div>
          <div>
            <label style={labelStyle}>Rola *</label>
            <input
              type="text"
              value={data.role}
              onChange={(e) => setData({ ...data, role: e.target.value })}
              style={inputStyle}
            />
          </div>
        </div>

        <div style={{ marginBottom: 16 }}>
          <label style={labelStyle}>Fotka — URL alebo cesta (napr. /images/dominik.jpg)</label>
          <input
            type="text"
            value={data.photo}
            onChange={(e) => setData({ ...data, photo: e.target.value })}
            style={inputStyle}
          />
        </div>

        <div>
          <label style={labelStyle}>Bio *</label>
          <textarea
            value={data.bio}
            onChange={(e) => setData({ ...data, bio: e.target.value })}
            rows={10}
            style={{ ...inputStyle, resize: "vertical" }}
          />
        </div>
      </div>

      <SaveBar saving={saving} message={message} onSave={save} />
    </AdminShell>
  );
}
