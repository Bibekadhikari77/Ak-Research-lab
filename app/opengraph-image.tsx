import { ImageResponse } from "next/og"
import { siteConfig } from "@/lib/site-config"

export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function OpengraphImage() {
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
          background: "#F7F5F3",
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
              background: "#37322F",
              color: "white",
              fontSize: 22,
              fontWeight: 700,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            AK
          </div>
          <div style={{ display: "flex", fontSize: 30, fontWeight: 600, color: "#37322F" }}>
            {siteConfig.name}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 56,
            fontWeight: 600,
            color: "#37322F",
            textAlign: "center",
            lineHeight: 1.15,
          }}
        >
          Powering AI, From Compute to Code
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 28,
            fontSize: 24,
            color: "#605A57",
            textAlign: "center",
          }}
        >
          GPU infrastructure · Applied AI research · Production-grade engineering
        </div>
      </div>
    ),
    { ...size },
  )
}
