#!/usr/bin/env node

const fs = require('fs');
const topicsConfig = require('../lib/blog/topics.json');

const {
  blogConfig,
  extractMarkdownImages,
  formatBytes,
  listMarkdownPostFiles,
  loadManifest,
  loadPostArtifacts,
  readMarkdownPost,
  resolvePublicFileFromUrl,
} = require('./lib/blog-maintenance');

const errors = [];
const warnings = [];
const warnedImages = new Set();
const warnedContentIssues = new Set();
const knownTopicSlugs = new Set((topicsConfig.topics ?? []).map((topic) => topic.slug));
const topicNameBySlug = new Map((topicsConfig.topics ?? []).map((topic) => [topic.slug, topic.name]));

const addError = (message) => {
  errors.push(message);
  console.error(`ERROR ${message}`);
};

const addWarning = (message) => {
  warnings.push(message);
  console.warn(`WARN  ${message}`);
};

const addDedupedWarning = (key, message) => {
  if (warnedContentIssues.has(key)) {
    return;
  }

  warnedContentIssues.add(key);
  addWarning(message);
};

const validateGeneratedImageContext = (slug, contextName, context) => {
  if (!context) {
    addError(`${slug}: missing generated ${contextName} image context.`);
    return;
  }

  if (!context.src || !context.srcSet || !context.width || !context.height) {
    addError(`${slug}: incomplete ${contextName} image metadata in the generated manifest.`);
  }

  for (const variant of context.variants ?? []) {
    const variantPath = resolvePublicFileFromUrl(variant.src);

    if (!variantPath || !fs.existsSync(variantPath)) {
      addError(`${slug}: generated ${contextName} variant is missing on disk (${variant.src}).`);
    }
  }
};

const maybeWarnForSourceImage = (ownerSlug, imagePath) => {
  const absolutePath = resolvePublicFileFromUrl(imagePath);

  if (!absolutePath || warnedImages.has(absolutePath) || !fs.existsSync(absolutePath)) {
    return;
  }

  warnedImages.add(absolutePath);

  const fileSize = fs.statSync(absolutePath).size;

  if (fileSize > blogConfig.performanceBudgets.sourceImageWarningBytes) {
    addWarning(
      `${ownerSlug}: source image ${imagePath} is ${formatBytes(fileSize)}. Consider compressing or converting it before the next content update.`,
    );
  }
};

const validateMarkdownPost = (post, manifestBySlug, postArtifactsBySlug, knownSlugs) => {
  const { fileName, slug, fullPath, data, content } = post;
  const manifestEntry = manifestBySlug.get(slug);
  const artifact = postArtifactsBySlug[slug];

  if (!/^[a-z0-9-]+$/.test(slug)) {
    addError(`${fileName}: file name must stay lowercase kebab-case because it becomes the route slug.`);
  }

  if (typeof data.title !== 'string' || !data.title.trim()) {
    addError(`${fileName}: missing required frontmatter field "title".`);
  }

  if (typeof data.description !== 'string' || !data.description.trim()) {
    addError(`${fileName}: missing required frontmatter field "description".`);
  }

  if (typeof data.author !== 'string' || !data.author.trim()) {
    addError(`${fileName}: missing required frontmatter field "author".`);
  }

  if (typeof data.date !== 'string' || Number.isNaN(Date.parse(data.date))) {
    addError(`${fileName}: frontmatter date must be a valid ISO-like date string.`);
  }

  if (!Array.isArray(data.tags) || data.tags.length === 0) {
    addError(`${fileName}: missing required frontmatter field "tags".`);
  }

  if (typeof data.topic !== 'string' || !data.topic.trim()) {
    addError(`${fileName}: missing required frontmatter field "topic".`);
  }

  if (typeof data.topicSlug !== 'string' || !data.topicSlug.trim()) {
    addError(`${fileName}: missing required frontmatter field "topicSlug".`);
  } else if (!knownTopicSlugs.has(data.topicSlug)) {
    addError(`${fileName}: topicSlug "${data.topicSlug}" is not part of the topic configuration.`);
  } else if (typeof data.topic === 'string' && data.topic !== topicNameBySlug.get(data.topicSlug)) {
    addError(`${fileName}: topic "${data.topic}" does not match configured topic "${topicNameBySlug.get(data.topicSlug)}".`);
  }

  if (typeof data.summary === 'string' && !data.summary.trim()) {
    addError(`${fileName}: optional frontmatter field "summary" must not be empty when present.`);
  }

  if (typeof data.contentType === 'string' && !data.contentType.trim()) {
    addError(`${fileName}: optional frontmatter field "contentType" must not be empty when present.`);
  }

  if (typeof data.featured !== 'undefined' && typeof data.featured !== 'boolean') {
    addError(`${fileName}: optional frontmatter field "featured" must be a boolean when present.`);
  }

  if (typeof data.series !== 'undefined' && (typeof data.series !== 'string' || !data.series.trim())) {
    addError(`${fileName}: optional frontmatter field "series" must be a non-empty string when present.`);
  }

  if (typeof data.seriesOrder !== 'undefined') {
    if (!Number.isInteger(data.seriesOrder) || data.seriesOrder < 1) {
      addError(`${fileName}: optional frontmatter field "seriesOrder" must be a positive integer when present.`);
    }

    if (typeof data.series !== 'string' || !data.series.trim()) {
      addError(`${fileName}: seriesOrder requires a matching non-empty "series" field.`);
    }
  }

  if (data.slug && data.slug !== slug) {
    addError(`${fileName}: frontmatter slug does not match the file name slug.`);
  }

  if (typeof data.image === 'string') {
    if (typeof data.imageAlt !== 'string' || !data.imageAlt.trim()) {
      addError(`${fileName}: frontmatter image requires a non-empty "imageAlt" field.`);
    }

    const imagePath = resolvePublicFileFromUrl(data.image);

    if (!imagePath || !fs.existsSync(imagePath)) {
      addError(`${fileName}: frontmatter image does not exist at ${data.image}.`);
    } else {
      maybeWarnForSourceImage(slug, data.image);
    }
  }

  for (const imageReference of extractMarkdownImages(content)) {
    if (!imageReference.alt.trim()) {
      addDedupedWarning(
        `missing-alt:${fileName}:${imageReference.src}`,
        `${fileName}: markdown image ${imageReference.src} is missing alt text.`,
      );
    }

    if (/^https?:\/\/cdn-images-1\.medium\.com\//i.test(imageReference.src)) {
      addDedupedWarning(
        `medium-cdn:${fileName}:${imageReference.src}`,
        `${fileName}: markdown image ${imageReference.src} still points at Medium CDN instead of a local asset.`,
      );
    }

    const localImagePath = resolvePublicFileFromUrl(imageReference.src);

    if (!localImagePath) {
      continue;
    }

    if (!fs.existsSync(localImagePath)) {
      addError(`${fileName}: markdown image ${imageReference.src} does not exist.`);
      continue;
    }

    maybeWarnForSourceImage(slug, imageReference.src);
  }

  if (!manifestEntry) {
    addError(`${fileName}: missing generated manifest entry for slug "${slug}".`);
    return;
  }

  if (!artifact) {
    addError(`${fileName}: missing generated post artifact for slug "${slug}".`);
    return;
  }

  if (manifestEntry.slug !== slug || artifact.slug !== slug) {
    addError(`${fileName}: generated slug does not match the markdown file slug.`);
  }

  if (!manifestEntry.title || !manifestEntry.description || !manifestEntry.date || !manifestEntry.author) {
    addError(`${fileName}: generated manifest entry is missing required metadata.`);
  }

  if (!manifestEntry.summary || typeof manifestEntry.summary !== 'string') {
    addError(`${fileName}: generated manifest entry is missing summary metadata.`);
  }

  if (!Array.isArray(manifestEntry.tags) || manifestEntry.tags.length === 0) {
    addError(`${fileName}: generated manifest entry is missing tags.`);
  }

  if (typeof manifestEntry.topic !== 'string' || !manifestEntry.topic.trim()) {
    addError(`${fileName}: generated manifest entry is missing topic metadata.`);
  }

  if (typeof manifestEntry.topicSlug !== 'string' || !manifestEntry.topicSlug.trim()) {
    addError(`${fileName}: generated manifest entry is missing topicSlug metadata.`);
  }

  if (manifestEntry.topic !== data.topic) {
    addError(`${fileName}: generated manifest topic does not match markdown frontmatter.`);
  }

  if (manifestEntry.topicSlug !== data.topicSlug) {
    addError(`${fileName}: generated manifest topicSlug does not match markdown frontmatter.`);
  }

  if (typeof manifestEntry.contentType !== 'string' || !manifestEntry.contentType.trim()) {
    addError(`${fileName}: generated manifest entry is missing contentType metadata.`);
  }

  if (typeof manifestEntry.featured !== 'boolean') {
    addError(`${fileName}: generated manifest entry has invalid featured metadata.`);
  }

  if (!Number.isInteger(manifestEntry.readingTime) || manifestEntry.readingTime < 1) {
    addError(`${fileName}: generated manifest entry has an invalid reading time.`);
  }

  if (!artifact.html || typeof artifact.html !== 'string') {
    addError(`${fileName}: generated post artifact is missing rendered HTML.`);
  }

  if (!Array.isArray(artifact.toc)) {
    addError(`${fileName}: generated post artifact is missing a table of contents array.`);
  }

  if (!Array.isArray(artifact.inlineImages)) {
    addError(`${fileName}: generated post artifact is missing inline image metadata.`);
  }

  if (manifestEntry.image) {
    if (typeof manifestEntry.imageAlt !== 'string' || !manifestEntry.imageAlt.trim()) {
      addError(`${fileName}: manifest image is missing imageAlt metadata.`);
    }

    if (!manifestEntry.imageWidth || !manifestEntry.imageHeight) {
      addError(`${fileName}: manifest image is missing intrinsic width/height metadata.`);
    }

    if (!manifestEntry.coverImage || manifestEntry.coverImage.source !== manifestEntry.image) {
      addError(`${fileName}: manifest image is missing its generated responsive cover image record.`);
    } else {
      validateGeneratedImageContext(slug, 'card', manifestEntry.coverImage.contexts?.card);
      validateGeneratedImageContext(slug, 'hero', manifestEntry.coverImage.contexts?.hero);
      validateGeneratedImageContext(slug, 'related', manifestEntry.coverImage.contexts?.related);
    }
  }

  const localMarkdownImages = extractMarkdownImages(content).filter((imageReference) =>
    Boolean(resolvePublicFileFromUrl(imageReference.src)),
  );
  const inlineImageMetaBySource = new Map(
    (artifact.inlineImages ?? []).map((imageMeta) => [imageMeta.source, imageMeta]),
  );

  for (const imageReference of localMarkdownImages) {
    const inlineImageMeta = inlineImageMetaBySource.get(imageReference.src);

    if (!inlineImageMeta) {
      addError(`${fileName}: generated post artifact is missing inline metadata for ${imageReference.src}.`);
      continue;
    }

    if (!inlineImageMeta.contexts?.inline) {
      addError(`${fileName}: generated post artifact is missing the inline responsive context for ${imageReference.src}.`);
    }
  }

  const relatedSlugs = Array.isArray(manifestEntry.relatedSlugs) ? manifestEntry.relatedSlugs : [];

  for (const relatedSlug of relatedSlugs) {
    if (!knownSlugs.has(relatedSlug)) {
      addError(`${fileName}: related post "${relatedSlug}" does not exist.`);
    }

    if (relatedSlug === slug) {
      addError(`${fileName}: related posts must not include the current post.`);
    }
  }
};

const main = () => {
  console.log('Blog content validation');

  let manifest;
  let postArtifactsBySlug;

  try {
    manifest = loadManifest();
    postArtifactsBySlug = loadPostArtifacts();
  } catch (error) {
    addError(error instanceof Error ? error.message : String(error));
    process.exit(1);
  }

  const markdownPosts = listMarkdownPostFiles().map(readMarkdownPost);
  const manifestBySlug = new Map(manifest.map((entry) => [entry.slug, entry]));
  const knownSlugs = new Set(manifest.map((entry) => entry.slug));

  if (manifest.length !== markdownPosts.length) {
    addError(
      `Generated manifest count (${manifest.length}) does not match markdown post count (${markdownPosts.length}).`,
    );
  }

  if (knownSlugs.size !== manifest.length) {
    addError('Generated manifest contains duplicate slugs.');
  }

  const artifactSlugs = Object.keys(postArtifactsBySlug);

  for (const artifactSlug of artifactSlugs) {
    if (!knownSlugs.has(artifactSlug)) {
      addError(`Generated post artifact "${artifactSlug}" does not have a matching manifest entry.`);
    }
  }

  for (const markdownPost of markdownPosts) {
    validateMarkdownPost(markdownPost, manifestBySlug, postArtifactsBySlug, knownSlugs);
  }

  const summary = `Validation finished with ${errors.length} error(s) and ${warnings.length} warning(s).`;

  if (errors.length > 0) {
    console.error(summary);
    process.exit(1);
  }

  console.log(summary);
};

main();
