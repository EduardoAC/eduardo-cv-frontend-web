#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const { buildVariantSet } = require('./lib/image-pipeline');
const { getSiteImageSpecs } = require('./lib/site-image-config');

const generatedDirectory = path.join(process.cwd(), 'generated');
const manifestPath = path.join(generatedDirectory, 'site-image-manifest.json');

const mergeImageSpecs = (specs) => {
  const merged = new Map();

  for (const spec of specs) {
    const current = merged.get(spec.source) ?? {
      source: spec.source,
      widths: new Set(),
      allowUpscale: false,
      usages: new Set(),
    };

    for (const width of spec.widths) {
      current.widths.add(width);
    }

    if (spec.allowUpscale) {
      current.allowUpscale = true;
    }

    if (spec.usage) {
      current.usages.add(spec.usage);
    }

    merged.set(spec.source, current);
  }

  return Array.from(merged.values()).map((spec) => ({
    source: spec.source,
    widths: Array.from(spec.widths).sort((a, b) => a - b),
    allowUpscale: spec.allowUpscale,
    usages: Array.from(spec.usages).sort(),
  }));
};

const generateManifest = async () => {
  const specs = mergeImageSpecs(getSiteImageSpecs());
  const manifest = {};

  for (const spec of specs) {
    const asset = await buildVariantSet({
      sourcePath: spec.source,
      widths: spec.widths,
      outputSubdirectory: path.join('generated', 'site-images'),
      variantName: 'site',
      format: 'webp',
      quality: 82,
      allowUpscale: spec.allowUpscale,
    });

    if (!asset) {
      console.warn(`Skipping missing site image source: ${spec.source}`);
      continue;
    }

    manifest[spec.source] = {
      source: asset.source,
      width: asset.width,
      height: asset.height,
      format: asset.format,
      usages: spec.usages,
      variants: asset.variants,
    };
  }

  fs.mkdirSync(generatedDirectory, { recursive: true });
  fs.writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);

  console.log(`Generated site image manifest for ${Object.keys(manifest).length} sources at ${manifestPath}`);
};

generateManifest().catch((error) => {
  console.error('Failed to generate site image manifest:', error);
  process.exit(1);
});
