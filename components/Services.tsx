import servicesData from "@/data/services.json";
import settings from "@/data/site-settings.json";
import Editable from "@/components/admin/Editable";

type Service = {
  slug: string;
  title: string;
  tagline: string;
  bullets: string[];
  price: string;
  featured: boolean;
};

const services = servicesData as Service[];

export default function Services() {
  return (
    <section
      id="sluzby"
      className="w-full bg-white"
      style={{ padding: "64px 0" }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <h2
            style={{
              fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif",
              fontSize: 50,
              lineHeight: "60px",
              fontWeight: 400,
              marginBottom: 8,
              color: "#2b2b2b",
            }}
          >
            <Editable
              contentType="site-settings"
              path="servicesSection.title"
              value={settings.servicesSection.title}
              label="Služby — nadpis sekcie"
            >
              {settings.servicesSection.title}
            </Editable>
          </h2>
          <p
            style={{
              fontFamily: "var(--font-montserrat), 'Montserrat', sans-serif",
              fontSize: 19,
              fontWeight: 300,
              color: "#888888",
              marginBottom: 0,
            }}
          >
            <Editable
              contentType="site-settings"
              path="servicesSection.subtitle"
              value={settings.servicesSection.subtitle}
              label="Služby — podtitulok sekcie"
            >
              {settings.servicesSection.subtitle}
            </Editable>
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 24,
          }}
        >
          {services.map((s, idx) => (
            <article
              key={s.slug}
              style={{
                position: "relative",
                backgroundColor: "#f7f7f7",
                padding: "32px 24px",
                display: "flex",
                flexDirection: "column",
                border: s.featured ? "2px solid #f73131" : "2px solid transparent",
              }}
            >
              {s.featured && (
                <span
                  style={{
                    position: "absolute",
                    top: -14,
                    left: 24,
                    backgroundColor: "#f73131",
                    color: "#fff",
                    fontFamily: "var(--font-montserrat), 'Montserrat', sans-serif",
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: "1.5px",
                    textTransform: "uppercase",
                    padding: "6px 12px",
                  }}
                >
                  <Editable
                    contentType="site-settings"
                    path="servicesSection.featuredBadge"
                    value={settings.servicesSection.featuredBadge}
                    label="Služby — badge 'Najobľúbenejšie'"
                  >
                    {settings.servicesSection.featuredBadge}
                  </Editable>
                </span>
              )}

              <h3
                style={{
                  fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif",
                  fontSize: 32,
                  lineHeight: "32px",
                  fontWeight: 400,
                  marginBottom: 8,
                  color: "#2b2b2b",
                  letterSpacing: "1px",
                  textTransform: "uppercase",
                }}
              >
                <Editable
                  contentType="services"
                  path={`${idx}.title`}
                  value={s.title}
                  label={`Služba ${idx + 1} — názov`}
                >
                  {s.title}
                </Editable>
              </h3>

              <p
                style={{
                  fontFamily: "var(--font-montserrat), 'Montserrat', sans-serif",
                  fontSize: 13,
                  fontWeight: 300,
                  lineHeight: 1.6,
                  color: "#666",
                  marginBottom: 20,
                }}
              >
                <Editable
                  contentType="services"
                  path={`${idx}.tagline`}
                  value={s.tagline}
                  label={`Služba ${idx + 1} — tagline`}
                  multiline
                >
                  {s.tagline}
                </Editable>
              </p>

              <div style={{ marginBottom: 20 }}>
                <span
                  style={{
                    fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif",
                    fontSize: 44,
                    lineHeight: "44px",
                    fontWeight: 400,
                    color: "#f73131",
                  }}
                >
                  <Editable
                    contentType="services"
                    path={`${idx}.price`}
                    value={s.price}
                    label={`Služba ${idx + 1} — cena`}
                  >
                    {s.price}
                  </Editable>
                </span>
              </div>

              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  marginBottom: 24,
                  flex: 1,
                }}
              >
                {s.bullets.map((b, bIdx) => (
                  <li
                    key={`${s.slug}-${bIdx}`}
                    style={{
                      fontFamily: "var(--font-montserrat), 'Montserrat', sans-serif",
                      fontSize: 13,
                      fontWeight: 400,
                      lineHeight: 1.6,
                      color: "#2b2b2b",
                      marginBottom: 8,
                      paddingLeft: 20,
                      position: "relative",
                    }}
                  >
                    <span
                      style={{
                        position: "absolute",
                        left: 0,
                        top: 0,
                        color: "#f73131",
                        fontWeight: 700,
                      }}
                    >
                      ✓
                    </span>
                    <Editable
                      contentType="services"
                      path={`${idx}.bullets.${bIdx}`}
                      value={b}
                      label={`Služba ${idx + 1} — bullet ${bIdx + 1}`}
                    >
                      {b}
                    </Editable>
                  </li>
                ))}
              </ul>

              <a
                href={`/kontakt?sluzba=${s.slug}`}
                className="btn-outline"
                style={{ alignSelf: "flex-start" }}
              >
                <Editable
                  contentType="site-settings"
                  path="servicesSection.ctaText"
                  value={settings.servicesSection.ctaText}
                  label="Služby — text CTA tlačidla"
                >
                  {settings.servicesSection.ctaText}
                </Editable>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
