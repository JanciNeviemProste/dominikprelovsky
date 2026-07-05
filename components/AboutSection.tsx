import profile from "@/data/profile.json";
import Editable from "@/components/admin/Editable";

export default function AboutSection() {
  return (
    <section className="w-full" style={{ backgroundColor: "#121212" }}>
      <div className="media-text">
        {/* Výška fotky je obmedzená, inak portrét (2230×3936) natiahne sekciu
            na ~2 obrazovky a text sa prepadne pod fold. */}
        <div className="media-text__media" style={{ height: "clamp(360px, 56vw, 720px)" }}>
          <img src={profile.photo} alt={profile.name} style={{ objectPosition: "center 12%" }} />
        </div>

        <div className="media-text__content" style={{ padding: "3em 8%" }}>
          <h2
            style={{
              fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif",
              fontSize: "clamp(40px, 5vw, 56px)",
              lineHeight: 1,
              fontWeight: 400,
              marginBottom: 10,
              color: "#ffffff",
            }}
          >
            <Editable
              contentType="profile"
              path="name"
              value={profile.name}
              label="Profil — meno"
            >
              {profile.name}
            </Editable>
          </h2>
          <p
            style={{
              fontFamily: "var(--font-montserrat), 'Montserrat', sans-serif",
              fontSize: 14,
              fontWeight: 600,
              marginBottom: 24,
              textTransform: "uppercase",
              letterSpacing: "2px",
              color: "#f73131",
            }}
          >
            <Editable
              contentType="profile"
              path="role"
              value={profile.role}
              label="Profil — rola / titulka"
            >
              {profile.role}
            </Editable>
          </p>
          <p
            style={{
              fontFamily: "var(--font-montserrat), 'Montserrat', sans-serif",
              fontSize: 15,
              fontWeight: 300,
              lineHeight: 1.8,
              maxWidth: "58ch",
              color: "#e6e6e6",
              whiteSpace: "pre-wrap",
            }}
          >
            <Editable
              contentType="profile"
              path="bio"
              value={profile.bio}
              label="Profil — bio (dlhý text)"
              multiline
            >
              {profile.bio}
            </Editable>
          </p>
        </div>
      </div>
    </section>
  );
}
