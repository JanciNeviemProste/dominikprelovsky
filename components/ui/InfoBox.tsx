import { type LucideIcon } from "lucide-react";

interface InfoBoxProps {
  icon: LucideIcon;
  title: string;
  text: string;
}

export default function InfoBox({ icon: Icon, title, text }: InfoBoxProps) {
  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        padding: "24px 16px",
      }}
    >
      {/* Icon */}
      <div style={{ marginBottom: 15 }}>
        <Icon size={30} strokeWidth={1.5} color="#000000" />
      </div>

      {/* Separator */}
      <div
        style={{
          width: "30%",
          borderTop: "1px solid #333",
          marginBottom: 10,
        }}
      />

      {/* Title */}
      <h3
        style={{
          fontFamily: "var(--font-montserrat), 'Montserrat', sans-serif",
          fontWeight: 600,
          fontSize: 20,
          textTransform: "uppercase",
          marginBottom: 10,
          color: "#2b2b2b",
        }}
      >
        {title}
      </h3>

      {/* Description */}
      <p
        style={{
          fontFamily: "var(--font-montserrat), 'Montserrat', sans-serif",
          fontSize: 14,
          fontWeight: 300,
          lineHeight: 1.7,
          marginBottom: 0,
          color: "#2b2b2b",
        }}
      >
        {text}
      </p>
    </div>
  );
}
