import ebooksData from "@/data/ebooks.json";

export interface Ebook {
  id: string;
  name: string;
  price: number; // v centoch (napr. 1990 = 19.90€)
  /** URL z Vercel Blob (po nahraní cez admin) */
  blobUrl?: string;
  /** Fallback PDF v `private/ebooks/` (legacy pre staré ebooky) */
  legacyFile?: string;
}

export const ebooks: Ebook[] = ebooksData as Ebook[];

export function getEbookById(id: string): Ebook | undefined {
  return ebooks.find((e) => e.id === id);
}
