import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

// ⬇️ Workaround for __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getBuildVersion = () => {
  const now = new Date();
  const yyyy = now.getFullYear();
  const MM = String(now.getMonth() + 1).padStart(2, '0');
  const dd = String(now.getDate()).padStart(2, '0');
  const hh = String(now.getHours()).padStart(2, '0');
  const mm = String(now.getMinutes()).padStart(2, '0');

  return `${dd}-${MM}-${yyyy}-${hh}_${mm}`;
};

const generateServiceWorker = () => {
  const version = getBuildVersion();
  const templatePath = resolve(__dirname, '../service-worker/service-worker.template.js');
  const outputPath = resolve(__dirname, '../dist/service-worker.js');

  const template = readFileSync(templatePath, 'utf8');
  const output = template.replace(/__BUILD_VERSION__/g, version);

  writeFileSync(outputPath, output);
  console.log(`✅ Generated service-worker.js with version: ${version}`);
};

generateServiceWorker();
