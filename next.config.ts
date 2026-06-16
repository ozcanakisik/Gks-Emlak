import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Placeholder görseller SVG; gerçek görseller (jpg/webp) eklendiğinde de çalışır.
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
