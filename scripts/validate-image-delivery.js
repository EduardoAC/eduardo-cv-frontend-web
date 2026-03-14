#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const { getSiteImageSpecs } = require('./lib/site-image-config');

const ROOT_DIR = process.cwd();
const SITE_MANIFEST_PATH = path.join(ROOT_DIR, 'generated', 'site-image-manifest.json');
const SOURCE_DIRECTORIES = ['app', 'components', 'lib'].map((directory) => path.join(ROOT_DIR, directory));

const errors = [];
const warnings = [];

const addError = (message) => {
  errors.push(message);
  console.error(`ERROR ${message}`);
};

const addWarning = (message) => {
  warnings.push(message);
  console.warn(`WARN  ${message}`);
};

const listSourceFiles = () => {
  const files = [];

  const walk = (directoryPath) => {
    if (!fs.existsSync(directoryPath)) {
      return;
    }

    for (const entry of fs.readdirSync(directoryPath, { withFileTypes: true })) {
      if (entry.name === 'node_modules' || entry.name === '.next' || entry.name === 'dist') {
        continue;
      }

      const fullPath = path.join(directoryPath, entry.name);

      if (entry.isDirectory()) {
        walk(fullPath);
        continue;
      }

      if (/\.(ts|tsx)$/.test(entry.name)) {
        files.push(fullPath);
      }
    }
  };

  SOURCE_DIRECTORIES.forEach(walk);

  return files;
};

const extractSelfClosingTags = (text, tagName) =>
  Array.from(text.matchAll(new RegExp(`<${tagName}\\b[\\s\\S]*?/>`, 'g')), (match) => match[0]);

const hasAttribute = (tag, attribute) => new RegExp(`\\b${attribute}\\s*=|\\b${attribute}\\b`).test(tag);

const validateImageComponents = () => {
  for (const filePath of listSourceFiles()) {
    const relativePath = path.relative(ROOT_DIR, filePath);
    const source = fs.readFileSync(filePath, 'utf8');

    for (const imageTag of extractSelfClosingTags(source, 'Image')) {
      if (!hasAttribute(imageTag, 'width')) {
        addError(`${relativePath}: next/image tag is missing width.`);
      }

      if (!hasAttribute(imageTag, 'height')) {
        addError(`${relativePath}: next/image tag is missing height.`);
      }

      if (!hasAttribute(imageTag, 'sizes')) {
        addError(`${relativePath}: next/image tag is missing sizes.`);
      }
    }

    for (const imageTag of extractSelfClosingTags(source, 'img')) {
      const isBlogImage = relativePath.startsWith('components/blog/');
      const isMentorAvatar = relativePath === 'app/mentor-profile/ReviewsGrid.tsx';

      if (!hasAttribute(imageTag, 'alt')) {
        addError(`${relativePath}: raw img tag is missing alt.`);
      }

      if (isBlogImage || isMentorAvatar) {
        if (!hasAttribute(imageTag, 'width')) {
          addError(`${relativePath}: raw img tag is missing width.`);
        }

        if (!hasAttribute(imageTag, 'height')) {
          addError(`${relativePath}: raw img tag is missing height.`);
        }
      }

      if (isBlogImage && !hasAttribute(imageTag, 'sizes')) {
        addError(`${relativePath}: blog raw img tag is missing sizes.`);
      }

      if (isMentorAvatar) {
        if (!hasAttribute(imageTag, 'loading')) {
          addError(`${relativePath}: mentor avatar img tag is missing loading.`);
        }

        if (!hasAttribute(imageTag, 'decoding')) {
          addError(`${relativePath}: mentor avatar img tag is missing decoding.`);
        }
      }
    }
  }
};

const validateSiteImageManifest = () => {
  if (!fs.existsSync(SITE_MANIFEST_PATH)) {
    addError(`Missing generated site image manifest at ${SITE_MANIFEST_PATH}.`);
    return;
  }

  const manifest = JSON.parse(fs.readFileSync(SITE_MANIFEST_PATH, 'utf8'));

  for (const spec of getSiteImageSpecs()) {
    const entry = manifest[spec.source];

    if (!entry) {
      addError(`Site image manifest is missing ${spec.source}.`);
      continue;
    }

    if (!entry.width || !entry.height || !Array.isArray(entry.variants) || entry.variants.length === 0) {
      addError(`Site image manifest entry for ${spec.source} is incomplete.`);
      continue;
    }

    for (const variant of entry.variants) {
      const absoluteVariantPath = path.join(ROOT_DIR, 'public', variant.src.replace(/^\//, ''));

      if (!fs.existsSync(absoluteVariantPath)) {
        addError(`Generated site image variant is missing on disk: ${variant.src}.`);
      }
    }
  }
};

const validateKeyDecisions = () => {
  const nextConfig = fs.readFileSync(path.join(ROOT_DIR, 'next.config.js'), 'utf8');

  if (/unoptimized:\s*true/.test(nextConfig)) {
    addError('next.config.js still has images.unoptimized enabled.');
  }

  if (!/loader:\s*'custom'/.test(nextConfig) || !/loaderFile:\s*'\.\/lib\/images\/siteLoader\.ts'/.test(nextConfig)) {
    addError('next.config.js is missing the custom image loader configuration.');
  }

  const contactPage = fs.readFileSync(path.join(ROOT_DIR, 'app', 'contact', 'page.tsx'), 'utf8');

  if (/<Image[\s\S]*?\bpriority\b[\s\S]*?className=\{styles\.wold_wide_map\}/.test(contactPage)) {
    addError('Contact background image must not use priority.');
  }

  if (!/alt=""[\s\S]*?aria-hidden="true"/.test(contactPage)) {
    addWarning('Contact background image should remain explicitly decorative.');
  }
};

const main = () => {
  console.log('Image delivery validation');

  validateSiteImageManifest();
  validateImageComponents();
  validateKeyDecisions();

  const summary = `Validation finished with ${errors.length} error(s) and ${warnings.length} warning(s).`;

  if (errors.length > 0) {
    console.error(summary);
    process.exit(1);
  }

  console.log(summary);
};

main();
