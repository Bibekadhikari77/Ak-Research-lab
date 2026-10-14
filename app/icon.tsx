import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #6f63f3, #3f31a4)",
        borderRadius: 8,
        color: "#f8e2b0",
        fontSize: 16,
        fontWeight: 700,
        fontFamily: "sans-serif",
        letterSpacing: -0.5,
      }}
    >
      AK
    </div>,
    { ...size },
  );
}
