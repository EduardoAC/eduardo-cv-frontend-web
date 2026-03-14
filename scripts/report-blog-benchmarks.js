#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const {
  blogConfig,
  collectNextStaticAssetsFromHtml,
  DIST_DIR,
  extractMarkdownImages,
  formatBytes,
  getExpectedBlogRoutes,
  getQualifyingTagArchives,
  loadManifest,
  normalizeBaseUrl,
  parseSitemapUrls,
  readMarkdownPost,
  resolvePublicFileFromUrl,
  routeToAbsoluteUrl,
  routeToExportHtmlPath,
  SITEMAP_PATH,
  walkFiles,
  listMarkdownPostFiles,
} = require('./lib/blog-maintenance');

const DEFAULT_REPRESENTATIVE_SLUG = 'when-android-webview-breaks-first-oversized-cookies-redirects-and-a-silent-400';
const GENERATED_BLOG_IMAGES_DIR = path.join(process.cwd(), 'public', 'generated', 'blog-images');
const MEDIUM_CDN_PATTERN = /^https?:\/\/cdn-images-1\.medium\.com\//i;

const getFileSize = (filePath) => fs.statSync(filePath).size;

const readRouteHtml = (routePath) => {
  const htmlPath = routeToExportHtmlPath(routePath);

  if (!fs.existsSync(htmlPath)) {
    throw new Error(`Missing exported HTML for route ${routePath} at ${htmlPath}`);
  }

  return {
    routePath,
    htmlPath,
    html: fs.readFileSync(htmlPath, 'utf8'),
    bytes: getFileSize(htmlPath),
  };
};

const collectReferencedStaticAssets = (html) => {
  const assets = collectNextStaticAssetsFromHtml(html)
    .map((assetPath) => {
      const absolutePath = path.join(DIST_DIR, assetPath.replace(/^\//, ''));

      if (!fs.existsSync(absolutePath)) {
        return null;
      }

      return {
        assetPath,
        absolutePath,
        bytes: getFileSize(absolutePath),
        extension: path.extname(assetPath),
      };
    })
    .filter(Boolean);

  const summarize = (extensionMatcher) =>
    assets
      .filter((asset) => extensionMatcher(asset.extension, asset.assetPath))
      .reduce(
        (summary, asset) => {
          summary.count += 1;
          summary.bytes += asset.bytes;
          return summary;
        },
        { count: 0, bytes: 0 },
      );

  return {
    totalCount: assets.length,
    totalBytes: assets.reduce((total, asset) => total + asset.bytes, 0),
    js: summarize((extension) => extension === '.js'),
    css: summarize((extension) => extension === '.css'),
    fonts: summarize((extension) => extension === '.woff2'),
    other: summarize((extension, assetPath) => !['.js', '.css', '.woff2'].includes(extension) && !assetPath.endsWith('.map')),
  };
};

const collectArticleHtmlSizes = (articleRoutes) =>
  articleRoutes
    .map((routePath) => {
      const htmlPath = routeToExportHtmlPath(routePath);
      return {
        routePath,
        htmlPath,
        bytes: getFileSize(htmlPath),
      };
    })
    .sort((a, b) => a.bytes - b.bytes);

const getAverage = (values) =>
  values.length === 0 ? 0 : Math.round(values.reduce((total, value) => total + value, 0) / values.length);

const classifyGeneratedImage = (filePath) => {
  const match = filePath.match(/-(card|hero|inline)-\d+\.webp$/);
  return match ? match[1] : 'other';
};

const collectGeneratedImageSummary = () => {
  const files = walkFiles(GENERATED_BLOG_IMAGES_DIR, (filePath) => filePath.endsWith('.webp'));
  const summary = {
    totalCount: files.length,
    totalBytes: 0,
    byContext: {
      card: { count: 0, bytes: 0 },
      hero: { count: 0, bytes: 0 },
      inline: { count: 0, bytes: 0 },
      other: { count: 0, bytes: 0 },
    },
    largest: null,
  };

  for (const filePath of files) {
    const bytes = getFileSize(filePath);
    const context = classifyGeneratedImage(filePath);

    summary.totalBytes += bytes;
    summary.byContext[context].count += 1;
    summary.byContext[context].bytes += bytes;

    if (!summary.largest || bytes > summary.largest.bytes) {
      summary.largest = {
        filePath,
        relativePath: path.relative(process.cwd(), filePath),
        bytes,
      };
    }
  }

  return summary;
};

const collectSourceImageSummary = () => {
  const referencedLocalImages = new Map();
  const mediumCdnImages = [];

  for (const fileName of listMarkdownPostFiles()) {
    const markdownPost = readMarkdownPost(fileName);
    const referencedImages = new Set();

    if (typeof markdownPost.data.image === 'string') {
      referencedImages.add(markdownPost.data.image);
    }

    for (const imageReference of extractMarkdownImages(markdownPost.content)) {
      if (MEDIUM_CDN_PATTERN.test(imageReference.src)) {
        mediumCdnImages.push({
          slug: markdownPost.slug,
          src: imageReference.src,
        });
      }

      referencedImages.add(imageReference.src);
    }

    for (const imagePath of referencedImages) {
      const absolutePath = resolvePublicFileFromUrl(imagePath);

      if (!absolutePath || !fs.existsSync(absolutePath)) {
        continue;
      }

      const existing = referencedLocalImages.get(absolutePath);
      const owners = existing?.owners ?? new Set();
      owners.add(markdownPost.slug);

      referencedLocalImages.set(absolutePath, {
        imagePath,
        absolutePath,
        bytes: getFileSize(absolutePath),
        owners,
      });
    }
  }

  const sortedLocalImages = Array.from(referencedLocalImages.values())
    .map((entry) => ({
      ...entry,
      owners: Array.from(entry.owners).sort(),
    }))
    .sort((a, b) => b.bytes - a.bytes);

  return {
    uniqueLocalCount: sortedLocalImages.length,
    oversizedCount: sortedLocalImages.filter((image) => image.bytes > blogConfig.performanceBudgets.sourceImageWarningBytes).length,
    mediumCdnCount: mediumCdnImages.length,
    mediumCdnPostCount: new Set(mediumCdnImages.map((image) => image.slug)).size,
    largestLocalImages: sortedLocalImages.slice(0, 5),
  };
};

const buildSitemapCoverageSummary = (expectedRoutes, sitemapUrls, baseUrl) => {
  const countCoverage = (routePaths) =>
    routePaths.filter((routePath) => sitemapUrls.has(routeToAbsoluteUrl(routePath, baseUrl))).length;

  return {
    blogUrlCount: Array.from(sitemapUrls).filter((url) => url.startsWith(`${baseUrl}/blog`)).length,
    articles: {
      expected: expectedRoutes.articleRoutes.length,
      covered: countCoverage(expectedRoutes.articleRoutes),
    },
    archives: {
      expected: expectedRoutes.archiveRoutes.length,
      covered: countCoverage(expectedRoutes.archiveRoutes),
    },
    topics: {
      expected: expectedRoutes.topicRoutes.length,
      covered: countCoverage(expectedRoutes.topicRoutes),
    },
    tags: {
      expected: expectedRoutes.tagRoutes.length,
      covered: countCoverage(expectedRoutes.tagRoutes),
    },
  };
};

const countPostsReferencedInArchiveHtml = (archiveHtml, manifest) =>
  manifest.filter((post) => archiveHtml.includes(`/blog/${post.slug}`)).length;

const getRepresentativeChecks = (html) => ({
  hasCanonical: /<link rel="canonical" href="https?:\/\/[^"]+"/i.test(html),
  hasHeroImageDimensions: /<img[^>]+loading="eager"[^>]+fetchPriority="high"[^>]+width="\d+"[^>]+height="\d+"/i.test(html),
  hasPreRenderedMarkdown: /<div class="snap-markdown-content"><(p|h2|h3|ul|ol|blockquote|div)/i.test(html),
});

const printMetric = (label, value) => {
  console.log(`${label}: ${value}`);
};

const printAssetSummary = (label, summary) => {
  console.log(`${label}: ${formatBytes(summary.totalBytes)} across ${summary.totalCount} referenced /_next/static assets`);
  console.log(`  JS: ${formatBytes(summary.js.bytes)} across ${summary.js.count} files`);
  console.log(`  CSS: ${formatBytes(summary.css.bytes)} across ${summary.css.count} files`);
  console.log(`  Fonts: ${formatBytes(summary.fonts.bytes)} across ${summary.fonts.count} files`);
  if (summary.other.count > 0) {
    console.log(`  Other: ${formatBytes(summary.other.bytes)} across ${summary.other.count} files`);
  }
};

const main = () => {
  if (!fs.existsSync(DIST_DIR)) {
    throw new Error(`Missing export directory: ${DIST_DIR}. Run npm run build first.`);
  }

  if (!fs.existsSync(SITEMAP_PATH)) {
    throw new Error(`Missing sitemap file: ${SITEMAP_PATH}. Run npm run build first.`);
  }

  const baseUrl = normalizeBaseUrl();
  const manifest = loadManifest();
  const expectedRoutes = getExpectedBlogRoutes(manifest);
  const qualifyingTags = getQualifyingTagArchives(manifest);
  const sitemapUrls = parseSitemapUrls(fs.readFileSync(SITEMAP_PATH, 'utf8'));
  const archivePage = readRouteHtml('/blog');
  const representativePost = manifest.find((post) => post.slug === DEFAULT_REPRESENTATIVE_SLUG) ?? manifest[0];
  const representativeRoute = `/blog/${representativePost.slug}`;
  const representativePage = readRouteHtml(representativeRoute);
  const archiveAssets = collectReferencedStaticAssets(archivePage.html);
  const representativeAssets = collectReferencedStaticAssets(representativePage.html);
  const articleHtmlSizes = collectArticleHtmlSizes(expectedRoutes.articleRoutes);
  const generatedImageSummary = collectGeneratedImageSummary();
  const sourceImageSummary = collectSourceImageSummary();
  const sitemapCoverage = buildSitemapCoverageSummary(expectedRoutes, sitemapUrls, baseUrl);
  const representativeChecks = getRepresentativeChecks(representativePage.html);
  const largestArticle = articleHtmlSizes[articleHtmlSizes.length - 1];
  const smallestArticle = articleHtmlSizes[0];
  const averageArticleHtmlBytes = getAverage(articleHtmlSizes.map((article) => article.bytes));
  const additionalArchivePageCount = expectedRoutes.archiveRoutes.filter((routePath) => routePath !== '/blog').length;
  const topicPageCount = expectedRoutes.topicRoutes.length;
  const additionalTagPageCount = expectedRoutes.tagRoutes.filter((routePath) => /\/page\/\d+$/.test(routePath)).length;

  console.log('Blog benchmark report');
  printMetric('Base URL', baseUrl);
  printMetric('Posts', manifest.length);
  printMetric('Archive page size', blogConfig.archivePageSize);
  printMetric('Archive pages', `${expectedRoutes.archiveRoutes.length} total (${additionalArchivePageCount} paginated beyond /blog)`);
  printMetric('Topic pages', topicPageCount);
  printMetric('Qualifying tag archives', qualifyingTags.length);
  printMetric('Tag archive pages', `${expectedRoutes.tagRoutes.length} total (${additionalTagPageCount} paginated beyond page 1)`);
  printMetric('Posts linked from /blog', countPostsReferencedInArchiveHtml(archivePage.html, manifest));
  printMetric(
    'Sitemap blog coverage',
    `${sitemapCoverage.blogUrlCount} URLs (${sitemapCoverage.articles.covered}/${sitemapCoverage.articles.expected} articles, ${sitemapCoverage.archives.covered}/${sitemapCoverage.archives.expected} archives, ${sitemapCoverage.topics.covered}/${sitemapCoverage.topics.expected} topic pages, ${sitemapCoverage.tags.covered}/${sitemapCoverage.tags.expected} tag pages)`,
  );

  console.log('');
  console.log('Exported HTML');
  printMetric('/blog HTML', `${formatBytes(archivePage.bytes)} (${archivePage.bytes} bytes)`);
  printMetric(`${representativeRoute} HTML`, `${formatBytes(representativePage.bytes)} (${representativePage.bytes} bytes)`);
  printMetric('Average article HTML', `${formatBytes(averageArticleHtmlBytes)} (${averageArticleHtmlBytes} bytes)`);
  printMetric('Largest article HTML', `${largestArticle.routePath} -> ${formatBytes(largestArticle.bytes)} (${largestArticle.bytes} bytes)`);
  printMetric('Smallest article HTML', `${smallestArticle.routePath} -> ${formatBytes(smallestArticle.bytes)} (${smallestArticle.bytes} bytes)`);

  console.log('');
  console.log('Referenced static assets');
  printAssetSummary('/blog', archiveAssets);
  printAssetSummary(representativeRoute, representativeAssets);

  console.log('');
  console.log('Representative article checks');
  printMetric('Canonical link present', representativeChecks.hasCanonical ? 'yes' : 'no');
  printMetric('Hero image width/height present', representativeChecks.hasHeroImageDimensions ? 'yes' : 'no');
  printMetric('Pre-rendered markdown HTML present', representativeChecks.hasPreRenderedMarkdown ? 'yes' : 'no');

  console.log('');
  console.log('Generated blog image output');
  printMetric('Generated variants', `${generatedImageSummary.totalCount} files totaling ${formatBytes(generatedImageSummary.totalBytes)}`);
  printMetric('Card variants', `${generatedImageSummary.byContext.card.count} files totaling ${formatBytes(generatedImageSummary.byContext.card.bytes)}`);
  printMetric('Hero variants', `${generatedImageSummary.byContext.hero.count} files totaling ${formatBytes(generatedImageSummary.byContext.hero.bytes)}`);
  printMetric('Inline variants', `${generatedImageSummary.byContext.inline.count} files totaling ${formatBytes(generatedImageSummary.byContext.inline.bytes)}`);
  if (generatedImageSummary.byContext.other.count > 0) {
    printMetric('Other variants', `${generatedImageSummary.byContext.other.count} files totaling ${formatBytes(generatedImageSummary.byContext.other.bytes)}`);
  }
  if (generatedImageSummary.largest) {
    printMetric(
      'Largest generated variant',
      `${generatedImageSummary.largest.relativePath} -> ${formatBytes(generatedImageSummary.largest.bytes)}`,
    );
  }

  console.log('');
  console.log('Source image notes');
  printMetric('Unique local source images referenced by content', sourceImageSummary.uniqueLocalCount);
  printMetric(
    `Source images above ${formatBytes(blogConfig.performanceBudgets.sourceImageWarningBytes)}`,
    sourceImageSummary.oversizedCount,
  );
  printMetric(
    'Legacy Medium CDN markdown images',
    `${sourceImageSummary.mediumCdnCount} references across ${sourceImageSummary.mediumCdnPostCount} posts`,
  );
  if (sourceImageSummary.largestLocalImages.length > 0) {
    console.log('Largest referenced local source images:');
    for (const image of sourceImageSummary.largestLocalImages) {
      console.log(`  ${image.imagePath} -> ${formatBytes(image.bytes)} (${image.owners.join(', ')})`);
    }
  }
};

try {
  main();
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
}
