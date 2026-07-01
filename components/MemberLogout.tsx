"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export default function MemberLogout() {
  const router = useRouter();
  async function logout() {
    await fetch("/api/premium/logout", { method: "POST" });
    router.push("/premium-videa");
    router.refresh();
  }
  return (
    <button
      type="button"
      onClick={logout}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: "8px 14px",
        fontSize: 13,
        color: "#cfcfcf",
        border: "1px solid #333",
        borderRadius: 6,
        backgroundColor: "transparent",
        cursor: "pointer",
      }}
    >
      <LogOut size={14} /> Odhlásiť
    </button>
  );
}
