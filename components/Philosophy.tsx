import { FileText, HandHelping, Scale } from "lucide-react";
import InfoBox from "./ui/InfoBox";

const boxes = [
  {
    icon: FileText,
    title: "Založené na faktoch",
    text: "Moje rady sú založené len na faktoch, najnovších štúdiách a mojej 10-ročnej praxi. Žiadne mýty, len overené postupy.",
  },
  {
    icon: HandHelping,
    title: "Skutočný tréner",
    text: "Trénerstvo je mojím živobytím. Žijem tým každý deň. Som dennodenne v styku s klientmi v 365 GYM a pomáham im byť lepšou verziou samých seba.",
  },
  {
    icon: Scale,
    title: "Prešiel som si tým tiež",
    text: "Priberanie, chudnutie, telesná rekompozícia, príprava na súťaž v men's physique. Všetkým som si prešiel a preto sa viem vžiť do kože takmer každého.",
  },
];

export default function Philosophy() {
  return (
    <section className="w-full bg-white" style={{ padding: "80px 0" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px" }}>
        {/* Heading */}
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <h2
            style={{
              fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif",
              fontSize: 50,
              lineHeight: "40px",
              fontWeight: 400,
              color: "#2b2b2b",
            }}
          >
            môj prístup
          </h2>
        </div>

        {/* 3 Info Boxes */}
        <div className="responsive-grid">
          {boxes.map((box) => (
            <InfoBox key={box.title} icon={box.icon} title={box.title} text={box.text} />
          ))}
        </div>
      </div>
    </section>
  );
}
