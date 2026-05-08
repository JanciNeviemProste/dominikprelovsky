// Privítacie YouTube video. Keď Dominik dodá URL, vyplň konštantu nižšie
// (formát: "https://www.youtube.com/watch?v=XXXX" alebo "https://youtu.be/XXXX").
// Sekcia sa automaticky neukáže, kým je URL prázdne.
const YOUTUBE_URL = "";

function toEmbedUrl(url: string): string | null {
  try {
    const parsed = new URL(url);
    if (parsed.hostname.includes("youtu.be")) {
      const id = parsed.pathname.slice(1);
      return id ? `https://www.youtube.com/embed/${id}` : null;
    }
    if (parsed.hostname.includes("youtube.com")) {
      if (parsed.pathname === "/watch") {
        const id = parsed.searchParams.get("v");
        return id ? `https://www.youtube.com/embed/${id}` : null;
      }
      if (parsed.pathname.startsWith("/embed/")) return url;
    }
    return null;
  } catch {
    return null;
  }
}

export default function YouTubeWelcome() {
  if (!YOUTUBE_URL) return null;
  const embed = toEmbedUrl(YOUTUBE_URL);
  if (!embed) return null;

  return (
    <section className="w-full bg-white" style={{ padding: "64px 0" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <h2
            style={{
              fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif",
              fontSize: 50,
              lineHeight: "60px",
              fontWeight: 400,
              color: "#2b2b2b",
              marginBottom: 8,
            }}
          >
            PRIVÍTAM ŤA
          </h2>
          <p
            style={{
              fontFamily: "var(--font-montserrat), 'Montserrat', sans-serif",
              fontSize: 16,
              fontWeight: 300,
              color: "#888",
              margin: 0,
            }}
          >
            Krátke video — ako vyzerá spolupráca a cesta k výsledku.
          </p>
        </div>
        <div
          style={{
            position: "relative",
            width: "100%",
            maxWidth: 900,
            margin: "0 auto",
            aspectRatio: "16 / 9",
            backgroundColor: "#000",
          }}
        >
          <iframe
            src={embed}
            title="Privítacie video — Dominik Prelovský"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              border: 0,
            }}
          />
        </div>
      </div>
    </section>
  );
}
