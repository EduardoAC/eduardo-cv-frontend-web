// app/sitemap.xml/route.ts

import { promises as fs } from 'fs'
import path from 'path'

const BASE_URL = 'https://eduardo-aparicio-cardenes.website'

export async function GET() {
  const filePath = path.join(process.cwd(), 'dist', 'static-routes.json')
  const file = await fs.readFile(filePath, 'utf-8')
  const staticRoutes: string[] = JSON.parse(file)

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${staticRoutes
      .map((route) => {
        // Replace dynamic params like {slug} with sample or skip them
        if (route.includes('{')) return ''
        return `
          <url>
            <loc>${BASE_URL}${route}</loc>
          </url>`
      })
      .join('')}
  </urlset>`

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  })
}
