import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    <div style={{ alignItems: "center", background: "#C4F13A", color: "#11120D", display: "flex", fontSize: 42, fontWeight: 800, height: "100%", justifyContent: "center", width: "100%" }}>J</div>,
    size,
  );
}
