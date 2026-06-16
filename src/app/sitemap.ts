import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { listings } from "@/lib/listings";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url.replace(/\/$/, "");
  const staticRoutes = ["", "/ilanlar", "/degerlendir", "/kesif", "/hakkimizda", "/iletisim"];

  return [
    ...staticRoutes.map((r) => ({
      url: `${base}${r}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: r === "" ? 1 : 0.8,
    })),
    ...listings.map((l) => ({
      url: `${base}/ilanlar/${l.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.6,
    })),
  ];
}
