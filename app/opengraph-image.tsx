import { ImageResponse } from "next/og";

export const alt = "Hicap's Portfolio - Full Stack Developer Showcase";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background:
            "radial-gradient(ellipse at top left, #1A1E4D 0%, #0A0F2C 55%, #050818 100%)",
          color: "#EDEDF6",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(148,148,188,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(148,148,188,0.08) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
            display: "flex",
          }}
        />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            fontSize: "24px",
            color: "#9494BC",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
          }}
        >
          <div
            style={{
              width: "12px",
              height: "12px",
              borderRadius: "9999px",
              background: "#9494BC",
            }}
          />
          darenzhicap.dev
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div
            style={{
              fontSize: "112px",
              fontWeight: 700,
              lineHeight: 1.02,
              letterSpacing: "-0.03em",
              color: "#F7F7FB",
              display: "flex",
            }}
          >
            Darenz Jasper Hicap
          </div>
          <div
            style={{
              fontSize: "44px",
              color: "#9494BC",
              letterSpacing: "-0.01em",
              display: "flex",
            }}
          >
            Full Stack Developer
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: "26px",
            color: "#9494BC",
          }}
        >
          <div style={{ display: "flex", gap: "32px" }}>
            <span>React</span>
            <span style={{ color: "#4F5689" }}>·</span>
            <span>Next.js</span>
            <span style={{ color: "#4F5689" }}>·</span>
            <span>TypeScript</span>
          </div>
          <div
            style={{
              display: "flex",
              padding: "14px 28px",
              borderRadius: "9999px",
              border: "2px solid #9494BC",
              color: "#EDEDF6",
              fontSize: "24px",
            }}
          >
            View Portfolio →
          </div>
        </div>
      </div>
    ),
    size,
  );
}
