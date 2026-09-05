import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://sky-quest-holidays.web.app";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/skyAdmin", "/api"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
