import type { Metadata } from 'next';
import topicsConfig from './topics.json';
import { getAllPosts, type BlogPostMeta } from './markdown';
import {
  createArchivePagination,
  formatArchiveResultsSummary,
  getPageCount,
  paginatePosts,
  type ArchivePaginationData,
  type PaginatedPostSlice,
} from './pagination';

const DEFAULT_BASE_URL = 'https://eduardoac.dev';
const SITE_NAME = 'Eduardo Aparicio Cardenes';

export interface BlogTopicSubthemeDefinition {
  name: string;
  description?: string;
  tags: string[];
}

export interface BlogTopicDefinition {
  name: string;
  slug: string;
  description: string;
  intro?: string;
  subthemes?: BlogTopicSubthemeDefinition[];
}

export interface BlogTopicSummary extends BlogTopicDefinition {
  href: string;
  count: number;
  totalPages: number;
  latestPostDate?: string;
}

export interface BlogTopicSubthemeGroup extends BlogTopicSubthemeDefinition {
  posts: BlogPostMeta[];
}

export interface BlogTopicArchiveViewModel {
  topic: BlogTopicDefinition;
  posts: ReadonlyArray<BlogPostMeta>;
  resultsSummary: string;
  pagination: ArchivePaginationData;
  showBottomPagination: boolean;
  subthemes: ReadonlyArray<BlogTopicSubthemeGroup>;
  structuredData: Record<string, unknown>;
}

const topicDefinitions = (topicsConfig.topics ?? []) as BlogTopicDefinition[];

const baseUrl = (process.env.NEXT_PUBLIC_BASE_URL ?? DEFAULT_BASE_URL).replace(/\/$/, '');

const sortPostsByDate = (a: BlogPostMeta, b: BlogPostMeta): number => (a.date < b.date ? 1 : -1);

const getAbsoluteUrl = (path: string): string => `${baseUrl}${path}`;

const getTopicSummaryDescription = (topic: BlogTopicDefinition, count: number): string =>
  `${topic.description} Browse ${count} article${count === 1 ? '' : 's'} in this topic hub.`;

const buildTopicPageDescription = ({
  topic,
  currentPage,
  totalPages,
  totalPosts,
}: {
  topic: BlogTopicDefinition;
  currentPage: number;
  totalPages: number;
  totalPosts: number;
}): string => {
  if (currentPage === 1) {
    return getTopicSummaryDescription(topic, totalPosts);
  }

  return `Page ${currentPage} of ${totalPages} for ${topic.name}, with ${totalPosts} article${totalPosts === 1 ? '' : 's'} in this topic.`;
};

const buildTopicMetaTitle = (topicName: string, currentPage: number): string =>
  currentPage > 1 ? `${topicName} | Page ${currentPage} | ${SITE_NAME}` : `${topicName} | ${SITE_NAME}`;

export const buildTopicPath = (topicSlug: string, pageNumber: number = 1): string =>
  pageNumber <= 1 ? `/blog/topics/${topicSlug}` : `/blog/topics/${topicSlug}/page/${pageNumber}`;

export const getBlogTopics = (): BlogTopicDefinition[] => topicDefinitions;

export const getBlogTopicBySlug = (topicSlug: string): BlogTopicDefinition | null =>
  topicDefinitions.find((topic) => topic.slug === topicSlug) ?? null;

export const isKnownTopicSlug = (topicSlug: string): boolean =>
  topicDefinitions.some((topic) => topic.slug === topicSlug);

export const getResolvedTopicName = (post: Pick<BlogPostMeta, 'topic' | 'topicSlug'>): string => {
  if (post.topicSlug) {
    return getBlogTopicBySlug(post.topicSlug)?.name ?? post.topic ?? post.topicSlug;
  }

  return post.topic ?? '';
};

export const getPostsForTopic = (topicSlug: string): BlogPostMeta[] =>
  getAllPosts()
    .filter((post) => post.topicSlug === topicSlug)
    .sort(sortPostsByDate);

export const getTopicArchivePage = (topicSlug: string, pageNumber: number): PaginatedPostSlice<BlogPostMeta> | null => {
  return paginatePosts(getPostsForTopic(topicSlug), pageNumber);
};

export const getBlogTopicSummaries = (): BlogTopicSummary[] =>
  topicDefinitions.map((topic) => {
    const posts = getPostsForTopic(topic.slug);

    return {
      ...topic,
      href: buildTopicPath(topic.slug),
      count: posts.length,
      totalPages: getPageCount(posts.length),
      latestPostDate: posts[0]?.date,
    };
  });

export const getAdditionalTopicArchivePageParams = (): Array<{ topic: string; pageNumber: string }> =>
  getBlogTopicSummaries().flatMap((topic) =>
    Array.from({ length: Math.max(topic.totalPages - 1, 0) }, (_, index) => ({
      topic: topic.slug,
      pageNumber: String(index + 2),
    })),
  );

export const getTopicSubthemeGroups = (topicSlug: string): BlogTopicSubthemeGroup[] => {
  const topic = getBlogTopicBySlug(topicSlug);

  if (!topic?.subthemes?.length) {
    return [];
  }

  const posts = getPostsForTopic(topicSlug);

  return topic.subthemes
    .map((subtheme) => ({
      ...subtheme,
      posts: posts.filter((post) => post.tags.some((tag) => subtheme.tags.includes(tag))),
    }))
    .filter((subtheme) => subtheme.posts.length > 0);
};

export const getTopicMetadata = (topicSlug: string, pageNumber: number = 1): Metadata => {
  const topic = getBlogTopicBySlug(topicSlug);
  const archivePage = getTopicArchivePage(topicSlug, pageNumber);

  if (!topic || !archivePage) {
    return {
      title: 'Topic Not Found | Eduardo Aparicio Cardenes',
      description: 'The requested topic page could not be found.',
    };
  }

  const title = buildTopicMetaTitle(topic.name, pageNumber);
  const description = buildTopicPageDescription({
    topic,
    currentPage: archivePage.currentPage,
    totalPages: archivePage.totalPages,
    totalPosts: archivePage.totalPosts,
  });
  const canonicalPath = buildTopicPath(topicSlug, pageNumber);

  return {
    title,
    description,
    keywords: [topic.name, 'engineering blog', 'topic hub', ...topic.slug.split('-')],
    alternates: {
      canonical: getAbsoluteUrl(canonicalPath),
    },
    openGraph: {
      title,
      description,
      type: 'website',
      url: getAbsoluteUrl(canonicalPath),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
};

export const getTopicStructuredData = (topicSlug: string, pageNumber: number = 1): Record<string, unknown> | null => {
  const topic = getBlogTopicBySlug(topicSlug);
  const archivePage = getTopicArchivePage(topicSlug, pageNumber);

  if (!topic || !archivePage) {
    return null;
  }

  const path = buildTopicPath(topicSlug, pageNumber);

  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: topic.name,
    description: buildTopicPageDescription({
      topic,
      currentPage: archivePage.currentPage,
      totalPages: archivePage.totalPages,
      totalPosts: archivePage.totalPosts,
    }),
    url: getAbsoluteUrl(path),
    isPartOf: {
      '@type': 'Blog',
      name: 'Engineering Blog',
      url: getAbsoluteUrl('/blog'),
    },
    about: {
      '@type': 'Thing',
      name: topic.name,
      description: topic.description,
    },
    mainEntity: {
      '@type': 'ItemList',
      itemListOrder: 'https://schema.org/ItemListOrderDescending',
      numberOfItems: archivePage.posts.length,
      itemListElement: archivePage.posts.map((post, index) => ({
        '@type': 'ListItem',
        position: archivePage.startIndex + index + 1,
        url: getAbsoluteUrl(`/blog/${post.slug}`),
        name: post.title,
        description: post.summary ?? post.description,
      })),
    },
  };
};

export const getTopicArchiveViewModel = (topicSlug: string, pageNumber: number): BlogTopicArchiveViewModel | null => {
  const topic = getBlogTopicBySlug(topicSlug);
  const archivePage = getTopicArchivePage(topicSlug, pageNumber);

  if (!topic || !archivePage) {
    return null;
  }

  return {
    topic,
    posts: archivePage.posts,
    resultsSummary: formatArchiveResultsSummary({
      startIndex: archivePage.startIndex,
      postsOnPage: archivePage.posts.length,
      totalPosts: archivePage.totalPosts,
    }),
    pagination: createArchivePagination(archivePage.currentPage, archivePage.totalPages, (currentPage) =>
      buildTopicPath(topicSlug, currentPage),
    ),
    showBottomPagination: archivePage.totalPages > 1,
    subthemes: getTopicSubthemeGroups(topicSlug),
    structuredData: getTopicStructuredData(topicSlug, pageNumber) ?? {},
  };
};
