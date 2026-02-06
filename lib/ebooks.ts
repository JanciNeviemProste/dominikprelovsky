export interface Ebook {
  id: string;
  name: string;
  price: number; // v centoch (napr. 1990 = 19.90€)
  file: string;  // názov PDF v private/ebooks/
}

export const ebooks: Ebook[] = [
  {
    id: "stravovanie",
    name: "E-BOOK: STRAVOVANIE",
    price: 1990,
    file: "ebook-stravovanie.pdf",
  },
  {
    id: "treningovy-plan",
    name: "E-BOOK: TRÉNINGOVÝ PLÁN",
    price: 1990,
    file: "ebook-treningovy-plan.pdf",
  },
  {
    id: "priprava-na-sutaz",
    name: "E-BOOK: PRÍPRAVA NA SÚŤAŽ",
    price: 2490,
    file: "ebook-priprava-na-sutaz.pdf",
  },
];

export function getEbookById(id: string): Ebook | undefined {
  return ebooks.find((e) => e.id === id);
}
