import { createHash } from 'crypto';
import { readdir, readFile, stat } from 'fs/promises';
import { join, resolve } from 'path';

const exportDir = resolve(process.cwd(), 'dist');
const hashes = new Set<string>();

async function extractHashesFromFile(filePath: string): Promise<void> {
  const content = await readFile(filePath, 'utf-8');
  const scriptRegex = /<script>([\s\S]*?)<\/script>/gi;
  let match: RegExpExecArray | null;

  while ((match = scriptRegex.exec(content))) {
    const scriptContent = match[1].trim();
    if (!scriptContent) continue;

    const hash = createHash('sha256')
      .update(scriptContent, 'utf8')
      .digest('base64');

    hashes.add(`'sha256-${hash}'`);
  }
}

async function walkDirectory(dirPath: string): Promise<void> {
  const entries = await readdir(dirPath, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = join(dirPath, entry.name);
    const entryStat = await stat(fullPath);

    if (entryStat.isDirectory()) {
      await walkDirectory(fullPath);
    } else if (entry.isFile() && entry.name.endsWith('.html')) {
      await extractHashesFromFile(fullPath);
    }
  }
}

// Run script
(async () => {
  await walkDirectory(exportDir);
})();

const scriptSources = [
  "'self'",
  'https://static.cloudflareinsights.com',
  ...Array.from(hashes)
];

const cspHeader = `script-src ${scriptSources.join(' ')};`;

console.log('\n✅ Suggested CSP directive for Cloudflare:\n');
console.log(cspHeader);
