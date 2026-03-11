import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface BlogImageVariant {
  src: string;
  width: number;
  height: number;
  format: string;
}

export interface BlogResponsiveImageContext {
  src: string;
  width: number;
  height: number;
  format: string;
  sizes: string;
  srcSet: string;
  variants: BlogImageVariant[];
}

export interface BlogImageAsset {
  source: string;
  width: number;
  height: number;
  format: string;
  contexts: Partial<Record<'card' | 'hero' | 'inline', BlogResponsiveImageContext | null>>;
}

export interface TableOfContentsItem {
  id: string;
  text: string;
  level: number;
}

export interface InlineImageMeta {
  source: string;
  alt: string;
  title?: string;
  className: string;
  width?: number;
  height?: number;
  format?: string;
  contexts?: BlogImageAsset['contexts'];
}

export interface BlogPostMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  tags: string[];
  image?: string;
  imageWidth?: number;
  imageHeight?: number;
  coverImage?: BlogImageAsset;
  readingTime: number;
  relatedSlugs: string[];
}

export interface BlogPost extends BlogPostMeta {
  html: string;
  toc: TableOfContentsItem[];
  inlineImages: InlineImageMeta[];
}

const postsDirectory = path.join(process.cwd(), 'content/posts');
const manifestPath = path.join(process.cwd(), 'generated', 'blog-manifest.json');
const postsArtifactPath = path.join(process.cwd(), 'generated', 'blog-posts.json');
let cachedManifest: BlogPostMeta[] | null = null;
let cachedPostArtifacts: Record<string, BlogPost> | null = null;

const calculateReadingTime = (content: string): number => {
  const wordsPerMinute = 200;
  const wordCount = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
};

const sortPostsByDate = (a: BlogPostMeta, b: BlogPostMeta): number => (a.date < b.date ? 1 : -1);

const normalizeDate = (date: unknown): string => {
  if (date instanceof Date) {
    return date.toISOString();
  }

  return typeof date === 'string' ? date : String(date ?? '');
};

const createPostMetaFromFile = (fileName: string): BlogPostMeta => {
  const slug = fileName.replace(/\.md$/, '');
  const fullPath = path.join(postsDirectory, fileName);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    slug,
    title: typeof data.title === 'string' ? data.title : '',
    description: typeof data.description === 'string' ? data.description : '',
    date: normalizeDate(data.date),
    author: typeof data.author === 'string' ? data.author : '',
    tags: Array.isArray(data.tags) ? data.tags : [],
    image: typeof data.image === 'string' ? data.image : undefined,
    readingTime: calculateReadingTime(content),
    relatedSlugs: [],
  };
};

const buildManifestFromMarkdown = (): BlogPostMeta[] =>
  fs
    .readdirSync(postsDirectory)
    .filter((fileName) => fileName.endsWith('.md') && !fileName.startsWith('.'))
    .map(createPostMetaFromFile)
    .sort(sortPostsByDate);

const loadManifest = (): BlogPostMeta[] => {
  if (cachedManifest) {
    return cachedManifest;
  }

  if (fs.existsSync(manifestPath)) {
    try {
      const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8')) as BlogPostMeta[];
      cachedManifest = manifest.sort(sortPostsByDate);
      return cachedManifest;
    } catch (error) {
      console.warn('Failed to read generated blog manifest, falling back to markdown scan.', error);
    }
  }

  cachedManifest = buildManifestFromMarkdown();
  return cachedManifest;
};

const loadPostArtifacts = (): Record<string, BlogPost> => {
  if (cachedPostArtifacts) {
    return cachedPostArtifacts;
  }

  if (!fs.existsSync(postsArtifactPath)) {
    console.warn('Generated blog post artifacts are missing. Run the blog manifest generation step before rendering posts.');
    cachedPostArtifacts = {};
    return cachedPostArtifacts;
  }

  try {
    cachedPostArtifacts = JSON.parse(fs.readFileSync(postsArtifactPath, 'utf8')) as Record<string, BlogPost>;
    return cachedPostArtifacts;
  } catch (error) {
    console.error('Failed to read generated blog post artifacts.', error);
    cachedPostArtifacts = {};
    return cachedPostArtifacts;
  }
};

export const getAllPosts = (): BlogPostMeta[] => loadManifest();

export const getPostMetaBySlug = (slug: string): BlogPostMeta | null =>
  loadManifest().find((post) => post.slug === slug) ?? null;

export const getPostBySlug = (slug: string): BlogPost | null => {
  const post = loadPostArtifacts()[slug];

  if (post) {
    return post;
  }

  console.error(`Generated post artifact is missing for slug "${slug}".`);
  return null;
};

export const getRelatedPosts = (currentSlug: string, limit: number = 3): BlogPostMeta[] => {
  const currentPost = getPostMetaBySlug(currentSlug);

  if (!currentPost) {
    return [];
  }

  const relatedSlugs = currentPost.relatedSlugs.slice(0, limit);

  if (relatedSlugs.length === 0) {
    return [];
  }

  const postsBySlug = new Map(getAllPosts().map((post) => [post.slug, post]));

  return relatedSlugs
    .map((slug) => postsBySlug.get(slug) ?? null)
    .filter((post): post is BlogPostMeta => Boolean(post));
};
