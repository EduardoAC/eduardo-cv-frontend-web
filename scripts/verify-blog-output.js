#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const {
  blogConfig,
  collectNextStaticAssetsFromHtml,
  DIST_DIR,
  formatBytes,
  getExpectedBlogRoutes,
  getTextExcerptFromHtml,
  loadManifest,
  loadPostArtifacts,
  normalizeBaseUrl,
  normalizeWhitespace,
  parseSitemapUrls,
  routeFromDistHtmlPath,
  routeToAbsoluteUrl,
  routeToExportHtmlPath,
  SITEMAP_PATH,
  stripHtml,
  walkFiles,
} = require('./lib/blog-maintenance');

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

const validateCanonical = (routePath, html, baseUrl) => {
  const expectedCanonical = routeToAbsoluteUrl(routePath, baseUrl);
  const canonicalMatch = html.match(/<link rel="canonical" href="([^"]+)"/i);

  if (!canonicalMatch) {
    addError(`${routePath}: missing canonical link in exported HTML.`);
    return;
  }

  if (canonicalMatch[1] !== expectedCanonical) {
    addError(`${routePath}: canonical link mismatch. Expected ${expectedCanonical}, received ${canonicalMatch[1]}.`);
  }
};

const validateHtmlBudget = (routePath, htmlFilePath, warningBytes) => {
  const size = fs.statSync(htmlFilePath).size;

  if (size > warningBytes) {
    addWarning(`${routePath}: exported HTML is ${formatBytes(size)}, above the warning threshold of ${formatBytes(warningBytes)}.`);
  }
};

const getPageAssetBytes = (html) =>
  collectNextStaticAssetsFromHtml(html).reduce((totalSize, assetPath) => {
    const absoluteAssetPath = path.join(DIST_DIR, assetPath.replace(/^\//, ''));

    if (!fs.existsSync(absoluteAssetPath)) {
      return totalSize;
    }

    return totalSize + fs.statSync(absoluteAssetPath).size;
  }, 0);

const validateExportedArticle = (post, articleHtml, baseUrl, postArtifactsBySlug) => {
  const routePath = `/blog/${post.slug}`;
  const renderedText = normalizeWhitespace(stripHtml(articleHtml));
  const expectedExcerpt = getTextExcerptFromHtml(postArtifactsBySlug[post.slug]?.html ?? '', 160);

  if (!expectedExcerpt || !renderedText.includes(expectedExcerpt)) {
    addError(`${routePath}: exported HTML is missing the pre-rendered article body excerpt.`);
  }

  if (post.image) {
    const heroImageMatch = articleHtml.match(/<img[^>]*fetchpriority="high"[^>]*>/i);

    if (!heroImageMatch) {
      addError(`${routePath}: missing eager hero image in exported HTML.`);
    } else {
      const heroTag = heroImageMatch[0];

      if (!/width="\d+"/i.test(heroTag) || !/height="\d+"/i.test(heroTag)) {
        addError(`${routePath}: hero image is missing intrinsic width/height in exported HTML.`);
      }
    }
  }

  validateCanonical(routePath, articleHtml, baseUrl);
  validateHtmlBudget(routePath, routeToExportHtmlPath(routePath), blogConfig.performanceBudgets.articleHtmlWarningBytes);
};

const main = () => {
  console.log('Blog export verification');

  let manifest;
  let postArtifactsBySlug;

  try {
    manifest = loadManifest();
    postArtifactsBySlug = loadPostArtifacts();
  } catch (error) {
    addError(error instanceof Error ? error.message : String(error));
    process.exit(1);
  }

  if (!fs.existsSync(DIST_DIR)) {
    addError(`Missing export directory: ${DIST_DIR}`);
    process.exit(1);
  }

  if (!fs.existsSync(SITEMAP_PATH)) {
    addError(`Missing generated sitemap: ${SITEMAP_PATH}`);
    process.exit(1);
  }

  const baseUrl = normalizeBaseUrl();
  const expectedRoutes = getExpectedBlogRoutes(manifest);
  const expectedBlogRouteSet = new Set(expectedRoutes.allRoutes);

  for (const routePath of expectedRoutes.archiveRoutes) {
    const htmlPath = routeToExportHtmlPath(routePath);

    if (!fs.existsSync(htmlPath)) {
      addError(`${routePath}: missing exported archive HTML file.`);
      continue;
    }

    const archiveHtml = fs.readFileSync(htmlPath, 'utf8');
    validateCanonical(routePath, archiveHtml, baseUrl);
    validateHtmlBudget(routePath, htmlPath, blogConfig.performanceBudgets.archiveHtmlWarningBytes);
  }

  for (const routePath of expectedRoutes.topicRoutes) {
    const htmlPath = routeToExportHtmlPath(routePath);

    if (!fs.existsSync(htmlPath)) {
      addError(`${routePath}: missing exported topic hub HTML file.`);
      continue;
    }

    const topicHtml = fs.readFileSync(htmlPath, 'utf8');
    validateCanonical(routePath, topicHtml, baseUrl);
    validateHtmlBudget(routePath, htmlPath, blogConfig.performanceBudgets.archiveHtmlWarningBytes);
  }

  for (const routePath of expectedRoutes.tagRoutes) {
    const htmlPath = routeToExportHtmlPath(routePath);

    if (!fs.existsSync(htmlPath)) {
      addError(`${routePath}: missing exported tag archive HTML file.`);
      continue;
    }

    const tagArchiveHtml = fs.readFileSync(htmlPath, 'utf8');
    validateCanonical(routePath, tagArchiveHtml, baseUrl);
    validateHtmlBudget(routePath, htmlPath, blogConfig.performanceBudgets.archiveHtmlWarningBytes);
  }

  const actualTagRouteFiles = walkFiles(
    path.join(DIST_DIR, 'blog/tag'),
    (filePath) => filePath.endsWith('.html'),
  );
  const actualTagRoutes = new Set(actualTagRouteFiles.map(routeFromDistHtmlPath));
  const actualTopicRouteFiles = walkFiles(
    path.join(DIST_DIR, 'blog/topics'),
    (filePath) => filePath.endsWith('.html'),
  );
  const actualTopicRoutes = new Set(actualTopicRouteFiles.map(routeFromDistHtmlPath));

  for (const routePath of expectedRoutes.topicRoutes) {
    if (!actualTopicRoutes.has(routePath)) {
      addError(`${routePath}: topic hub route was not exported.`);
    }
  }

  for (const routePath of actualTopicRoutes) {
    if (!expectedRoutes.topicRoutes.includes(routePath)) {
      addError(`${routePath}: exported topic hub route is not part of the configured topic set.`);
    }
  }

  for (const routePath of expectedRoutes.tagRoutes) {
    if (!actualTagRoutes.has(routePath)) {
      addError(`${routePath}: qualifying tag archive route was not exported.`);
    }
  }

  for (const routePath of actualTagRoutes) {
    if (!expectedRoutes.tagRoutes.includes(routePath)) {
      addError(`${routePath}: exported tag archive route is not part of the qualifying tag set.`);
    }
  }

  for (const post of manifest) {
    const routePath = `/blog/${post.slug}`;
    const htmlPath = routeToExportHtmlPath(routePath);

    if (!fs.existsSync(htmlPath)) {
      addError(`${routePath}: missing exported article HTML file.`);
      continue;
    }

    const articleHtml = fs.readFileSync(htmlPath, 'utf8');
    validateExportedArticle(post, articleHtml, baseUrl, postArtifactsBySlug);
  }

  const sitemapUrls = parseSitemapUrls(fs.readFileSync(SITEMAP_PATH, 'utf8'));
  const expectedSitemapUrls = new Set(
    expectedRoutes.allRoutes.map((routePath) => routeToAbsoluteUrl(routePath, baseUrl)),
  );

  for (const expectedUrl of expectedSitemapUrls) {
    if (!sitemapUrls.has(expectedUrl)) {
      addError(`Sitemap is missing ${expectedUrl}.`);
    }
  }

  for (const sitemapUrl of sitemapUrls) {
    if (sitemapUrl.startsWith(`${baseUrl}/blog`) && !expectedSitemapUrls.has(sitemapUrl)) {
      addError(`Sitemap includes an unexpected blog URL: ${sitemapUrl}.`);
    }
  }

  let largestAssetBudget = { routePath: '', bytes: 0 };

  for (const routePath of expectedRoutes.allRoutes) {
    const htmlPath = routeToExportHtmlPath(routePath);

    if (!fs.existsSync(htmlPath)) {
      continue;
    }

    const assetBytes = getPageAssetBytes(fs.readFileSync(htmlPath, 'utf8'));

    if (assetBytes > largestAssetBudget.bytes) {
      largestAssetBudget = {
        routePath,
        bytes: assetBytes,
      };
    }

    if (assetBytes > blogConfig.performanceBudgets.pageAssetWarningBytes) {
      addWarning(
        `${routePath}: referenced blog route assets total ${formatBytes(assetBytes)}, above the warning threshold of ${formatBytes(blogConfig.performanceBudgets.pageAssetWarningBytes)}.`,
      );
    }
  }

  if (largestAssetBudget.routePath) {
    console.log(
      `Largest referenced blog route asset total: ${largestAssetBudget.routePath} -> ${formatBytes(largestAssetBudget.bytes)}.`,
    );
  }

  const summary = `Verification finished with ${errors.length} error(s) and ${warnings.length} warning(s).`;

  if (errors.length > 0) {
    console.error(summary);
    process.exit(1);
  }

  console.log(summary);
};

main();
