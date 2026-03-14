const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const PUBLIC_DIR = path.join(process.cwd(), 'public');

const imageMetadataCache = new Map();

const isLocalImagePath = (imagePath) =>
  typeof imagePath === 'string' && imagePath.startsWith('/') && !imagePath.startsWith('//');

const resolvePublicFileFromUrl = (imagePath, publicDirectory = PUBLIC_DIR) => {
  if (!isLocalImagePath(imagePath)) {
    return null;
  }

  return path.join(publicDirectory, imagePath.replace(/^\//, ''));
};

const getLocalImageMetadata = async (imagePath, publicDirectory = PUBLIC_DIR) => {
  if (!isLocalImagePath(imagePath)) {
    return null;
  }

  const cacheKey = `${publicDirectory}:${imagePath}`;
  const cachedMetadata = imageMetadataCache.get(cacheKey);

  if (cachedMetadata) {
    return cachedMetadata;
  }

  const absoluteSourcePath = resolvePublicFileFromUrl(imagePath, publicDirectory);

  if (!absoluteSourcePath || !fs.existsSync(absoluteSourcePath)) {
    return null;
  }

  try {
    const metadata = await sharp(absoluteSourcePath).metadata();

    if (!metadata.width || !metadata.height) {
      return null;
    }

    const value = {
      absoluteSourcePath,
      width: metadata.width,
      height: metadata.height,
      format: metadata.format ?? (path.extname(absoluteSourcePath).replace('.', '') || 'unknown'),
    };

    imageMetadataCache.set(cacheKey, value);
    return value;
  } catch (error) {
    console.warn(`Unable to read image metadata for ${imagePath}:`, error);
    return null;
  }
};

const toPublicVariantPath = ({
  sourcePath,
  outputSubdirectory,
  variantName,
  width,
  format = 'webp',
  publicDirectory = PUBLIC_DIR,
}) => {
  const publicRelativePath = sourcePath.replace(/^\//, '');
  const parsedPath = path.parse(publicRelativePath);
  const normalizedDirectory = parsedPath.dir.replace(/^images[\\/]/, '');
  const outputRelativePath = path.join(
    outputSubdirectory,
    normalizedDirectory,
    `${parsedPath.name}-${variantName}-${width}.${format}`,
  );

  return {
    absolutePath: path.join(publicDirectory, outputRelativePath),
    publicPath: `/${outputRelativePath.split(path.sep).join('/')}`,
  };
};

const ensureVariantFile = async ({
  sourcePath,
  outputPath,
  width,
  format = 'webp',
  quality = 82,
  withoutEnlargement = true,
}) => {
  let shouldGenerate = true;

  if (fs.existsSync(outputPath)) {
    const sourceStats = fs.statSync(sourcePath);
    const outputStats = fs.statSync(outputPath);
    shouldGenerate = sourceStats.mtimeMs > outputStats.mtimeMs;
  }

  if (!shouldGenerate) {
    return;
  }

  fs.mkdirSync(path.dirname(outputPath), { recursive: true });

  await sharp(sourcePath)
    .resize({ width, withoutEnlargement })
    .toFormat(format, format === 'webp' ? { quality } : undefined)
    .toFile(outputPath);
};

const buildVariantSet = async ({
  sourcePath,
  widths,
  outputSubdirectory,
  variantName,
  format = 'webp',
  quality = 82,
  publicDirectory = PUBLIC_DIR,
  allowUpscale = false,
}) => {
  const metadata = await getLocalImageMetadata(sourcePath, publicDirectory);

  if (!metadata) {
    return null;
  }

  const canScaleBeyondSource = allowUpscale || metadata.format === 'svg';
  const variantWidths = Array.from(
    new Set(
      widths
        .map((requestedWidth) => (
          canScaleBeyondSource ? requestedWidth : Math.min(requestedWidth, metadata.width)
        ))
        .filter(Boolean),
    ),
  ).sort((a, b) => a - b);

  if (variantWidths.length === 0) {
    return null;
  }

  const variants = [];

  for (const width of variantWidths) {
    const height = Math.max(1, Math.round((metadata.height / metadata.width) * width));
    const { absolutePath, publicPath } = toPublicVariantPath({
      sourcePath,
      outputSubdirectory,
      variantName,
      width,
      format,
      publicDirectory,
    });

    await ensureVariantFile({
      sourcePath: metadata.absoluteSourcePath,
      outputPath: absolutePath,
      width,
      format,
      quality,
      withoutEnlargement: !canScaleBeyondSource,
    });

    variants.push({
      src: publicPath,
      width,
      height,
      format,
    });
  }

  return {
    source: sourcePath,
    width: metadata.width,
    height: metadata.height,
    format: metadata.format,
    variants,
  };
};

const buildSrcSet = (variants) => variants.map((variant) => `${variant.src} ${variant.width}w`).join(', ');

const buildResponsiveContext = async ({
  sourcePath,
  widths,
  sizes,
  outputSubdirectory,
  variantName,
  format = 'webp',
  quality = 82,
  publicDirectory = PUBLIC_DIR,
  allowUpscale = false,
}) => {
  const asset = await buildVariantSet({
    sourcePath,
    widths,
    outputSubdirectory,
    variantName,
    format,
    quality,
    publicDirectory,
    allowUpscale,
  });

  if (!asset || asset.variants.length === 0) {
    return null;
  }

  const defaultVariant = asset.variants[asset.variants.length - 1];

  return {
    src: defaultVariant.src,
    width: defaultVariant.width,
    height: defaultVariant.height,
    format: defaultVariant.format,
    sizes,
    srcSet: buildSrcSet(asset.variants),
    variants: asset.variants,
  };
};

module.exports = {
  PUBLIC_DIR,
  isLocalImagePath,
  resolvePublicFileFromUrl,
  getLocalImageMetadata,
  buildVariantSet,
  buildResponsiveContext,
  buildSrcSet,
};
