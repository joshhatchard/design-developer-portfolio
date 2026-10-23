type ShareCardProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export default function ShareCard({ eyebrow, title, description }: ShareCardProps) {
  return (
    <div
      style={{
        background: "#11120D",
        color: "#FFFFFF",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        padding: "72px",
        position: "relative",
        width: "100%",
      }}
    >
      <div style={{ background: "#C4F13A", height: "18px", position: "absolute", right: "72px", top: "72px", width: "18px" }} />
      <div style={{ color: "#C4F13A", display: "flex", fontSize: "24px", letterSpacing: "0.12em", textTransform: "uppercase" }}>{eyebrow}</div>
      <div style={{ display: "flex", fontSize: "86px", fontWeight: 800, letterSpacing: "-0.06em", lineHeight: 0.95, marginTop: "auto", maxWidth: "960px" }}>{title}</div>
      <div style={{ color: "#D9D9D2", display: "flex", fontSize: "28px", lineHeight: 1.35, marginTop: "36px", maxWidth: "900px" }}>{description}</div>
      <div style={{ color: "#FFFFFF", display: "flex", fontSize: "22px", letterSpacing: "0.08em", marginTop: "auto", textTransform: "uppercase" }}>Josh Hatchard · Designer &amp; Developer</div>
    </div>
  );
}
