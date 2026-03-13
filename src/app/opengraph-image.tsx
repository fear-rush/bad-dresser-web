import { ImageResponse } from "next/og";

export const alt = "Bad Dresser — Good Education, Bad Dresser";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #0a0a0a 100%)",
          gap: 20,
          padding: 60,
        }}
      >
        {/* Accent line */}
        <div
          style={{
            width: 80,
            height: 4,
            background: "#C4F82A",
            borderRadius: 2,
          }}
        />
        {/* Brand name */}
        <div
          style={{
            fontSize: 80,
            fontWeight: 800,
            color: "white",
            letterSpacing: -3,
            lineHeight: 1,
          }}
        >
          Bad Dresser
        </div>
        {/* Tagline */}
        <div
          style={{
            fontSize: 28,
            color: "rgba(255, 255, 255, 0.5)",
            letterSpacing: 4,
            textTransform: "uppercase",
          }}
        >
          good education, bad dresser.
        </div>
        {/* Divider */}
        <div
          style={{
            width: 40,
            height: 1,
            background: "rgba(255, 255, 255, 0.2)",
            marginTop: 8,
            marginBottom: 8,
          }}
        />
        {/* Description */}
        <div
          style={{
            fontSize: 22,
            color: "rgba(255, 255, 255, 0.4)",
            textAlign: "center",
            maxWidth: 600,
          }}
        >
          A fashion label for the intellectually curious and sartorially rebellious.
        </div>
      </div>
    ),
    { ...size }
  );
}
