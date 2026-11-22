import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: "/personal-brand-website",
  images: { unoptimized: true },
};
export default nextConfig;
