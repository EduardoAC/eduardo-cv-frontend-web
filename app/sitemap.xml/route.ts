// app/sitemap.xml/route.ts

import { promises as fs } from "fs";
import path from "path";

const BASE_URL = "https://eduardo-aparicio-cardenes.website";

export const metadata = {
  title: 'Sitemap',
  description: 'XML Sitemap for SEO purposes',
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: 'Sitemap',
    description: 'XML Sitemap for search engines',
  },
}

export async function GET() {
  const filePath = path.join(process.cwd(), "dist", "static-routes.json");

  let staticRoutes: string[] = [];
  try {
    const file = await fs.readFile(filePath, "utf-8");
    staticRoutes = JSON.parse(file);
  } catch (error) {
    console.error("Failed to read static-routes.json:", error);
  }

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${staticRoutes
        .filter((route) => !route.includes("{")) // skip dynamic placeholders
        .map(
          (route) => `
      <url>
        <loc>${BASE_URL}${route}</loc>
      </url>`
        )
        .join("")}
    </urlset>`;

  return new Response(sitemap.trim(), {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
