import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site-config";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background:
          "linear-gradient(135deg, #080a1c 0%, #171442 60%, #2a2160 100%)",
        padding: "0 96px",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          marginBottom: 40,
        }}
      >
        <div
          style={{
            display: "flex",
            width: 56,
            height: 56,
            borderRadius: 14,
            background: "linear-gradient(135deg, #6f63f3, #3f31a4)",
            color: "#f8e2b0",
            fontSize: 22,
            fontWeight: 700,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          AK
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 30,
            fontWeight: 600,
            color: "white",
          }}
        >
          {siteConfig.name}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          fontSize: 56,
          fontWeight: 600,
          color: "white",
          textAlign: "center",
          lineHeight: 1.15,
        }}
      >
        Powering AI, From Research to Code
      </div>
      <div
        style={{
          display: "flex",
          marginTop: 28,
          fontSize: 24,
          color: "#cbd5e1",
          textAlign: "center",
        }}
      >
        Applied AI research · Software engineering · MeroIMS
      </div>
    </div>,
    { ...size },
  );
}
