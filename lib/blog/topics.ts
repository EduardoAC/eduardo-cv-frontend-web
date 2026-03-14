import type { Metadata } from 'next';
import topicsConfig from './topics.json';
import { getAllPosts, type BlogPostMeta } from './markdown';

const DEFAULT_BASE_URL = 'https://eduardo-aparicio-cardenes.website';

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
  featuredSlug?: string;
  subthemes?: BlogTopicSubthemeDefinition[];
}

export interface BlogTopicSummary extends BlogTopicDefinition {
  href: string;
  count: number;
  latestPostDate?: string;
  featuredPost: BlogPostMeta | null;
  featuredReason: 'start-here' | 'latest';
}

export interface BlogTopicSubthemeGroup extends BlogTopicSubthemeDefinition {
  posts: BlogPostMeta[];
}

const topicDefinitions = (topicsConfig.topics ?? []) as BlogTopicDefinition[];

const baseUrl = (process.env.NEXT_PUBLIC_BASE_URL ?? DEFAULT_BASE_URL).replace(/\/$/, '');

const sortPostsByDate = (a: BlogPostMeta, b: BlogPostMeta): number => (a.date < b.date ? 1 : -1);

const getAbsoluteUrl = (path: string): string => `${baseUrl}${path}`;

const getTopicSummaryDescription = (topic: BlogTopicDefinition, count: number): string =>
  `${topic.description} Browse ${count} article${count === 1 ? '' : 's'} in this topic hub.`;

export const buildTopicPath = (topicSlug: string): string => `/blog/topics/${topicSlug}`;

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

const getFeaturedTopicPost = (topic: BlogTopicDefinition, posts: BlogPostMeta[]): BlogPostMeta | null => {
  if (topic.featuredSlug) {
    const configuredFeaturedPost = posts.find((post) => post.slug === topic.featuredSlug) ?? null;

    if (configuredFeaturedPost) {
      return configuredFeaturedPost;
    }
  }

  const editorialFeaturedPost = posts.find((post) => post.featured) ?? null;

  if (editorialFeaturedPost) {
    return editorialFeaturedPost;
  }

  return posts[0] ?? null;
};

export const getBlogTopicSummaries = (): BlogTopicSummary[] =>
  topicDefinitions.map((topic) => {
    const posts = getPostsForTopic(topic.slug);
    const featuredPost = getFeaturedTopicPost(topic, posts);
    const featuredReason =
      topic.featuredSlug && featuredPost?.slug === topic.featuredSlug ? 'start-here' : featuredPost?.featured ? 'start-here' : 'latest';

    return {
      ...topic,
      href: buildTopicPath(topic.slug),
      count: posts.length,
      latestPostDate: posts[0]?.date,
      featuredPost,
      featuredReason,
    };
  });

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

export const getTopicResultsSummary = (topicSlug: string): string => {
  const postCount = getPostsForTopic(topicSlug).length;
  return `${postCount} article${postCount === 1 ? '' : 's'} in this topic.`;
};

export const getTopicMetadata = (topicSlug: string): Metadata => {
  const topic = getBlogTopicBySlug(topicSlug);

  if (!topic) {
    return {
      title: 'Topic Not Found | Eduardo Aparicio Cardenes',
      description: 'The requested topic page could not be found.',
    };
  }

  const posts = getPostsForTopic(topicSlug);
  const title = `${topic.name} | Eduardo Aparicio Cardenes`;
  const description = getTopicSummaryDescription(topic, posts.length);
  const canonicalPath = buildTopicPath(topicSlug);

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

export const getTopicStructuredData = (topicSlug: string): Record<string, unknown> | null => {
  const topic = getBlogTopicBySlug(topicSlug);

  if (!topic) {
    return null;
  }

  const posts = getPostsForTopic(topicSlug);
  const path = buildTopicPath(topicSlug);

  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: topic.name,
    description: getTopicSummaryDescription(topic, posts.length),
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
      numberOfItems: posts.length,
      itemListElement: posts.map((post, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: getAbsoluteUrl(`/blog/${post.slug}`),
        name: post.title,
        description: post.summary ?? post.description,
      })),
    },
  };
};
