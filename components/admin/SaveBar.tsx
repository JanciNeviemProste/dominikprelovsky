"use client";

import { Save } from "lucide-react";

interface Props {
  saving: boolean;
  message: { type: "success" | "error"; text: string } | null;
  onSave: () => void;
  leftSlot?: React.ReactNode;
}

export default function SaveBar({ saving, message, onSave, leftSlot }: Props) {
  return (
    <>
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
        <div>{leftSlot}</div>
        <button
          type="button"
          onClick={onSave}
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
    </>
  );
}
