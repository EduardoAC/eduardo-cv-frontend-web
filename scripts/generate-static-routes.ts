// scripts/generate-static-routes.ts

import fg from 'fast-glob'
import fs from 'fs'
import path from 'path'

const distPath = path.join(process.cwd(), 'dist')

if (!fs.existsSync(distPath)) {
  fs.mkdirSync(distPath, { recursive: true })
  console.log('✅ dist/ directory created.')
} else {
  console.log('📁 dist/ already exists.')
}

async function generateRoutes() {
  const entries = await fg(['app/**/page.@(tsx|jsx)'], {
    ignore: ['**/sitemap.xml/**', '**/_*', '**/api/**'],
  })

  const routes = entries.map((entry) => {
    const route = entry
      .replace(/^app/, '')              // remove app prefix
      .replace(/\/page\.(tsx|jsx)$/, '') // remove filename
      .replace(/\[([^\]]+)\]/g, '{$1}')  // convert [slug] -> {slug} for clarity
    return route === '' ? '/' : route
  })

  const outputPath = path.join(process.cwd(), 'dist', 'static-routes.json')
  fs.writeFileSync(outputPath, JSON.stringify(routes, null, 2))

  console.log(`✅ Generated ${routes.length} routes to ${outputPath}`)
}

generateRoutes()
