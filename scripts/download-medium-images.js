#!/usr/bin/env node

// Script: download-medium-images.js
// Description: Scans markdown files for Medium image URLs, downloads them to public/images/blog/, and generates a mapping file for traceability.

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Use fetch from Node.js (Node 18+)
const fetch = global.fetch || (await import('node:node-fetch')).default;

const POSTS_DIR = path.join(process.cwd(), 'content/posts');
const IMAGES_DIR = path.join(process.cwd(), 'public/images/blog');
const MAPPING_FILE = path.join(process.cwd(), '.medium-migration-images.json');

// Slugify logic (from lib/blog/markdown.ts)
function slugify(str) {
  return str
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

// Ensure images directory exists
if (!fs.existsSync(IMAGES_DIR)) {
  fs.mkdirSync(IMAGES_DIR, { recursive: true });
}

// Find all markdown files in POSTS_DIR
const mdFiles = fs.readdirSync(POSTS_DIR).filter(f => f.endsWith('.md'));

const mediumImageRegex = /https?:\/\/cdn-images-1\.medium\.com\/[\w\-\./\*]+\.(?:jpg|jpeg|png|gif|webp)/gi;
const markdownImageRegex = /!\[[^\]]*\]\(([^)]+)\)/g;
const frontmatterImageRegex = /^image:\s*['"]?(https?:\/\/cdn-images-1\.medium\.com\/[^'"\s]+)['"]?/im;

const mapping = { articles: [] };
const usedFilenames = new Set();

function getExtension(url) {
  const match = url.match(/\.([a-zA-Z0-9]+)(?:\?|$)/);
  return match ? match[1] : 'jpg';
}

function uniqueFilename(base, ext) {
  let filename = `${base}.${ext}`;
  let i = 1;
  while (usedFilenames.has(filename)) {
    filename = `${base}-${i}.${ext}`;
    i++;
  }
  usedFilenames.add(filename);
  return filename;
}

for (const file of mdFiles) {
  const filePath = path.join(POSTS_DIR, file);
  const content = fs.readFileSync(filePath, 'utf8');
  const slug = file.replace(/\.md$/, '');
  const articleImages = [];

  // 1. Frontmatter image field
  const frontmatterMatch = content.match(frontmatterImageRegex);
  if (frontmatterMatch) {
    const url = frontmatterMatch[1];
    if (url) articleImages.push({ url, context: 'frontmatter' });
  }

  // 2. Markdown image references
  let match;
  while ((match = markdownImageRegex.exec(content)) !== null) {
    const url = match[1];
    if (url && url.match(mediumImageRegex)) {
      articleImages.push({ url, context: 'markdown' });
    }
  }

  // 3. Deduplicate URLs
  const uniqueImages = Array.from(new Set(articleImages.map(img => img.url))).map(url => {
    const context = articleImages.find(img => img.url === url)?.context || 'unknown';
    return { url, context };
  });

  // 4. Generate local filenames and mapping
  const images = [];
  for (const { url, context } of uniqueImages) {
    const ext = getExtension(url);
    // Use article slug + context + index for filename
    const base = slugify(`${slug}-${context}`);
    const filename = uniqueFilename(base, ext);
    images.push({ original: url, local: `/images/blog/${filename}` });
  }

  if (images.length > 0) {
    mapping.articles.push({ slug: file, images });
  }
}

// 5. Download images
async function downloadImages() {
  for (const article of mapping.articles) {
    for (const img of article.images) {
      const destPath = path.join(IMAGES_DIR, path.basename(img.local));
      if (fs.existsSync(destPath)) continue; // Skip if already downloaded
      try {
        const res = await fetch(img.original);
        if (!res.ok) throw new Error(`Failed to fetch ${img.original}`);
        const buffer = await res.arrayBuffer();
        fs.writeFileSync(destPath, Buffer.from(buffer));
        console.log(`Downloaded: ${img.original} -> ${img.local}`);
      } catch (err) {
        console.error(`Error downloading ${img.original}:`, err.message);
      }
    }
  }
  // 6. Write mapping file
  fs.writeFileSync(MAPPING_FILE, JSON.stringify(mapping, null, 2));
  console.log(`\nMapping file written to ${MAPPING_FILE}`);
}

// Run the script
if (require.main === module) {
  downloadImages();
} 