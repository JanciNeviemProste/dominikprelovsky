"use client";

import { useState } from "react";
import AdminShell from "./AdminShell";
import SaveBar from "./SaveBar";
import { saveContent } from "@/lib/admin-save";
import { labelStyle, inputStyle, cardStyle } from "./common";
import type siteSettingsType from "@/data/site-settings.json";

type Settings = typeof siteSettingsType;

export default function ContactEditor({ initial }: { initial: Settings }) {
  const [data, setData] = useState<Settings>(initial);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<
    { type: "success" | "error"; text: string } | null
  >(null);

  async function save() {
    setSaving(true);
    setMessage(null);
    try {
      // Auto-update phoneHref
      const phoneClean = data.contact.phone.replace(/\s+/g, "");
      const next = {
        ...data,
        contact: { ...data.contact, phoneHref: `tel:${phoneClean}` },
      };
      setData(next);
      await saveContent("site-settings", next);
      setMessage({ type: "success", text: "Uložené!" });
    } catch (err) {
      setMessage({ type: "error", text: err instanceof Error ? err.message : "Chyba." });
    } finally {
      setSaving(false);
    }
  }

  return (
    <AdminShell title="KONTAKT A SOCIÁLNE SIETE" subtitle="E-mail, telefón, social linky">
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <article style={cardStyle}>
          <h3 style={{ margin: "0 0 12px", fontSize: 14, color: "#666", textTransform: "uppercase" }}>
            Kontaktné údaje
          </h3>
          <div style={{ display: "grid", gap: 12 }}>
            <div>
              <label style={labelStyle}>E-mail</label>
              <input
                type="email"
                value={data.contact.email}
                onChange={(e) => setData({ ...data, contact: { ...data.contact, email: e.target.value } })}
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>Telefón</label>
              <input
                type="tel"
                value={data.contact.phone}
                onChange={(e) => setData({ ...data, contact: { ...data.contact, phone: e.target.value } })}
                style={inputStyle}
                placeholder="+421 910 672 251"
              />
            </div>
            <div>
              <label style={labelStyle}>Lokalita / gym</label>
              <input
                type="text"
                value={data.contact.location}
                onChange={(e) =>
                  setData({ ...data, contact: { ...data.contact, location: e.target.value } })
                }
                style={inputStyle}
                placeholder="365 GYM Trnava"
              />
            </div>
            <div>
              <label style={labelStyle}>Plná adresa</label>
              <input
                type="text"
                value={data.contact.address}
                onChange={(e) =>
                  setData({ ...data, contact: { ...data.contact, address: e.target.value } })
                }
                style={inputStyle}
                placeholder="Zelenečská 111, Trnava"
              />
            </div>
          </div>
        </article>

        <article style={cardStyle}>
          <h3 style={{ margin: "0 0 12px", fontSize: 14, color: "#666", textTransform: "uppercase" }}>
            Sociálne siete (URL)
          </h3>
          <div style={{ display: "grid", gap: 12 }}>
            <div>
              <label style={labelStyle}>Instagram</label>
              <input
                type="url"
                value={data.social.instagram}
                onChange={(e) => setData({ ...data, social: { ...data.social, instagram: e.target.value } })}
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>TikTok</label>
              <input
                type="url"
                value={data.social.tiktok}
                onChange={(e) => setData({ ...data, social: { ...data.social, tiktok: e.target.value } })}
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>YouTube</label>
              <input
                type="url"
                value={data.social.youtube}
                onChange={(e) => setData({ ...data, social: { ...data.social, youtube: e.target.value } })}
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>Facebook</label>
              <input
                type="url"
                value={data.social.facebook}
                onChange={(e) => setData({ ...data, social: { ...data.social, facebook: e.target.value } })}
                style={inputStyle}
              />
            </div>
          </div>
        </article>
      </div>

      <SaveBar saving={saving} message={message} onSave={save} />
    </AdminShell>
  );
}
