import type { MetadataRoute } from "next";
import { SITE_URL } from "@/portfolio/utils/constants";

const ROUTES: { path: string; priority: number }[] = [
  { path: "", priority: 1 },
  { path: "/projects", priority: 0.8 },
  { path: "/skills-and-certificates", priority: 0.8 },
  { path: "/experiences", priority: 0.8 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return ROUTES.map(({ path, priority }) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency: "monthly",
    priority,
  }));
}
