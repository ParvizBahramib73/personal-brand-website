import { ImageResponse } from "next/og";
import { isLocale, locales, site } from "@/lib/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function OpenGraphImage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = isLocale(lang) ? lang : "en";

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#f9f9f6",
        color: "#202527",
        padding: 80,
      }}
    >
      <div style={{ fontSize: 24, letterSpacing: 3, color: "#386b75" }}>
        ENGINEERING · DESIGN · CURIOSITY
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <div style={{ fontSize: 88, fontWeight: 700 }}>{site.name[locale]}</div>
        <div style={{ fontSize: 34, color: "#677474" }}>{site.title[locale]}</div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 22,
          color: "#657071",
        }}
      >
        <span>PERSONAL BRAND / PORTFOLIO</span>
        <span>↗</span>
      </div>
    </div>,
    size,
  );
}
