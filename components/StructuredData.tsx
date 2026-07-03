import services from "@/data/services.json";
import { ebooks } from "@/lib/ebooks";

// JSON-LD štruktúrované dáta pre Google (Rich Results): profesionálna služba +
// osoba (Dominik, IFBB Pro) + katalóg coaching balíčkov + e-booky ako produkty.
// TODO: doplniť `sameAs` (Instagram / YouTube) a `telephone`, keď ich dodá Dominik.
const SITE_URL = "https://dominikprelovsky.sk";

export default function StructuredData() {
  const graph = [
    {
      "@type": "ProfessionalService",
      "@id": `${SITE_URL}/#business`,
      name: "Dominik Prelovský — kondičný tréner",
      description:
        "Akreditovaný kondičný tréner a IFBB Pro Men's Physique. Osobný tréning, online coaching, stravovacie a tréningové plány, kondičná príprava športovcov v Trnave.",
      url: SITE_URL,
      image: `${SITE_URL}/images/online_coaching_800x600.jpg`,
      areaServed: { "@type": "City", name: "Trnava" },
      priceRange: "€€",
      founder: { "@id": `${SITE_URL}/#dominik` },
      provider: { "@id": `${SITE_URL}/#dominik` },
      knowsAbout: [
        "osobný tréning",
        "online coaching",
        "stravovací plán",
        "tréningový plán",
        "kondičná príprava",
        "Men's Physique",
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Coaching balíčky a služby",
        itemListElement: services.map((svc) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: svc.title,
            description: svc.tagline,
          },
        })),
      },
    },
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#dominik`,
      name: "Dominik Prelovský",
      jobTitle: "Kondičný tréner, IFBB Pro Men's Physique",
      url: SITE_URL,
      image: `${SITE_URL}/images/dominik-prelovsky.jpg`,
      worksFor: { "@id": `${SITE_URL}/#business` },
    },
    ...ebooks.map((e) => ({
      "@type": "Product",
      "@id": `${SITE_URL}/#ebook-${e.id}`,
      name: e.name,
      category: "E-book",
      brand: { "@type": "Brand", name: "Dominik Prelovský" },
      offers: {
        "@type": "Offer",
        price: (e.price / 100).toFixed(2),
        priceCurrency: "EUR",
        availability: "https://schema.org/InStock",
        url: `${SITE_URL}/#novinky`,
      },
    })),
  ];

  const json = { "@context": "https://schema.org", "@graph": graph };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}
