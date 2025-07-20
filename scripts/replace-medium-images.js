#!/usr/bin/env node

// Script: replace-medium-images.js
// Description: Replaces all Medium image URLs in markdown files with local paths as per .medium-migration-images.json
// Usage: node scripts/replace-medium-images.js

const fs = require('fs');
const path = require('path');

const MAPPING_FILE = path.join(process.cwd(), '.medium-migration-images.json');
const POSTS_DIR = path.join(process.cwd(), 'content/posts');

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function replaceAll(content, from, to) {
  // Replace all occurrences, even if the URL is inside () or " or ' or <>
  const re = new RegExp(escapeRegExp(from), 'g');
  return content.replace(re, to);
}

function main() {
  if (!fs.existsSync(MAPPING_FILE)) {
    console.error('Mapping file not found:', MAPPING_FILE);
    process.exit(1);
  }
  const mapping = JSON.parse(fs.readFileSync(MAPPING_FILE, 'utf8'));
  const summary = [];

  for (const article of mapping.articles) {
    const mdFile = path.join(POSTS_DIR, article.slug);
    if (!fs.existsSync(mdFile)) {
      console.warn('Markdown file not found:', mdFile);
      continue;
    }
    let content = fs.readFileSync(mdFile, 'utf8');
    let replaced = 0;
    for (const img of article.images) {
      const before = content;
      content = replaceAll(content, img.original, img.local);
      if (content !== before) replaced++;
    }
    if (replaced > 0) {
      fs.writeFileSync(mdFile, content, 'utf8');
      summary.push({ file: article.slug, images: replaced });
    }
  }

  // Print summary
  if (summary.length === 0) {
    console.log('No files needed updating.');
  } else {
    console.log('Updated files:');
    for (const s of summary) {
      console.log(`- ${s.file}: ${s.images} image URL(s) replaced`);
    }
  }
}

main(); 