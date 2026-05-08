"use client";

import {
  useEffect,
  useRef,
  useState,
  type ElementType,
  type ReactNode,
} from "react";
import { useAdmin } from "@/lib/admin-context";
import type { ContentType } from "@/lib/admin-content";

interface Props {
  contentType: ContentType;
  path: string;
  value: string;
  /** Wrapper element. Default `span`. */
  as?: "span" | "div";
  /** Optional — used for tooltip (replaces path). */
  label?: string;
  /** Povoliť newline cez Shift+Enter (pre dlhé texty ako bio, intro). */
  multiline?: boolean;
  /** Klikateľná oblasť ostane fragment v non-edit móde. */
  children: ReactNode;
}

export default function Editable({
  contentType,
  path,
  value,
  as = "span",
  label,
  multiline = false,
  children,
}: Props) {
  const { editMode, recordChange, pendingChanges } = useAdmin();
  const ref = useRef<HTMLElement | null>(null);
  const [isFocused, setIsFocused] = useState(false);

  const key = `${contentType}::${path}`;
  const pending = pendingChanges.get(key);
  // Aktuálne zobrazené body — pending má prednosť pred originálom
  const displayedValue = pending?.newValue ?? value;

  // Synchronizácia textu prvku keď sa value zmení (napr. po SSR refresh)
  useEffect(() => {
    if (!ref.current) return;
    if (document.activeElement === ref.current) return; // nezasahuj počas editácie
    if (ref.current.textContent !== displayedValue) {
      ref.current.textContent = displayedValue;
    }
  }, [displayedValue]);

  if (!editMode) {
    if (as === "div") return <div>{children}</div>;
    return <>{children}</>;
  }

  function handleBlur(e: React.FocusEvent<HTMLElement>) {
    setIsFocused(false);
    const next = (e.currentTarget.textContent || "").trim();
    // Zaznamenať zmenu (alebo zrušiť ak rovná originálu)
    recordChange(contentType, path, value, next);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLElement>) {
    if (e.key === "Escape") {
      e.preventDefault();
      // Resetuj na aktuálny pending alebo originál
      if (ref.current) ref.current.textContent = displayedValue;
      ref.current?.blur();
      return;
    }
    if (e.key === "Enter") {
      // Multiline: Shift+Enter vloží newline (default browser), Enter blur+save.
      // Single-line: Enter vždy blur+save (default browser by inak vložil <br>).
      if (multiline && e.shiftKey) {
        // dovoľ default = newline
        return;
      }
      e.preventDefault();
      ref.current?.blur();
    }
  }

  // Strip rich text při paste — vlož len plain text. Bráni vloženiu HTML/<script>
  // do contentEditable DOM, čo by mohlo vytvoriť self-XSS surface počas editácie.
  function handlePaste(e: React.ClipboardEvent<HTMLElement>) {
    e.preventDefault();
    const text = e.clipboardData.getData("text/plain");
    // Ak nie je multiline, zlúč newlines do medzier
    const cleaned = multiline ? text : text.replace(/\s+/g, " ");
    // Vlož cez Selection API (modernejšie než execCommand)
    const selection = window.getSelection();
    if (!selection || !selection.rangeCount) return;
    selection.deleteFromDocument();
    selection.getRangeAt(0).insertNode(document.createTextNode(cleaned));
    selection.collapseToEnd();
  }

  // Vyber background podľa stavu
  let outline = "1px dashed rgba(247, 49, 49, 0.45)";
  let bg = "transparent";
  if (isFocused) {
    outline = "2px solid #f73131";
    bg = "rgba(247, 49, 49, 0.08)";
  } else if (pending) {
    outline = "1px dashed rgba(245, 158, 11, 0.7)";
    bg = "rgba(254, 243, 199, 0.5)";
  }

  const Tag = as as ElementType;

  return (
    <Tag
      ref={ref}
      contentEditable
      suppressContentEditableWarning
      onFocus={() => setIsFocused(true)}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      onPaste={handlePaste}
      data-edit-key={key}
      style={{
        outline,
        outlineOffset: 2,
        backgroundColor: bg,
        cursor: "text",
        borderRadius: 2,
        transition: "outline 0.12s, background-color 0.12s",
      }}
      title={`Klikni a edituj — ${label || path}${multiline ? " (Shift+Enter = nový riadok)" : ""}`}
    >
      {children}
    </Tag>
  );
}
