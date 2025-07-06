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
  readingTime: number;
}

const postsDirectory = path.join(process.cwd(), 'content/posts');

// Calculate reading time (average 200 words per minute)
const calculateReadingTime = (content: string): number => {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
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
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);

      return {
        slug,
        title: data.title,
        description: data.description,
        date: data.date,
        author: data.author,
        tags: data.tags || [],
        image: data.image,
        readingTime: calculateReadingTime(content),
      };
    });

  // Sort posts by date (newest first)
  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
};

// Get post by slug
export const getPostBySlug = (slug: string): BlogPost | null => {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      slug,
      title: data.title,
      description: data.description,
      date: data.date,
      author: data.author,
      tags: data.tags || [],
      image: data.image,
      content,
      readingTime: calculateReadingTime(content),
    };
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
  const allPosts = getAllPosts();
  const tags = allPosts.flatMap((post) => post.tags);
  return Array.from(new Set(tags)).sort();
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
  const currentPost = getPostBySlug(currentSlug);
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

  return relatedPosts.map(({ relevanceScore, ...post }) => post);
}; 