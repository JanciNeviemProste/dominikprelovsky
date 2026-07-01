import ebooksData from "@/data/ebooks.json";

export interface Ebook {
  id: string;
  name: string;
  price: number; // v centoch (napr. 1990 = 19.90€)
  /** Kľúč v úložisku Netlify Blobs (po nahraní cez admin), napr. `ebooks/<id>-<ts>.pdf` */
  blobKey?: string;
  /** Fallback PDF v `private/ebooks/` (legacy pre staré ebooky) */
  legacyFile?: string;
}

export const ebooks: Ebook[] = ebooksData as Ebook[];

export function getEbookById(id: string): Ebook | undefined {
  return ebooks.find((e) => e.id === id);
}
