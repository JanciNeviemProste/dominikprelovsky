"use client";

import { Instagram, Youtube, Facebook } from "lucide-react";

const socials = [
  {
    icon: Instagram,
    href: "https://instagram.com/fitcoach_dominprelovsky",
    label: "Instagram",
  },
  {
    icon: Youtube,
    href: "https://www.youtube.com/@fitcoach_dominprelovsky",
    label: "YouTube",
  },
  {
    icon: Facebook,
    href: "https://www.facebook.com/dominprelovsky/",
    label: "Facebook",
  },
];

export default function SocialMedia() {
  return (
    <section className="w-full bg-white" style={{ padding: "48px 0" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px" }}>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 24 }}>
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              style={{ color: "#666666", transition: "opacity 0.2s" }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              <s.icon size={50} strokeWidth={1.5} />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
