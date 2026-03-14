import { MetadataRoute } from 'next';
import { BLOG_AUTHOR_PATH } from '@/lib/blog/author';
import { getAllPosts } from '@/lib/blog/markdown';
import {
  buildBlogArchivePath,
  buildTagArchivePath,
  getBlogArchivePageNumbers,
  getMeaningfulTagArchiveSummaries,
} from '@/lib/blog/archive';
import { buildTopicPath, getBlogTopicSummaries } from '@/lib/blog/topics';

export const dynamic = 'force-static';

const baseUrl = (process.env.NEXT_PUBLIC_BASE_URL ?? 'https://eduardo-aparicio-cardenes.website').replace(/\/$/, '');

const staticRoutes: Array<{
  path: string;
  priority: number;
}> = [
  { path: '', priority: 1 },
  { path: '/about', priority: 0.8 },
  { path: '/my-projects', priority: 0.8 },
  { path: '/my-experience', priority: 0.8 },
  { path: '/contact', priority: 0.8 },
  { path: '/frontend-profile', priority: 0.7 },
  { path: '/software-architect-profile', priority: 0.7 },
  { path: '/backend-profile', priority: 0.7 },
  { path: '/mentor-profile', priority: 0.7 },
  { path: '/forum', priority: 0.6 },
  { path: '/projects/how-do-i-build-it', priority: 0.6 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = staticRoutes.map(({ path, priority }) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority,
  }));

  const blogPosts = getAllPosts();
  const authorPages = [
    {
      url: `${baseUrl}${BLOG_AUTHOR_PATH}`,
      lastModified: new Date(blogPosts[0]?.date ?? Date.now()),
      changeFrequency: 'monthly' as const,
      priority: 0.65,
    },
  ];
  const blogArchivePages = getBlogArchivePageNumbers().map((pageNumber) => ({
    url: `${baseUrl}${buildBlogArchivePath(pageNumber)}`,
    lastModified: new Date(blogPosts[0]?.date ?? Date.now()),
    changeFrequency: 'weekly' as const,
    priority: pageNumber === 1 ? 0.6 : 0.5,
  }));

  const topicPages = getBlogTopicSummaries().flatMap((topic) =>
    Array.from({ length: topic.totalPages }, (_, index) => {
      const pageNumber = index + 1;

      return {
        url: `${baseUrl}${buildTopicPath(topic.slug, pageNumber)}`,
        lastModified: new Date(topic.latestPostDate ?? blogPosts[0]?.date ?? Date.now()),
        changeFrequency: 'weekly' as const,
        priority: pageNumber === 1 ? 0.55 : 0.45,
      };
    }),
  );

  const tagArchives = getMeaningfulTagArchiveSummaries().flatMap((tagArchive) =>
    Array.from({ length: tagArchive.totalPages }, (_, index) => {
      const pageNumber = index + 1;

      return {
        url: `${baseUrl}${buildTagArchivePath(tagArchive.slug, pageNumber)}`,
        lastModified: new Date(tagArchive.latestPostDate ?? blogPosts[0]?.date ?? Date.now()),
        changeFrequency: 'weekly' as const,
        priority: pageNumber === 1 ? 0.5 : 0.4,
      };
    }),
  );

  const articlePages = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...pages, ...authorPages, ...blogArchivePages, ...topicPages, ...tagArchives, ...articlePages];
}
