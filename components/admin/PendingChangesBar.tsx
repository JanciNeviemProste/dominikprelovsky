"use client";

import { useAdmin } from "@/lib/admin-context";
import { Save, X, Loader2, Check, AlertTriangle } from "lucide-react";

export default function PendingChangesBar() {
  const {
    isAdmin,
    pendingCount,
    saveAll,
    discardAll,
    deployStatus,
    deploySecondsLeft,
    errorMessage,
  } = useAdmin();

  if (!isAdmin) return null;
  // Skryť ak nič nečaká + status je idle
  if (pendingCount === 0 && deployStatus === "idle") return null;

  const saving = deployStatus === "saving";
  const deploying = deployStatus === "deploying";
  const live = deployStatus === "live";
  const errored = deployStatus === "error";

  let statusBadge: React.ReactNode = null;
  let bg = "#1a1a1a";
  let countText: React.ReactNode = null;

  if (saving) {
    statusBadge = (
      <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
        <Loader2 size={14} className="spin" /> Ukladám…
      </span>
    );
  } else if (deploying) {
    statusBadge = (
      <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
        <Loader2 size={14} className="spin" /> Nahrávam na server… {deploySecondsLeft}s
      </span>
    );
  } else if (live) {
    bg = "#0a6e3a";
    statusBadge = (
      <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
        <Check size={14} /> Live ✓
      </span>
    );
  } else if (errored) {
    bg = "#b00020";
    statusBadge = (
      <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
        <AlertTriangle size={14} /> {errorMessage || "Chyba"}
      </span>
    );
  } else {
    countText = (
      <strong>
        {pendingCount} {pendingCount === 1 ? "neuložená zmena" : pendingCount < 5 ? "neuložené zmeny" : "neuložených zmien"}
      </strong>
    );
  }

  return (
    <>
      {/* keyframes pre spinning loader */}
      <style>{`@keyframes admin-spin { from { transform: rotate(0); } to { transform: rotate(360deg); } } .spin { animation: admin-spin 0.9s linear infinite; }`}</style>
      <div
        style={{
          position: "fixed",
          right: 16,
          bottom: 16,
          zIndex: 1100,
          backgroundColor: bg,
          color: "#fff",
          borderRadius: 12,
          padding: "12px 16px",
          boxShadow: "0 12px 32px rgba(0,0,0,0.35)",
          display: "flex",
          alignItems: "center",
          gap: 12,
          fontFamily: "var(--font-montserrat), 'Montserrat', sans-serif",
          fontSize: 13,
          maxWidth: "calc(100% - 32px)",
        }}
      >
        {statusBadge || countText}

        {!saving && !deploying && !live && !errored && pendingCount > 0 && (
          <>
            <button
              type="button"
              onClick={discardAll}
              title="Zahodiť všetky neuložené zmeny"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 4,
                padding: "6px 12px",
                fontSize: 12,
                color: "#fff",
                border: "1px solid #555",
                borderRadius: 6,
                backgroundColor: "transparent",
                cursor: "pointer",
              }}
            >
              <X size={12} /> Zahodiť
            </button>
            <button
              type="button"
              onClick={saveAll}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                padding: "8px 14px",
                fontSize: 13,
                fontWeight: 700,
                color: "#fff",
                backgroundColor: "#f73131",
                border: 0,
                borderRadius: 9999,
                textTransform: "uppercase",
                letterSpacing: "1px",
                cursor: "pointer",
              }}
            >
              <Save size={14} /> Uložiť všetko
            </button>
          </>
        )}
      </div>
    </>
  );
}
