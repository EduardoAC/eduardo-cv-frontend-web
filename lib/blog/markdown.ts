import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  tags: string[];
  image?: string;
  imageWidth?: number;
  imageHeight?: number;
  content: string;
  readingTime: number;
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
  readingTime: number;
}

const postsDirectory = path.join(process.cwd(), 'content/posts');
const manifestPath = path.join(process.cwd(), 'generated', 'blog-manifest.json');
let cachedManifest: BlogPostMeta[] | null = null;
let cachedTags: string[] | null = null;
const cachedPostsBySlug = new Map<string, BlogPost>();

// Calculate reading time (average 200 words per minute)
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
  };
};

const buildManifestFromMarkdown = (): BlogPostMeta[] => {
  return fs
    .readdirSync(postsDirectory)
    .filter((fileName) => fileName.endsWith('.md') && !fileName.startsWith('.'))
    .map(createPostMetaFromFile)
    .sort(sortPostsByDate);
};

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

// Generate slug from title
export const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .trim();
};

// Get all blog posts
export const getAllPosts = (): BlogPostMeta[] => {
  return loadManifest();
};

export const getPostMetaBySlug = (slug: string): BlogPostMeta | null => {
  return loadManifest().find((post) => post.slug === slug) ?? null;
};

// Get post by slug
export const getPostBySlug = (slug: string): BlogPost | null => {
  const cachedPost = cachedPostsBySlug.get(slug);
  if (cachedPost) {
    return cachedPost;
  }

  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    const postMeta = getPostMetaBySlug(slug);

    const fallbackTags = Array.isArray(data.tags) ? data.tags : [];

    const post: BlogPost = {
      slug,
      title: postMeta?.title ?? (typeof data.title === 'string' ? data.title : ''),
      description: postMeta?.description ?? (typeof data.description === 'string' ? data.description : ''),
      date: postMeta?.date ?? normalizeDate(data.date),
      author: postMeta?.author ?? (typeof data.author === 'string' ? data.author : ''),
      tags: postMeta?.tags ?? fallbackTags,
      image: postMeta?.image ?? (typeof data.image === 'string' ? data.image : undefined),
      imageWidth: postMeta?.imageWidth,
      imageHeight: postMeta?.imageHeight,
      content,
      readingTime: postMeta?.readingTime ?? calculateReadingTime(content),
    };

    cachedPostsBySlug.set(slug, post);

    return post;
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error);
    return null;
  }
};

// Get posts by tag
export const getPostsByTag = (tag: string): BlogPostMeta[] => {
  const allPosts = getAllPosts();
  return allPosts.filter((post) => post.tags.includes(tag));
};

// Get all unique tags
export const getAllTags = (): string[] => {
  if (cachedTags) {
    return cachedTags;
  }

  const tags = getAllPosts().flatMap((post) => post.tags);
  cachedTags = Array.from(new Set(tags)).sort((a, b) => a.localeCompare(b));

  return cachedTags;
};

// Validate post frontmatter
export const validatePost = (post: BlogPost): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (!post.title) errors.push('Title is required');
  if (!post.description) errors.push('Description is required');
  if (!post.date) errors.push('Date is required');
  if (!post.author) errors.push('Author is required');
  if (!post.content) errors.push('Content is required');
  if (!post.tags || post.tags.length === 0) errors.push('At least one tag is required');

  // Validate date format
  if (post.date && !Date.parse(post.date)) {
    errors.push('Invalid date format');
  }

  // Validate slug format
  if (post.slug && !/^[a-z0-9-]+$/.test(post.slug)) {
    errors.push('Slug must contain only lowercase letters, numbers, and hyphens');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

// Get related posts based on tags
export const getRelatedPosts = (currentSlug: string, limit: number = 3): BlogPostMeta[] => {
  const currentPost = getPostMetaBySlug(currentSlug);
  if (!currentPost) return [];

  const allPosts = getAllPosts();
  const relatedPosts = allPosts
    .filter((post) => post.slug !== currentSlug)
    .map((post) => {
      const commonTags = post.tags.filter((tag) => currentPost.tags.includes(tag));
      return {
        ...post,
        relevanceScore: commonTags.length,
      };
    })
    .filter((post) => post.relevanceScore > 0)
    .sort((a, b) => b.relevanceScore - a.relevanceScore)
    .slice(0, limit);

  return relatedPosts.map(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ({ relevanceScore, ...post }) => post,
  );
};
