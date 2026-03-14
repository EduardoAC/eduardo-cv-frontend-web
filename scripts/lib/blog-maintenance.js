const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const topicsConfig = require('../../lib/blog/topics.json');

const blogConfig = require('../../lib/blog/config.json');

const ROOT_DIR = process.cwd();
const DEFAULT_BASE_URL = 'https://eduardo-aparicio-cardenes.website';
const POSTS_DIR = path.join(ROOT_DIR, 'content/posts');
const PUBLIC_DIR = path.join(ROOT_DIR, 'public');
const GENERATED_DIR = path.join(ROOT_DIR, 'generated');
const DIST_DIR = path.join(ROOT_DIR, 'dist');
const MANIFEST_PATH = path.join(GENERATED_DIR, 'blog-manifest.json');
const POSTS_ARTIFACT_PATH = path.join(GENERATED_DIR, 'blog-posts.json');
const SITEMAP_PATH = path.join(DIST_DIR, 'sitemap.xml');

const sortPostsByDate = (a, b) => (a.date < b.date ? 1 : -1);

const normalizeBaseUrl = (value = process.env.NEXT_PUBLIC_BASE_URL ?? DEFAULT_BASE_URL) =>
  String(value).replace(/\/$/, '');

const buildBlogArchivePath = (pageNumber = 1) => (pageNumber <= 1 ? '/blog' : `/blog/page/${pageNumber}`);

const buildTagArchivePath = (tagSlug, pageNumber = 1) =>
  pageNumber <= 1 ? `/blog/tag/${tagSlug}` : `/blog/tag/${tagSlug}/page/${pageNumber}`;

const buildTopicPath = (topicSlug, pageNumber = 1) =>
  pageNumber <= 1 ? `/blog/topics/${topicSlug}` : `/blog/topics/${topicSlug}/page/${pageNumber}`;
const buildAuthorPath = () => '/blog/author/eduardo-aparicio-cardenes';

const getPageCount = (totalItems) => Math.max(1, Math.ceil(totalItems / blogConfig.archivePageSize));

const listMarkdownPostFiles = () =>
  fs
    .readdirSync(POSTS_DIR)
    .filter((fileName) => fileName.endsWith('.md') && !fileName.startsWith('.'))
    .sort((a, b) => a.localeCompare(b));

const readMarkdownPost = (fileName) => {
  const fullPath = path.join(POSTS_DIR, fileName);
  const raw = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(raw);

  return {
    fileName,
    slug: fileName.replace(/\.md$/, ''),
    fullPath,
    raw,
    data,
    content,
  };
};

const loadManifest = () => {
  if (!fs.existsSync(MANIFEST_PATH)) {
    throw new Error(`Missing generated manifest: ${MANIFEST_PATH}`);
  }

  const manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8'));
  return Array.isArray(manifest) ? manifest.sort(sortPostsByDate) : [];
};

const loadPostArtifacts = () => {
  if (!fs.existsSync(POSTS_ARTIFACT_PATH)) {
    throw new Error(`Missing generated post artifacts: ${POSTS_ARTIFACT_PATH}`);
  }

  return JSON.parse(fs.readFileSync(POSTS_ARTIFACT_PATH, 'utf8'));
};

const slugifyTag = (value) =>
  String(value ?? '')
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const hashTag = (value) => {
  let hash = 0;

  for (const character of String(value ?? '')) {
    hash = (hash * 31 + character.charCodeAt(0)) >>> 0;
  }

  return hash.toString(36).slice(0, 6);
};

const createStableTagSlugMap = (tags) => {
  const tagToSlug = new Map();
  const usedSlugs = new Map();

  for (const tag of [...tags].sort((a, b) => a.localeCompare(b))) {
    const baseSlug = slugifyTag(tag) || `tag-${hashTag(tag)}`;
    let candidate = baseSlug;
    let attempt = 1;

    while (usedSlugs.has(candidate) && usedSlugs.get(candidate) !== tag) {
      candidate = `${baseSlug}-${hashTag(`${tag}-${attempt}`)}`;
      attempt += 1;
    }

    usedSlugs.set(candidate, tag);
    tagToSlug.set(tag, candidate);
  }

  return tagToSlug;
};

const getQualifyingTagArchives = (posts) => {
  const postsByTag = new Map();

  for (const post of posts) {
    for (const tag of post.tags ?? []) {
      const taggedPosts = postsByTag.get(tag) ?? [];
      taggedPosts.push(post);
      postsByTag.set(tag, taggedPosts);
    }
  }

  const qualifyingTags = Array.from(postsByTag.entries())
    .filter(([, taggedPosts]) => taggedPosts.length >= blogConfig.minTagArchivePosts)
    .sort((a, b) => b[1].length - a[1].length || a[0].localeCompare(b[0]));

  const slugMap = createStableTagSlugMap(qualifyingTags.map(([tag]) => tag));

  return qualifyingTags.map(([tag, taggedPosts]) => ({
    tag,
    slug: slugMap.get(tag) ?? slugifyTag(tag),
    count: taggedPosts.length,
    totalPages: getPageCount(taggedPosts.length),
    latestPostDate: taggedPosts[0]?.date,
    posts: taggedPosts,
  }));
};

const getExpectedBlogRoutes = (posts) => {
  const archiveRoutes = Array.from({ length: getPageCount(posts.length) }, (_, index) =>
    buildBlogArchivePath(index + 1),
  );
  const authorRoutes = [buildAuthorPath()];
  const topicRoutes = (topicsConfig.topics ?? []).flatMap((topic) => {
    const topicPostCount = posts.filter((post) => post.topicSlug === topic.slug).length;

    return Array.from({ length: getPageCount(topicPostCount) }, (_, index) =>
      buildTopicPath(topic.slug, index + 1),
    );
  });
  const tagRoutes = getQualifyingTagArchives(posts).flatMap((tagArchive) =>
    Array.from({ length: tagArchive.totalPages }, (_, index) =>
      buildTagArchivePath(tagArchive.slug, index + 1),
    ),
  );
  const articleRoutes = posts.map((post) => `/blog/${post.slug}`);

  return {
    archiveRoutes,
    authorRoutes,
    topicRoutes,
    tagRoutes,
    articleRoutes,
    allRoutes: [...archiveRoutes, ...authorRoutes, ...topicRoutes, ...tagRoutes, ...articleRoutes],
  };
};

const routeToExportHtmlPath = (routePath) => {
  const normalizedPath = routePath === '/' ? 'index' : routePath.replace(/^\//, '');
  return path.join(DIST_DIR, `${normalizedPath}.html`);
};

const routeToAbsoluteUrl = (routePath, baseUrl = normalizeBaseUrl()) =>
  `${baseUrl}${routePath === '/' ? '' : routePath}`;

const walkFiles = (directoryPath, predicate = () => true, collected = []) => {
  if (!fs.existsSync(directoryPath)) {
    return collected;
  }

  for (const entry of fs.readdirSync(directoryPath, { withFileTypes: true })) {
    const entryPath = path.join(directoryPath, entry.name);

    if (entry.isDirectory()) {
      walkFiles(entryPath, predicate, collected);
      continue;
    }

    if (predicate(entryPath, entry)) {
      collected.push(entryPath);
    }
  }

  return collected;
};

const routeFromDistHtmlPath = (filePath) => {
  const relativePath = path.relative(DIST_DIR, filePath).replace(/\\/g, '/');
  return `/${relativePath.replace(/\.html$/, '')}`.replace(/\/index$/, '') || '/';
};

const stripHtml = (value) =>
  String(value ?? '')
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ');

const normalizeWhitespace = (value) => String(value ?? '').replace(/\s+/g, ' ').trim();

const getTextExcerptFromHtml = (html, maxLength = 140) => {
  const plainText = normalizeWhitespace(stripHtml(html));
  return plainText.slice(0, maxLength);
};

const parseSitemapUrls = (xml) =>
  new Set(Array.from(xml.matchAll(/<loc>([^<]+)<\/loc>/g), (match) => match[1]));

const formatBytes = (bytes) => {
  if (!Number.isFinite(bytes)) {
    return '0 B';
  }

  if (bytes < 1024) {
    return `${bytes} B`;
  }

  const units = ['KB', 'MB', 'GB'];
  let size = bytes;
  let unitIndex = -1;

  do {
    size /= 1024;
    unitIndex += 1;
  } while (size >= 1024 && unitIndex < units.length - 1);

  return `${size.toFixed(size >= 10 ? 0 : 1)} ${units[unitIndex]}`;
};

const resolvePublicFileFromUrl = (assetPath) => {
  if (typeof assetPath !== 'string' || !assetPath.startsWith('/') || assetPath.startsWith('//')) {
    return null;
  }

  return path.join(PUBLIC_DIR, assetPath.replace(/^\//, ''));
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

const collectNextStaticAssetsFromHtml = (html) =>
  Array.from(new Set(Array.from(html.matchAll(/(?:src|href)="(\/_next\/static\/[^"]+)"/g), (match) => match[1])));

module.exports = {
  blogConfig,
  DEFAULT_BASE_URL,
  POSTS_DIR,
  PUBLIC_DIR,
  DIST_DIR,
  MANIFEST_PATH,
  POSTS_ARTIFACT_PATH,
  SITEMAP_PATH,
  normalizeBaseUrl,
  buildBlogArchivePath,
  buildTopicPath,
  buildTagArchivePath,
  listMarkdownPostFiles,
  readMarkdownPost,
  loadManifest,
  loadPostArtifacts,
  getPageCount,
  getQualifyingTagArchives,
  getExpectedBlogRoutes,
  routeToExportHtmlPath,
  routeToAbsoluteUrl,
  walkFiles,
  routeFromDistHtmlPath,
  stripHtml,
  normalizeWhitespace,
  getTextExcerptFromHtml,
  parseSitemapUrls,
  formatBytes,
  resolvePublicFileFromUrl,
  extractMarkdownImages,
  collectNextStaticAssetsFromHtml,
};
