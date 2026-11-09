import { ImageResponse } from "next/og";

export const alt = "Darenz Jasper Hicap - Junior Full-Stack Developer Portfolio";
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
            justifyContent: "space-between",
            fontSize: "22px",
            color: "#9494BC",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "9999px",
                background: "#9494BC",
              }}
            />
            <span>Darenz Jasper Hicap</span>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "6px 16px",
              borderRadius: "9999px",
              border: "1px solid rgba(148,148,188,0.3)",
              fontSize: "16px",
            }}
          >
            <div
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "9999px",
                background: "#4ade80",
              }}
            />
            <span>Open to Junior Full-Stack & Backend Roles</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div
            style={{
              fontSize: "88px",
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              color: "#F7F7FB",
              display: "flex",
            }}
          >
            Junior Full-Stack Developer
          </div>
          <div
            style={{
              fontSize: "32px",
              color: "#9494BC",
              letterSpacing: "-0.01em",
              display: "flex",
              lineHeight: 1.4,
              maxWidth: "900px",
            }}
          >
            Next.js · NestJS · TypeScript · PostgreSQL · Redis · Docker
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: "24px",
            color: "#9494BC",
            borderTop: "1px solid rgba(148,148,188,0.2)",
            paddingTop: "24px",
          }}
        >
          <div style={{ display: "flex", gap: "24px" }}>
            <span>TicketSupport</span>
            <span style={{ color: "#4F5689" }}>·</span>
            <span>TOPCIT LCMS</span>
            <span style={{ color: "#4F5689" }}>·</span>
            <span>E-CPLGT</span>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              color: "#F7F7FB",
            }}
          >
            <span>darenzhicap.netlify.app</span>
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#F7F7FB"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </div>
        </div>
      </div>
    ),
    size
  );
}
