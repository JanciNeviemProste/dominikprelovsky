"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

interface Props {
  initialValue: string;
  fieldLabel: string;
  multiline?: boolean;
  onSave: (next: string) => Promise<void>;
  onClose: () => void;
}

export default function InlineEditModal({
  initialValue,
  fieldLabel,
  multiline = false,
  onSave,
  onClose,
}: Props) {
  const [value, setValue] = useState(initialValue);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  const [savedHint, setSavedHint] = useState(false);

  async function handleSave() {
    if (value === initialValue) {
      onClose();
      return;
    }
    setSaving(true);
    setError(null);
    try {
      await onSave(value);
      setSavedHint(true);
      setTimeout(() => onClose(), 2200);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Chyba pri ukladaní.");
      setSaving(false);
    }
  }

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0,0,0,0.6)",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: "#fff",
          borderRadius: 12,
          maxWidth: 600,
          width: "100%",
          padding: "32px 28px",
          boxShadow: "0 20px 60px rgba(0,0,0,0.25)",
          fontFamily: "var(--font-montserrat), 'Montserrat', sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 20,
          }}
        >
          <h2
            style={{
              fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif",
              fontSize: 28,
              color: "#2b2b2b",
              margin: 0,
            }}
          >
            UPRAVIŤ
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Zavrieť"
            style={{
              border: 0,
              background: "transparent",
              padding: 4,
              cursor: "pointer",
              color: "#888",
            }}
          >
            <X size={20} />
          </button>
        </div>

        <label
          style={{
            display: "block",
            fontSize: 12,
            color: "#666",
            marginBottom: 8,
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.5px",
          }}
        >
          {fieldLabel}
        </label>

        {multiline ? (
          <textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            rows={6}
            autoFocus
            style={{
              width: "100%",
              padding: "12px 14px",
              fontSize: 14,
              border: "1px solid #ccc",
              borderRadius: 6,
              outline: "none",
              boxSizing: "border-box",
              fontFamily: "inherit",
              resize: "vertical",
              minHeight: 120,
            }}
          />
        ) : (
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            autoFocus
            style={{
              width: "100%",
              padding: "12px 14px",
              fontSize: 14,
              border: "1px solid #ccc",
              borderRadius: 6,
              outline: "none",
              boxSizing: "border-box",
            }}
          />
        )}

        {error && (
          <div
            style={{
              marginTop: 12,
              padding: 12,
              fontSize: 13,
              color: "#b00020",
              backgroundColor: "#ffeaea",
              borderRadius: 6,
              border: "1px solid #f5c2c2",
            }}
          >
            {error}
          </div>
        )}

        {savedHint && (
          <div
            style={{
              marginTop: 12,
              padding: 12,
              fontSize: 13,
              color: "#0a6e3a",
              backgroundColor: "#e8f5ee",
              borderRadius: 6,
              border: "1px solid #b3deca",
            }}
          >
            ✓ Uložené! Zmena bude na webe za ~60 sekúnd (po Vercel autodeploy).
          </div>
        )}

        <div style={{ display: "flex", gap: 8, marginTop: 20, justifyContent: "flex-end" }}>
          <button
            type="button"
            onClick={onClose}
            style={{
              padding: "10px 18px",
              fontSize: 13,
              color: "#666",
              border: "1px solid #ddd",
              borderRadius: 6,
              backgroundColor: "#fff",
              cursor: "pointer",
            }}
          >
            Zrušiť
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            style={{
              padding: "10px 22px",
              fontSize: 13,
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
            {saving ? "Ukladám…" : "Uložiť"}
          </button>
        </div>
      </div>
    </div>
  );
}
