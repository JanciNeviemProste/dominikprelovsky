import profile from "@/data/profile.json";
import Editable from "@/components/admin/Editable";

export default function AboutSection() {
  return (
    <section className="w-full" style={{ backgroundColor: "#121212" }}>
      <div className="media-text">
        <div className="media-text__media">
          <img src={profile.photo} alt={profile.name} style={{ objectPosition: "center 15%" }} />
        </div>

        <div className="media-text__content" style={{ padding: "3em 8%" }}>
          <h2
            style={{
              fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif",
              fontSize: 50,
              lineHeight: "40px",
              fontWeight: 400,
              marginBottom: 8,
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
              color: "#888888",
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
              fontSize: 14,
              fontWeight: 300,
              lineHeight: 1.7,
              color: "#ffffff",
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
