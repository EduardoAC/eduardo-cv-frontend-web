const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const Prism = require('prismjs');
const {
  buildResponsiveContext,
  getLocalImageMetadata,
  isLocalImagePath,
} = require('./lib/image-pipeline');

require('prismjs/components/prism-markup');
require('prismjs/components/prism-clike');
require('prismjs/components/prism-javascript');
require('prismjs/components/prism-typescript');
require('prismjs/components/prism-css');
require('prismjs/components/prism-scss');
require('prismjs/components/prism-json');
require('prismjs/components/prism-bash');
require('prismjs/components/prism-yaml');
require('prismjs/components/prism-sql');
require('prismjs/components/prism-nginx');
require('prismjs/components/prism-docker');
require('prismjs/components/prism-toml');

const postsDirectory = path.join(process.cwd(), 'content/posts');
const generatedDirectory = path.join(process.cwd(), 'generated');
const publicDirectory = path.join(process.cwd(), 'public');
const manifestPath = path.join(generatedDirectory, 'blog-manifest.json');
const postsArtifactPath = path.join(generatedDirectory, 'blog-posts.json');
const imageOutputDirectory = path.join(publicDirectory, 'generated', 'blog-images');
const wordsPerMinute = 200;

const IMAGE_CONTEXTS = {
  card: {
    widths: [480, 768, 1200],
    sizes: '(min-width: 1200px) 1100px, 100vw',
  },
  hero: {
    widths: [768, 1200, 1536],
    sizes: '(min-width: 1400px) 1290px, 100vw',
  },
  related: {
    widths: [320, 480, 640],
    sizes: '(min-width: 1200px) 360px, (min-width: 768px) 50vw, 100vw',
  },
  inline: {
    widths: [720, 1200],
    sizes: '(min-width: 1400px) 1200px, (min-width: 1024px) 960px, 100vw',
  },
};

const responsiveImageCache = new Map();

const calculateReadingTime = (content) => {
  const wordCount = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
};

const normalizeDate = (date) => {
  if (date instanceof Date) {
    return date.toISOString();
  }

  return typeof date === 'string' ? date : String(date ?? '');
};

const sortPostsByDate = (a, b) => (a.date < b.date ? 1 : -1);

const escapeHtml = (value) =>
  String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const escapeAttribute = (value) => escapeHtml(value).replace(/`/g, '&#96;');

const stripHtml = (value) => String(value ?? '').replace(/<[^>]+>/g, '');

const normaliseHorizontalRules = (content) => content.replace(/^([ \t]*\*[ \t]*){3,}$/gm, '---');

const preprocessMarkdown = (content) =>
  normaliseHorizontalRules(content).replace(
    /```gist:([a-zA-Z0-9_-]+\/[a-zA-Z0-9_-]+)```/g,
    (_, gistId) =>
      `<div class="snap-gist-placeholder" data-gist-id="${escapeAttribute(gistId)}"><a class="snap-link" href="https://gist.github.com/${escapeAttribute(gistId)}" target="_blank" rel="noopener noreferrer">View code example on GitHub Gist</a></div>`,
  );

const slugify = (value) =>
  String(value ?? '')
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');

const createSlugger = () => {
  const counts = new Map();

  return (value) => {
    const baseSlug = slugify(value) || 'section';
    const count = counts.get(baseSlug) ?? 0;
    counts.set(baseSlug, count + 1);

    return count === 0 ? baseSlug : `${baseSlug}-${count}`;
  };
};

const normaliseLanguage = (language) => {
  const normalized = String(language ?? '')
    .trim()
    .toLowerCase();

  const aliases = {
    js: 'javascript',
    ts: 'typescript',
    html: 'markup',
    xml: 'markup',
    shell: 'bash',
    sh: 'bash',
    yml: 'yaml',
    dockerfile: 'docker',
  };

  const prismLanguage = aliases[normalized] ?? normalized;

  return {
    prismLanguage: Prism.languages[prismLanguage] ? prismLanguage : 'text',
    label: normalized || 'text',
  };
};

const getImageClassInfo = (altText) => {
  const matches = String(altText ?? '').match(/\b(image-(?:small|medium|large|center|left|right))\b/g) ?? [];
  const cleanAltText = String(altText ?? '').replace(/\b(image-(?:small|medium|large|center|left|right))\b/g, '').replace(/\s+/g, ' ').trim();

  return {
    cleanAltText,
    className: ['snap-blog-image', ...matches.map((match) => `snap-blog-${match}`)].join(' ').trim(),
    sizeHint: matches.find((match) => match === 'image-small' || match === 'image-medium' || match === 'image-large'),
  };
};

const getInlineSizes = (sizeHint, fallbackSizes) => {
  if (sizeHint === 'image-small') {
    return '(min-width: 1024px) 180px, 50vw';
  }

  if (sizeHint === 'image-medium') {
    return '(min-width: 1024px) 540px, 100vw';
  }

  if (sizeHint === 'image-large') {
    return '(min-width: 1024px) 960px, 100vw';
  }

  return fallbackSizes;
};

const ensureResponsiveImageAsset = async (sourcePath, contextNames) => {
  if (!isLocalImagePath(sourcePath)) {
    return null;
  }

  const metadata = await getLocalImageMetadata(sourcePath);

  if (!metadata) {
    return null;
  }

  let asset = responsiveImageCache.get(sourcePath);

  if (!asset) {
    asset = {
      source: sourcePath,
      width: metadata.width,
      height: metadata.height,
      format: metadata.format,
      contexts: {},
    };
    responsiveImageCache.set(sourcePath, asset);
  }

  for (const contextName of contextNames) {
    if (!asset.contexts[contextName]) {
      const contextConfig = IMAGE_CONTEXTS[contextName];

      if (!contextConfig) {
        continue;
      }

      asset.contexts[contextName] = await buildResponsiveContext({
        sourcePath,
        widths: contextConfig.widths,
        sizes: contextConfig.sizes,
        outputSubdirectory: path.join('generated', 'blog-images'),
        variantName: contextName,
      });
    }
  }

  return asset;
};

const extractMarkdownImageReferences = (content) => {
  const matches = content.matchAll(/!\[[^\]]*]\(([^)\s]+)(?:\s+"[^"]*")?\)/g);
  return Array.from(new Set(Array.from(matches, (match) => match[1]).filter(Boolean)));
};

const transformCalloutBlockquotes = (html) =>
  html.replace(
    /<blockquote class="snap-blockquote">\s*<p><strong>(Note|Warning|Tip):<\/strong>\s*([\s\S]*?)<\/blockquote>/gi,
    (_, label, body) => {
      const calloutType = String(label).toLowerCase();
      const icon = calloutType === 'warning' ? '⚠️' : '💡';
      const content = String(body).trim();

      return `<div class="snap-callout snap-callout-${calloutType}"><div class="snap-callout-header"><span class="snap-callout-icon">${icon}</span><span class="snap-callout-title">${escapeHtml(label)}</span></div><div class="snap-callout-content">${content}</div></div>`;
    },
  );

const transformMediaGalleryTables = (html) =>
  html.replace(
    /<table>\s*<thead>\s*<tr>([\s\S]*?)<\/tr>\s*<\/thead>\s*<tbody>\s*<tr>([\s\S]*?)<\/tr>\s*<\/tbody>\s*<\/table>/gi,
    (match, headerRow, bodyRow) => {
      const images = Array.from(
        String(headerRow).matchAll(/<th[^>]*>\s*(<img\b[\s\S]*?\/?>)\s*<\/th>/gi),
        (imageMatch) => imageMatch[1].trim(),
      );

      if (images.length < 2) {
        return match;
      }

      const captions = Array.from(
        String(bodyRow).matchAll(/<td[^>]*>([\s\S]*?)<\/td>/gi),
        (captionMatch) => captionMatch[1].trim(),
      );

      if (captions.length !== images.length) {
        return match;
      }

      const items = images
        .map((imageHtml, index) => {
          const captionHtml = captions[index];
          const caption = captionHtml ? `<figcaption>${captionHtml}</figcaption>` : '';

          return `<figure class="snap-media-gallery-item">${imageHtml}${caption}</figure>`;
        })
        .join('');

      return `<div class="snap-media-gallery" data-media-gallery="true">${items}</div>`;
    },
  );

const renderMarkdownToHtml = async ({ slug, title, rawContent, inlineAssetMap, marked }) => {
  const toc = [];
  const inlineImages = [];
  const createHeadingSlug = createSlugger();
  const renderer = new marked.Renderer();

  renderer.hr = () => '<hr class="snap-hr" />';

  renderer.heading = ({ depth, text }) => {
    const textContent = stripHtml(text).trim();
    const id = createHeadingSlug(textContent);

    if (depth >= 2 && depth <= 6) {
      toc.push({
        id,
        text: textContent,
        level: depth,
      });
    }

    return `<h${depth} id="${escapeAttribute(id)}">${text}</h${depth}>`;
  };

  renderer.code = ({ text, lang }) => {
    const { prismLanguage, label } = normaliseLanguage(lang);

    try {
      const highlighted = Prism.languages[prismLanguage]
        ? Prism.highlight(text, Prism.languages[prismLanguage], prismLanguage)
        : escapeHtml(text);

      return `<div class="snap-code-block"><div class="snap-code-header"><span class="snap-code-lang">${escapeHtml(label)}</span><button class="snap-code-copy" type="button">Copy</button></div><pre><code class="language-${escapeAttribute(prismLanguage)}">${highlighted}</code></pre></div>`;
    } catch (error) {
      console.warn(`Failed to highlight ${slug} code block (${label}):`, error);
      return `<div class="snap-code-block"><div class="snap-code-header"><span class="snap-code-lang">${escapeHtml(label)}</span><button class="snap-code-copy" type="button">Copy</button></div><pre><code class="language-text">${escapeHtml(text)}</code></pre></div>`;
    }
  };

  renderer.link = ({ href, title: linkTitle, text }) => {
    const resolvedHref = String(href ?? '').trim() || '#';
    const isExternal = /^https?:\/\//i.test(resolvedHref);
    const titleAttribute = linkTitle ? ` title="${escapeAttribute(linkTitle)}"` : '';
    const externalAttributes = isExternal ? ' target="_blank" rel="noopener noreferrer"' : '';

    return `<a href="${escapeAttribute(resolvedHref)}"${titleAttribute}${externalAttributes} class="snap-link">${text}</a>`;
  };

  renderer.blockquote = ({ text }) => `<blockquote class="snap-blockquote">${text}</blockquote>`;

  renderer.image = ({ href, title: imageTitle, text }) => {
    const source = String(href ?? '').trim();
    const { cleanAltText, className, sizeHint } = getImageClassInfo(text);
    const localAsset = inlineAssetMap.get(source) ?? null;
    const inlineContext = localAsset?.contexts.inline ?? null;
    const sizes = getInlineSizes(sizeHint, inlineContext?.sizes ?? IMAGE_CONTEXTS.inline.sizes);

    inlineImages.push({
      source,
      alt: cleanAltText,
      title: imageTitle ?? undefined,
      className,
      width: localAsset?.width,
      height: localAsset?.height,
      format: localAsset?.format,
      contexts: localAsset?.contexts ?? undefined,
    });

    const titleAttribute = imageTitle ? ` title="${escapeAttribute(imageTitle)}"` : '';

    if (!inlineContext) {
      return `<img src="${escapeAttribute(source)}" alt="${escapeAttribute(cleanAltText)}"${titleAttribute} loading="lazy" decoding="async" class="${escapeAttribute(className)}" />`;
    }

    return `<img src="${escapeAttribute(inlineContext.src)}" alt="${escapeAttribute(cleanAltText)}"${titleAttribute} loading="lazy" decoding="async" class="${escapeAttribute(className)}" width="${inlineContext.width}" height="${inlineContext.height}" srcset="${escapeAttribute(inlineContext.srcSet)}" sizes="${escapeAttribute(sizes)}" />`;
  };

  const html = await marked.parse(preprocessMarkdown(rawContent), {
    renderer,
    gfm: true,
    breaks: true,
  });

  return {
    html: transformMediaGalleryTables(transformCalloutBlockquotes(html)),
    toc,
    inlineImages,
    slug,
    title,
  };
};

const buildRelatedSlugs = (posts, currentPost, limit = 3) =>
  posts
    .filter((post) => post.slug !== currentPost.slug)
    .map((post) => ({
      ...post,
      relevanceScore: post.tags.filter((tag) => currentPost.tags.includes(tag)).length,
    }))
    .filter((post) => post.relevanceScore > 0)
    .sort((a, b) => {
      if (b.relevanceScore !== a.relevanceScore) {
        return b.relevanceScore - a.relevanceScore;
      }

      return a.date < b.date ? 1 : -1;
    })
    .slice(0, limit)
    .map(({ slug }) => slug);

const createPostRecord = async ({ fileName, marked }) => {
  const slug = fileName.replace(/\.md$/, '');
  const fullPath = path.join(postsDirectory, fileName);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);
  const coverImagePath = typeof data.image === 'string' ? data.image : undefined;
  const readingTime = calculateReadingTime(content);
  const inlineImageSources = extractMarkdownImageReferences(content).filter(isLocalImagePath);
  const coverImage = coverImagePath ? await ensureResponsiveImageAsset(coverImagePath, ['card', 'hero', 'related']) : null;
  const inlineAssetEntries = await Promise.all(
    inlineImageSources.map(async (imagePath) => [imagePath, await ensureResponsiveImageAsset(imagePath, ['inline'])]),
  );
  const inlineAssetMap = new Map(inlineAssetEntries.filter((entry) => entry[1]));
  const renderedContent = await renderMarkdownToHtml({
    slug,
    title: typeof data.title === 'string' ? data.title : '',
    rawContent: content,
    inlineAssetMap,
    marked,
  });

  return {
    slug,
    title: typeof data.title === 'string' ? data.title : '',
    description: typeof data.description === 'string' ? data.description : '',
    date: normalizeDate(data.date),
    author: typeof data.author === 'string' ? data.author : '',
    tags: Array.isArray(data.tags) ? data.tags : [],
    image: coverImagePath,
    imageAlt: typeof data.imageAlt === 'string' ? data.imageAlt : '',
    imageWidth: coverImage?.width,
    imageHeight: coverImage?.height,
    coverImage: coverImage ?? undefined,
    readingTime,
    html: renderedContent.html,
    toc: renderedContent.toc,
    inlineImages: renderedContent.inlineImages,
    relatedSlugs: [],
  };
};

const generateArtifacts = async () => {
  const { marked } = await import('marked');
  const fileNames = fs
    .readdirSync(postsDirectory)
    .filter((fileName) => fileName.endsWith('.md') && !fileName.startsWith('.'));

  const posts = await Promise.all(fileNames.map((fileName) => createPostRecord({ fileName, marked })));

  posts.sort(sortPostsByDate);

  const postsBySlug = Object.fromEntries(posts.map((post) => [post.slug, post]));

  for (const post of posts) {
    const relatedSlugs = buildRelatedSlugs(posts, post, 3);
    post.relatedSlugs = relatedSlugs;
  }

  const manifest = posts.map((post) => ({
    slug: post.slug,
    title: post.title,
    description: post.description,
    date: post.date,
    author: post.author,
    tags: post.tags,
    image: post.image,
    imageAlt: post.imageAlt,
    imageWidth: post.imageWidth,
    imageHeight: post.imageHeight,
    coverImage: post.coverImage,
    readingTime: post.readingTime,
    relatedSlugs: post.relatedSlugs,
  }));

  fs.mkdirSync(generatedDirectory, { recursive: true });
  fs.mkdirSync(imageOutputDirectory, { recursive: true });
  fs.writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
  fs.writeFileSync(postsArtifactPath, `${JSON.stringify(postsBySlug, null, 2)}\n`);

  console.log(`Generated blog manifest for ${posts.length} posts at ${manifestPath}`);
  console.log(`Generated blog post artifacts at ${postsArtifactPath}`);
};

generateArtifacts().catch((error) => {
  console.error('Failed to generate blog manifest:', error);
  process.exit(1);
});
