"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Pencil, LayoutDashboard, LogOut } from "lucide-react";
import { useAdmin } from "@/lib/admin-context";

export default function EditModeBanner() {
  const { isAdmin, editMode, setEditMode } = useAdmin();
  const router = useRouter();

  if (!isAdmin) return null;

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.refresh();
  }

  return (
    <div
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1000,
        backgroundColor: "#1a1a1a",
        color: "#fff",
        padding: "8px 16px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: 12,
        fontFamily: "var(--font-montserrat), 'Montserrat', sans-serif",
        fontSize: 13,
        borderBottom: editMode ? "2px solid #f73131" : "2px solid #444",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <Pencil size={14} style={{ color: editMode ? "#f73131" : "#888" }} />
        <span>
          <strong>Admin</strong> {editMode ? "— Editačný mód aktívny" : "— Náhľadový mód"}
        </span>
        <button
          type="button"
          onClick={() => setEditMode(!editMode)}
          style={{
            padding: "4px 10px",
            fontSize: 12,
            border: `1px solid ${editMode ? "#f73131" : "#666"}`,
            borderRadius: 4,
            backgroundColor: editMode ? "#f73131" : "transparent",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          {editMode ? "Vypnúť editáciu" : "Zapnúť editáciu"}
        </button>
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        <Link
          href="/admin"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 4,
            padding: "4px 10px",
            fontSize: 12,
            border: "1px solid #666",
            borderRadius: 4,
            color: "#fff",
            textDecoration: "none",
          }}
        >
          <LayoutDashboard size={12} /> Admin panel
        </Link>
        <button
          type="button"
          onClick={logout}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 4,
            padding: "4px 10px",
            fontSize: 12,
            border: "1px solid #666",
            borderRadius: 4,
            backgroundColor: "transparent",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          <LogOut size={12} /> Odhlásiť
        </button>
      </div>
    </div>
  );
}
