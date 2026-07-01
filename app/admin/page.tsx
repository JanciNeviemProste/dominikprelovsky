import { redirect } from "next/navigation";
import Link from "next/link";
import {
  Star,
  ListChecks,
  User,
  Image as ImageIcon,
  Workflow,
  Phone,
  ImagePlay,
  BookOpen,
  FileText,
  KeyRound,
  Clapperboard,
} from "lucide-react";
import AdminShell from "@/components/admin/AdminShell";
import { isAuthenticated } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

const sections = [
  {
    href: "/admin/recenzie",
    title: "Recenzie",
    desc: "Pridaj, uprav alebo zmaž recenzie klientov.",
    Icon: Star,
  },
  {
    href: "/admin/sluzby",
    title: "Cenník služieb",
    desc: "Upravuj 5 služieb, ich popisy a ceny.",
    Icon: ListChecks,
  },
  {
    href: "/admin/profil",
    title: "Profil",
    desc: "Tvoj bio, meno, role, fotka.",
    Icon: User,
  },
  {
    href: "/admin/hero",
    title: "Hero a sekcie",
    desc: "Hlavičky sekcií, hero copy, CTA tlačidlá.",
    Icon: ImageIcon,
  },
  {
    href: "/admin/ako-pracujem",
    title: "Ako pracujem",
    desc: "3 kroky: vstupná konzultácia, kvalifikácia, prax.",
    Icon: Workflow,
  },
  {
    href: "/admin/kontakt",
    title: "Kontakt a sociálne siete",
    desc: "E-mail, telefón, IG, TT, YT, FB.",
    Icon: Phone,
  },
  {
    href: "/admin/premeny",
    title: "Premeny klientov",
    desc: "29 fotiek + headline (-20 kg) per fotka.",
    Icon: ImagePlay,
  },
  {
    href: "/admin/novinky",
    title: "Novinky (e-booky)",
    desc: "3 e-booky — label a foto.",
    Icon: BookOpen,
  },
  {
    href: "/admin/ebooky",
    title: "E-booky (PDF + cena)",
    desc: "Upload PDF, názov, cena pre Stripe.",
    Icon: FileText,
  },
  {
    href: "/admin/premium-videa",
    title: "Premium videá",
    desc: "Členská knižnica — YouTube/Vimeo videá pre platiacich členov.",
    Icon: Clapperboard,
  },
  {
    href: "/admin/heslo",
    title: "Zmena hesla",
    desc: "Nastav si nové prihlasovacie heslo do administrácie.",
    Icon: KeyRound,
  },
];

export default async function AdminHomePage() {
  if (!(await isAuthenticated())) {
    redirect("/admin/login");
  }

  return (
    <AdminShell
      title="ADMIN PANEL"
      subtitle="Tu môžeš upravovať obsah celého webu bez programátora."
      showBackToHub={false}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 16,
        }}
      >
        {sections.map((s) => (
          <Link
            key={s.href}
            href={s.href}
            style={{
              display: "block",
              backgroundColor: "#fff",
              padding: 24,
              borderRadius: 8,
              boxShadow: "0 1px 4px rgba(0, 0, 0, 0.06)",
              borderLeft: "4px solid #f73131",
              textDecoration: "none",
              color: "inherit",
              transition: "transform 0.15s, box-shadow 0.15s",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                marginBottom: 12,
              }}
            >
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 40,
                  height: 40,
                  backgroundColor: "#fff5f5",
                  borderRadius: 8,
                  color: "#f73131",
                }}
              >
                <s.Icon size={20} />
              </span>
              <h3
                style={{
                  fontFamily: "var(--font-montserrat), 'Montserrat', sans-serif",
                  fontSize: 16,
                  fontWeight: 700,
                  margin: 0,
                  color: "#2b2b2b",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
              >
                {s.title}
              </h3>
            </div>
            <p
              style={{
                fontSize: 13,
                color: "#666",
                lineHeight: 1.5,
                margin: 0,
              }}
            >
              {s.desc}
            </p>
          </Link>
        ))}
      </div>
    </AdminShell>
  );
}
