import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "Bad Dresser — Good Education, Bad Dresser";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage() {
  const logoData = await readFile(
    join(process.cwd(), "public", "landing-page", "mobile-logo.png")
  );
  const logoSrc = `data:image/png;base64,${logoData.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#000000",
        }}
      >
        <img
          src={logoSrc}
          alt=""
          width={320}
          height={124}
          style={{ objectFit: "contain" }}
        />
      </div>
    ),
    { ...size }
  );
}
