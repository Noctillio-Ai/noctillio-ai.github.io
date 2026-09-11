import type { MetadataRoute } from "next";
import { nav } from "@/lib/site";

export const dynamic = "force-static";

const siteUrl = "https://noctillio-ai.github.io";

export default function sitemap(): MetadataRoute.Sitemap {
  return nav.map((item) => {
    // Match next.config.ts's trailingSlash: true output (avoids a redirect hop),
    // but keep the bare root URL as "/".
    const path = item.href === "/" ? "/" : `${item.href}/`;
    return {
      url: `${siteUrl}${path}`,
      lastModified: new Date(),
    };
  });
}
