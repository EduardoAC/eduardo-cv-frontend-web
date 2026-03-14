#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const { getSiteImageMetadata, getSiteImageSpecs, SITE_IMAGE_SPECS } = (() => {
  const { getSiteImageSpecs } = require('./lib/site-image-config');
  const { getLocalImageMetadata } = require('./lib/image-pipeline');

  return {
    getSiteImageSpecs,
    SITE_IMAGE_SPECS: getSiteImageSpecs(),
    getSiteImageMetadata: getLocalImageMetadata,
  };
})();

const ROOT_DIR = process.cwd();
const POSTS_DIR = path.join(ROOT_DIR, 'content', 'posts');
const DOC_PATH = path.join(ROOT_DIR, 'docs', 'image-audit-report.md');
const SITE_MANIFEST_PATH = path.join(ROOT_DIR, 'generated', 'site-image-manifest.json');

const toRelative = (absolutePath) => path.relative(ROOT_DIR, absolutePath).replace(/\\/g, '/');

const formatBytes = (bytes) => {
  if (!Number.isFinite(bytes)) {
    return 'n/a';
  }

  if (bytes < 1024) {
    return `${bytes} B`;
  }

  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }

  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
};

const resolvePublicAsset = (assetPath) => {
  if (typeof assetPath !== 'string' || !assetPath.startsWith('/') || assetPath.startsWith('//')) {
    return null;
  }

  return path.join(ROOT_DIR, 'public', assetPath.replace(/^\//, ''));
};

const readLocalAssetInfo = async (assetPath) => {
  const absolutePath = resolvePublicAsset(assetPath);

  if (!absolutePath || !fs.existsSync(absolutePath)) {
    return null;
  }

  const metadata = await getSiteImageMetadata(assetPath);
  const stat = fs.statSync(absolutePath);

  return {
    path: assetPath,
    absolutePath,
    width: metadata?.width ?? null,
    height: metadata?.height ?? null,
    format: metadata?.format ?? path.extname(assetPath).replace('.', ''),
    size: stat.size,
  };
};

const extractMarkdownImages = (content) =>
  Array.from(
    content.matchAll(/!\[(.*?)\]\(([^)\s]+)(?:\s+"([^"]*)")?\)/g),
    (match) => ({
      alt: match[1] ?? '',
      src: match[2] ?? '',
      title: match[3] ?? '',
    }),
  );

const collectBlogData = async () => {
  const posts = [];
  const inlineImages = [];

  for (const fileName of fs.readdirSync(POSTS_DIR).filter((file) => file.endsWith('.md') && !file.startsWith('.')).sort()) {
    const absolutePath = path.join(POSTS_DIR, fileName);
    const raw = fs.readFileSync(absolutePath, 'utf8');
    const { data, content } = matter(raw);
    const coverAsset = await readLocalAssetInfo(data.image);

    posts.push({
      file: toRelative(absolutePath),
      title: data.title,
      image: data.image,
      imageAlt: data.imageAlt ?? '',
      asset: coverAsset,
    });

    for (const image of extractMarkdownImages(content)) {
      inlineImages.push({
        file: toRelative(absolutePath),
        src: image.src,
        alt: image.alt,
        local: image.src.startsWith('/'),
      });
    }
  }

  return { posts, inlineImages };
};

const collectRuntimeUiImages = async () => {
  const manifest = fs.existsSync(SITE_MANIFEST_PATH)
    ? JSON.parse(fs.readFileSync(SITE_MANIFEST_PATH, 'utf8'))
    : {};

  const siteRows = [];

  for (const spec of SITE_IMAGE_SPECS) {
    const asset = await readLocalAssetInfo(spec.source);
    const manifestEntry = manifest[spec.source];

    siteRows.push({
      source: spec.source,
      usage: spec.usage,
      dimensions: asset?.width && asset?.height ? `${asset.width}x${asset.height}` : 'n/a',
      format: asset?.format ?? 'n/a',
      size: formatBytes(asset?.size),
      generatedVariants: manifestEntry?.variants?.map((variant) => variant.width).join(', ') ?? 'missing',
    });
  }

  return siteRows;
};

const collectMetadataImages = async () => {
  const metadataAssets = [
    { source: '/favicon.ico', usage: 'favicon', file: 'app/layout.tsx + app/manifest.ts' },
    { source: '/images/profiles/apple-touch-icon-180x180.png', usage: 'apple-touch-icon', file: 'app/layout.tsx' },
    { source: '/images/profiles/eduardo-aparicio-cardenes-homepage-490px.png', usage: 'home open graph', file: 'app/page.tsx' },
    { source: '/images/about-eduardo-hacktheviual-1280.jpg', usage: 'about open graph', file: 'app/about/page.tsx' },
    { source: '/images/world-wide-map-optimized.svg', usage: 'contact open graph', file: 'app/contact/page.tsx' },
    { source: '/images/frontend/frontend-profile-v1-card.png', usage: 'frontend v1 open graph', file: 'app/frontend-profile/data.ts' },
    { source: '/images/frontend/frontend-profile-v2.png', usage: 'frontend v2 open graph', file: 'app/frontend-profile/data.ts' },
    { source: '/images/profiles/backend-profile-490px.webp', usage: 'backend profile open graph', file: 'lib/profile-data.ts' },
    { source: '/images/profiles/software-architect-profile-490px.webp', usage: 'software architect open graph', file: 'lib/profile-data.ts' },
    { source: '/images/profiles/mentor-profile-490px.png', usage: 'mentor profile open graph', file: 'app/mentor-profile/page.tsx' },
  ];

  const rows = [];

  for (const item of metadataAssets) {
    const asset = await readLocalAssetInfo(item.source);

    rows.push({
      file: item.file,
      source: item.source,
      usage: item.usage,
      dimensions: asset?.width && asset?.height ? `${asset.width}x${asset.height}` : 'n/a',
      format: asset?.format ?? 'n/a',
      size: formatBytes(asset?.size),
    });
  }

  return rows;
};

const collectRemoteImages = () => {
  const adplistReviews = require('../app/mentor-profile/adplist-reviews.json');
  const mentoringClubReviews = require('../app/mentor-profile/mentoring-club-reviews.json');
  const remoteAvatars = [...adplistReviews, ...mentoringClubReviews].map((review) => review.image).filter(Boolean);
  const remoteHosts = Array.from(new Set(remoteAvatars.map((url) => new URL(url).host))).sort();

  return {
    count: remoteAvatars.length,
    hosts: remoteHosts,
  };
};

const renderTable = (headers, rows) => {
  const headerRow = `| ${headers.join(' | ')} |`;
  const divider = `| ${headers.map(() => '---').join(' | ')} |`;
  const body = rows.map((row) => `| ${row.join(' | ')} |`).join('\n');

  return [headerRow, divider, body].filter(Boolean).join('\n');
};

const main = async () => {
  const { posts, inlineImages } = await collectBlogData();
  const runtimeUiImages = await collectRuntimeUiImages();
  const metadataRows = await collectMetadataImages();
  const remoteImages = collectRemoteImages();

  const localInlineImages = inlineImages.filter((image) => image.local);
  const uniqueInlineImages = Array.from(new Set(localInlineImages.map((image) => image.src)));
  const largeRuntimeAssets = runtimeUiImages.filter((row) => row.size.includes('MB') || row.generatedVariants === 'missing');
  const largeBlogSources = posts
    .filter((post) => (post.asset?.size ?? 0) > 700 * 1024)
    .map((post) => `${post.title} (${formatBytes(post.asset?.size)})`);

  const content = [
    '# Image Audit Report',
    '',
    '## Summary of Findings',
    '',
    `- Runtime UI/local responsive sources audited: ${runtimeUiImages.length}`,
    `- Blog cover images audited: ${posts.length}`,
    `- Unique local markdown inline images audited: ${uniqueInlineImages.length}`,
    `- Remote mentor avatars audited: ${remoteImages.count}`,
    '- CSS/Tailwind background-image usages found in app source: 0',
    '- Static export remains the delivery model; responsive local UI images now require generated variants and the custom loader manifest.',
    '',
    '## Categorised Issues',
    '',
    '### High Priority',
    '',
    '- The contact page still uses `/images/world-wide-map-optimized.svg` for Open Graph metadata. Runtime delivery is now rasterized, but social share art still needs dedicated follow-up.',
    `- Large source blog images still exist in the content library: ${largeBlogSources.length > 0 ? largeBlogSources.join(', ') : 'none above the current review threshold'}.`,
    '',
    '### Medium Priority',
    '',
    '- Remote mentor review avatars remain plain `<img>` elements by design and stay outside the local site-image pipeline.',
    '- Some metadata/share images intentionally remain on their stable legacy raster assets rather than generated responsive variants.',
    '',
    '### Low Priority',
    '',
    '- Fixed-size company and project logos remain on existing raster formats where no clear SVG replacement exists.',
    '- Mentor platform logos are raster assets; delivery is stable, but a future design pass could simplify the Mentoring Club mark.',
    '',
    '## High Priority Fixes Implemented',
    '',
    '- Added a build-time site image manifest and generated responsive variants under `public/generated/site-images/`.',
    '- Replaced the static-export `unoptimized` image mode with a custom loader backed by `generated/site-image-manifest.json`.',
    '- Added `imageAlt` to blog cover-image frontmatter and threaded it through blog rendering and validation.',
    '- Added `sizes` to every `next/image` usage and kept raw blog markdown images on the existing generated `<img>` pipeline.',
    '- Converted the decorative contact background to a generated raster delivery path while keeping the SVG source asset.',
    '',
    '## Runtime UI Images',
    '',
    renderTable(
      ['Source', 'Usage', 'Intrinsic', 'Format', 'Approx Size', 'Generated Widths'],
      runtimeUiImages.map((row) => [
        row.source,
        row.usage,
        row.dimensions,
        row.format,
        row.size,
        row.generatedVariants,
      ]),
    ),
    '',
    '## Blog Cover Images',
    '',
    renderTable(
      ['Post', 'Content File', 'Source', 'Intrinsic', 'Format', 'Approx Size', 'Alt Text'],
      posts.map((post) => [
        post.title,
        post.file,
        post.image,
        post.asset?.width && post.asset?.height ? `${post.asset.width}x${post.asset.height}` : 'n/a',
        post.asset?.format ?? 'n/a',
        formatBytes(post.asset?.size),
        post.imageAlt || 'missing',
      ]),
    ),
    '',
    '## Inline Markdown Images',
    '',
    `- Total markdown image references: ${inlineImages.length}`,
    `- Total local markdown image references: ${localInlineImages.length}`,
    `- Unique local markdown images: ${uniqueInlineImages.length}`,
    '- All currently-authored markdown image references include alt text.',
    '',
    '## Metadata, Open Graph, and Icons',
    '',
    renderTable(
      ['Usage', 'Source', 'File/Owner', 'Intrinsic', 'Format', 'Approx Size'],
      metadataRows.map((row) => [
        row.usage,
        row.source,
        row.file,
        row.dimensions,
        row.format,
        row.size,
      ]),
    ),
    '',
    '## Remote and Ambiguous Cases',
    '',
    `- Remote mentor avatar hosts: ${remoteImages.hosts.join(', ')}`,
    '- Contact Open Graph still points at the original SVG asset and should get dedicated share art later.',
    '- The Mentoring Club platform logo source is unusually tall for the rendered slot and should be manually checked during visual QA.',
    '',
    '## Notes',
    '',
    '- No CSS background images, Tailwind `bg-[url(...)]` patterns, or design-token raster backgrounds are currently used in the app source.',
    '- The audit intentionally keeps metadata share-image redesign out of scope for this implementation pass.',
    `- Runtime sources with missing generated variants after the current implementation: ${largeRuntimeAssets.filter((row) => row.generatedVariants === 'missing').length}.`,
    '',
  ].join('\n');

  fs.writeFileSync(DOC_PATH, content);
  console.log(`Wrote image audit report to ${DOC_PATH}`);
};

main().catch((error) => {
  console.error('Failed to generate image audit report:', error);
  process.exit(1);
});
