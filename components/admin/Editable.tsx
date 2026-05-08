"use client";

import { useState, type ReactNode } from "react";
import { Pencil } from "lucide-react";
import { useAdmin } from "@/lib/admin-context";
import InlineEditModal from "./InlineEditModal";

import type { ContentType } from "@/lib/admin-content";

interface Props {
  contentType: ContentType;
  path: string;
  value: string;
  label?: string;
  multiline?: boolean;
  /** Wrapper element. Default `span`. */
  as?: "span" | "div";
  children: ReactNode;
}

export default function Editable({
  contentType,
  path,
  value,
  label,
  multiline,
  as = "span",
  children,
}: Props) {
  const { editMode } = useAdmin();
  const [open, setOpen] = useState(false);

  if (!editMode) {
    // Verejný režim — render len children, žiadny overhead
    if (as === "div") return <div>{children}</div>;
    return <>{children}</>;
  }

  async function save(next: string) {
    const res = await fetch("/api/admin/inline", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contentType, path, value: next }),
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      throw new Error(data.error || "Nepodarilo sa uložiť.");
    }
    // Pozn.: Vercel autodeploy z GitHub commitu trvá ~60 s. router.refresh() by
    // medzitým ukázal stary build-time JSON a admina by zmiatlo. Modal sa zatvorí
    // a používateľovi dáme jasnú správu že zmena bude live po ~minúte.
  }

  const Wrapper = as;

  return (
    <>
      <Wrapper
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setOpen(true);
        }}
        style={{
          position: "relative",
          cursor: "pointer",
          outline: "1px dashed rgba(247, 49, 49, 0.5)",
          outlineOffset: 2,
          borderRadius: 2,
        }}
        title={`Klikni pre úpravu: ${label || path}`}
      >
        {children}
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            position: "absolute",
            top: -10,
            right: -10,
            width: 20,
            height: 20,
            backgroundColor: "#f73131",
            color: "#fff",
            borderRadius: "50%",
            fontSize: 10,
            pointerEvents: "none",
          }}
          aria-hidden="true"
        >
          <Pencil size={11} />
        </span>
      </Wrapper>

      {open && (
        <InlineEditModal
          initialValue={value}
          fieldLabel={label || path}
          multiline={multiline}
          onSave={save}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
}
