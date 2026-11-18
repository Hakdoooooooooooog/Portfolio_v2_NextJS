import { ImageResponse } from "next/og";

export const alt =
  "Darenz Jasper Hicap — Full-Stack & Cloud Infrastructure Engineer";
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
          padding: "72px 80px",
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
            fontSize: "20px",
            color: "#9494BC",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          <span>Darenz Jasper Hicap</span>
          <span>Cavite, Philippines</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
          <div
            style={{
              fontSize: "64px",
              fontWeight: 700,
              lineHeight: 1.08,
              letterSpacing: "-0.03em",
              color: "#F7F7FB",
              display: "flex",
              maxWidth: "960px",
            }}
          >
            Full-Stack Systems, Cloud Infrastructure & AI Tooling
          </div>
          <div
            style={{
              fontSize: "28px",
              color: "#9494BC",
              letterSpacing: "-0.01em",
              display: "flex",
              lineHeight: 1.4,
            }}
          >
            TypeScript · Next.js · NestJS · PostgreSQL · Redis · Terraform · Docker
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: "22px",
            color: "#9494BC",
            borderTop: "1px solid rgba(148,148,188,0.2)",
            paddingTop: "24px",
          }}
        >
          <div style={{ display: "flex", gap: "20px" }}>
            <span>TicketSupport</span>
            <span style={{ color: "#4F5689" }}>·</span>
            <span>Redbiomed</span>
            <span style={{ color: "#4F5689" }}>·</span>
            <span>E-CPLGT</span>
            <span style={{ color: "#4F5689" }}>·</span>
            <span>TOPCIT LCMS</span>
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
          </div>
        </div>
      </div>
    ),
    size,
  );
}
