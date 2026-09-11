import type { MetadataRoute } from "next";
import { nav } from "@/lib/site";

export const dynamic = "force-static";

const siteUrl = "https://noctillio-ai.github.io";

export default function sitemap(): MetadataRoute.Sitemap {
  return nav.map((item) => ({
    url: `${siteUrl}${item.href}`,
    lastModified: new Date(),
  }));
}
