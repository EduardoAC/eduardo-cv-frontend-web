import type { Metadata } from 'next';
import { getAllPosts, type BlogPostMeta } from './markdown';
import blogConfig from './config.json';
import { getBlogTopicSummaries, type BlogTopicSummary } from './topics';

export const BLOG_ARCHIVE_PAGE_SIZE = blogConfig.archivePageSize;
export const MIN_TAG_ARCHIVE_POSTS = blogConfig.minTagArchivePosts;

const SITE_NAME = 'Eduardo Aparicio Cardenes';
const BLOG_ARCHIVE_NAME = 'Engineering Blog';
const DEFAULT_BASE_URL = 'https://eduardo-aparicio-cardenes.website';

export interface ArchivePageSlice {
  posts: BlogPostMeta[];
  currentPage: number;
  totalPages: number;
  totalPosts: number;
  pageSize: number;
  startIndex: number;
}

export interface ArchivePaginationLink {
  page: number;
  href: string;
  isCurrent: boolean;
}

export interface ArchivePaginationData {
  currentPage: number;
  totalPages: number;
  links: ArchivePaginationLink[];
  previousHref?: string;
  nextHref?: string;
}

export interface MeaningfulTagArchiveSummary {
  tag: string;
  slug: string;
  count: number;
  totalPages: number;
  latestPostDate?: string;
}

export interface ArchivePageViewModel {
  title: string;
  description: string;
  supportingText?: string;
  resultsSummary: string;
  posts: BlogPostMeta[];
  topics?: BlogTopicSummary[];
  tags: MeaningfulTagArchiveSummary[];
  pagination: ArchivePaginationData;
  structuredData: Record<string, unknown>;
  currentTag?: string;
  backLink?: {
    href: string;
    label: string;
  };
}

interface MeaningfulTagArchiveIndex extends MeaningfulTagArchiveSummary {
  posts: BlogPostMeta[];
}

interface MeaningfulTagArchiveCache {
  archives: MeaningfulTagArchiveIndex[];
  bySlug: Map<string, MeaningfulTagArchiveIndex>;
  byTag: Map<string, MeaningfulTagArchiveIndex>;
}

const baseUrl = (process.env.NEXT_PUBLIC_BASE_URL ?? DEFAULT_BASE_URL).replace(/\/$/, '');

let cachedMeaningfulTagArchives: MeaningfulTagArchiveCache | null = null;

const getPageCount = (totalItems: number, pageSize: number = BLOG_ARCHIVE_PAGE_SIZE): number => {
  return Math.max(1, Math.ceil(totalItems / pageSize));
};

const getAbsoluteUrl = (path: string): string => `${baseUrl}${path}`;

const slugifyTag = (value: string): string => {
  return value
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

const hashTag = (value: string): string => {
  let hash = 0;

  for (const character of value) {
    hash = (hash * 31 + character.charCodeAt(0)) >>> 0;
  }

  return hash.toString(36).slice(0, 6);
};

const createStableTagSlugMap = (tags: string[]): Map<string, string> => {
  const tagToSlug = new Map<string, string>();
  const usedSlugs = new Map<string, string>();

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

const buildMeaningfulTagArchives = (): MeaningfulTagArchiveCache => {
  const posts = getAllPosts();
  const postsByTag = new Map<string, BlogPostMeta[]>();

  for (const post of posts) {
    for (const tag of post.tags) {
      const currentPosts = postsByTag.get(tag) ?? [];
      currentPosts.push(post);
      postsByTag.set(tag, currentPosts);
    }
  }

  const qualifyingTags = Array.from(postsByTag.entries())
    .filter(([, taggedPosts]) => taggedPosts.length >= MIN_TAG_ARCHIVE_POSTS)
    .sort((a, b) => b[1].length - a[1].length || a[0].localeCompare(b[0]));

  const tagSlugMap = createStableTagSlugMap(qualifyingTags.map(([tag]) => tag));
  const archives = qualifyingTags.map(([tag, taggedPosts]) => ({
    tag,
    slug: tagSlugMap.get(tag) ?? slugifyTag(tag),
    count: taggedPosts.length,
    totalPages: getPageCount(taggedPosts.length),
    latestPostDate: taggedPosts[0]?.date,
    posts: taggedPosts,
  }));

  return {
    archives,
    bySlug: new Map(archives.map((archive) => [archive.slug, archive])),
    byTag: new Map(archives.map((archive) => [archive.tag, archive])),
  };
};

const getMeaningfulTagArchiveCache = (): MeaningfulTagArchiveCache => {
  if (!cachedMeaningfulTagArchives) {
    cachedMeaningfulTagArchives = buildMeaningfulTagArchives();
  }

  return cachedMeaningfulTagArchives;
};

const buildArchiveDescription = ({
  currentPage,
  totalPages,
  totalPosts,
}: {
  currentPage: number;
  totalPages: number;
  totalPosts: number;
}): string => {
  if (currentPage === 1) {
    return `Browse ${totalPosts} articles on frontend architecture, testing strategy, web performance, developer experience, and engineering leadership across ${totalPages} archive page${totalPages === 1 ? '' : 's'}.`;
  }

  return `Page ${currentPage} of ${totalPages} in the engineering blog archive, with practical articles on frontend architecture, testing strategy, performance, developer experience, and engineering leadership.`;
};

const buildTagArchiveDescription = ({
  tag,
  currentPage,
  totalPages,
  totalPosts,
}: {
  tag: string;
  currentPage: number;
  totalPages: number;
  totalPosts: number;
}): string => {
  if (currentPage === 1) {
    return `Browse ${totalPosts} articles tagged ${tag}, with direct links into the full posts and the wider blog archive.`;
  }

  return `Page ${currentPage} of ${totalPages} for the ${tag} tag archive, with direct links into the relevant articles.`;
};

const buildArchiveMetaTitle = (label: string, currentPage: number): string => {
  return currentPage > 1 ? `${label} | Page ${currentPage} | ${SITE_NAME}` : `${label} | ${SITE_NAME}`;
};

export const parsePageNumber = (value: string): number | null => {
  if (!/^[1-9]\d*$/.test(value)) {
    return null;
  }

  const pageNumber = Number.parseInt(value, 10);
  return Number.isSafeInteger(pageNumber) ? pageNumber : null;
};

export const buildBlogArchivePath = (pageNumber: number = 1): string => {
  return pageNumber <= 1 ? '/blog' : `/blog/page/${pageNumber}`;
};

export const buildTagArchivePath = (tagSlug: string, pageNumber: number = 1): string => {
  return pageNumber <= 1 ? `/blog/tag/${tagSlug}` : `/blog/tag/${tagSlug}/page/${pageNumber}`;
};

export const getBlogArchivePage = (pageNumber: number): ArchivePageSlice | null => {
  const posts = getAllPosts();
  const totalPosts = posts.length;
  const totalPages = getPageCount(totalPosts);

  if (!Number.isInteger(pageNumber) || pageNumber < 1 || pageNumber > totalPages) {
    return null;
  }

  const startIndex = (pageNumber - 1) * BLOG_ARCHIVE_PAGE_SIZE;
  const slicedPosts = posts.slice(startIndex, startIndex + BLOG_ARCHIVE_PAGE_SIZE);

  return {
    posts: slicedPosts,
    currentPage: pageNumber,
    totalPages,
    totalPosts,
    pageSize: BLOG_ARCHIVE_PAGE_SIZE,
    startIndex,
  };
};

export const getBlogArchivePageNumbers = (): number[] => {
  return Array.from({ length: getPageCount(getAllPosts().length) }, (_, index) => index + 1);
};

export const getAdditionalBlogArchivePageNumbers = (): number[] => {
  return getBlogArchivePageNumbers().filter((pageNumber) => pageNumber > 1);
};

export const getMeaningfulTagArchiveSummaries = (): MeaningfulTagArchiveSummary[] => {
  return getMeaningfulTagArchiveCache().archives.map((archive) => ({
    tag: archive.tag,
    slug: archive.slug,
    count: archive.count,
    totalPages: archive.totalPages,
    latestPostDate: archive.latestPostDate,
  }));
};

export const getMeaningfulTagArchiveBySlug = (tagSlug: string): MeaningfulTagArchiveSummary | null => {
  const archive = getMeaningfulTagArchiveCache().bySlug.get(tagSlug);

  if (!archive) {
    return null;
  }

  return {
    tag: archive.tag,
    slug: archive.slug,
    count: archive.count,
    totalPages: archive.totalPages,
    latestPostDate: archive.latestPostDate,
  };
};

export const getMeaningfulTagArchiveByTag = (tag: string): MeaningfulTagArchiveSummary | null => {
  const archive = getMeaningfulTagArchiveCache().byTag.get(tag);

  if (!archive) {
    return null;
  }

  return {
    tag: archive.tag,
    slug: archive.slug,
    count: archive.count,
    totalPages: archive.totalPages,
    latestPostDate: archive.latestPostDate,
  };
};

export const getMeaningfulTagArchivePageBySlug = (tagSlug: string, pageNumber: number): ArchivePageSlice | null => {
  const archive = getMeaningfulTagArchiveCache().bySlug.get(tagSlug);

  if (!archive || !Number.isInteger(pageNumber) || pageNumber < 1 || pageNumber > archive.totalPages) {
    return null;
  }

  const startIndex = (pageNumber - 1) * BLOG_ARCHIVE_PAGE_SIZE;
  const slicedPosts = archive.posts.slice(startIndex, startIndex + BLOG_ARCHIVE_PAGE_SIZE);

  return {
    posts: slicedPosts,
    currentPage: pageNumber,
    totalPages: archive.totalPages,
    totalPosts: archive.count,
    pageSize: BLOG_ARCHIVE_PAGE_SIZE,
    startIndex,
  };
};

export const getMeaningfulTagHref = (tag: string, pageNumber: number = 1): string | null => {
  const archive = getMeaningfulTagArchiveCache().byTag.get(tag);
  return archive ? buildTagArchivePath(archive.slug, pageNumber) : null;
};

export const isMeaningfulTag = (tag: string): boolean => {
  return getMeaningfulTagArchiveCache().byTag.has(tag);
};

export const getAdditionalTagArchivePageParams = (): Array<{ tag: string; pageNumber: string }> => {
  return getMeaningfulTagArchiveCache().archives.flatMap((archive) =>
    Array.from({ length: Math.max(archive.totalPages - 1, 0) }, (_, index) => ({
      tag: archive.slug,
      pageNumber: String(index + 2),
    })),
  );
};

export const createArchivePagination = (
  currentPage: number,
  totalPages: number,
  buildPagePath: (pageNumber: number) => string,
): ArchivePaginationData => {
  return {
    currentPage,
    totalPages,
    links: Array.from({ length: totalPages }, (_, index) => {
      const page = index + 1;

      return {
        page,
        href: buildPagePath(page),
        isCurrent: page === currentPage,
      };
    }),
    previousHref: currentPage > 1 ? buildPagePath(currentPage - 1) : undefined,
    nextHref: currentPage < totalPages ? buildPagePath(currentPage + 1) : undefined,
  };
};

export const formatArchiveResultsSummary = ({
  startIndex,
  postsOnPage,
  totalPosts,
}: {
  startIndex: number;
  postsOnPage: number;
  totalPosts: number;
}): string => {
  if (postsOnPage === 0 || totalPosts === 0) {
    return 'No articles are available yet.';
  }

  const firstPostNumber = startIndex + 1;
  const lastPostNumber = startIndex + postsOnPage;

  return `Showing articles ${firstPostNumber}-${lastPostNumber} of ${totalPosts}.`;
};

export const getBlogArchiveMetadata = (pageNumber: number): Metadata => {
  const archivePage = getBlogArchivePage(pageNumber);

  if (!archivePage) {
    return {
      title: `Blog Archive Not Found | ${SITE_NAME}`,
      description: 'The requested blog archive page could not be found.',
    };
  }

  const description = buildArchiveDescription(archivePage);
  const canonicalPath = buildBlogArchivePath(pageNumber);
  const title = buildArchiveMetaTitle(BLOG_ARCHIVE_NAME, pageNumber);

  return {
    title,
    description,
    keywords: [
      'engineering blog',
      'frontend architecture',
      'testing strategy',
      'web performance',
      'developer experience',
      'engineering leadership',
    ],
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

export const getTagArchiveMetadata = (tagSlug: string, pageNumber: number): Metadata => {
  const archiveSummary = getMeaningfulTagArchiveCache().bySlug.get(tagSlug);
  const archivePage = getMeaningfulTagArchivePageBySlug(tagSlug, pageNumber);

  if (!archiveSummary || !archivePage) {
    return {
      title: `Tag Archive Not Found | ${SITE_NAME}`,
      description: 'The requested tag archive page could not be found.',
    };
  }

  const description = buildTagArchiveDescription({
    tag: archiveSummary.tag,
    currentPage: archivePage.currentPage,
    totalPages: archivePage.totalPages,
    totalPosts: archivePage.totalPosts,
  });
  const canonicalPath = buildTagArchivePath(tagSlug, pageNumber);
  const title = buildArchiveMetaTitle(`${archiveSummary.tag} Articles`, pageNumber);

  return {
    title,
    description,
    keywords: [archiveSummary.tag, 'blog', 'tag archive', 'articles'],
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

export const getArchiveStructuredData = ({
  title,
  description,
  path,
  posts,
  startIndex,
  tag,
}: {
  title: string;
  description: string;
  path: string;
  posts: ReadonlyArray<BlogPostMeta>;
  startIndex: number;
  tag?: string;
}) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: title,
    description,
    url: getAbsoluteUrl(path),
    isPartOf: {
      '@type': 'Blog',
      name: BLOG_ARCHIVE_NAME,
      url: getAbsoluteUrl('/blog'),
    },
    about: tag
      ? {
          '@type': 'Thing',
          name: tag,
        }
      : undefined,
    mainEntity: {
      '@type': 'ItemList',
      itemListOrder: 'https://schema.org/ItemListOrderDescending',
      numberOfItems: posts.length,
      itemListElement: posts.map((post, index) => ({
        '@type': 'ListItem',
        position: startIndex + index + 1,
        url: getAbsoluteUrl(`/blog/${post.slug}`),
        name: post.title,
        description: post.description,
      })),
    },
  };
};

export const getBlogArchiveViewModel = (pageNumber: number): ArchivePageViewModel | null => {
  const archivePage = getBlogArchivePage(pageNumber);

  if (!archivePage) {
    return null;
  }

  const metadata = getBlogArchiveMetadata(pageNumber);
  const metadataDescription =
    typeof metadata.description === 'string'
      ? metadata.description
      : buildArchiveDescription(archivePage);

  return {
    title: BLOG_ARCHIVE_NAME,
    description:
      'Practical writing on frontend architecture, testing strategy, web performance and reliability, developer experience, and engineering leadership.',
    supportingText:
      'Start with a topic if you want a clearer path through the archive. Tags are still available when you want something narrower.',
    resultsSummary: formatArchiveResultsSummary({
      startIndex: archivePage.startIndex,
      postsOnPage: archivePage.posts.length,
      totalPosts: archivePage.totalPosts,
    }),
    posts: archivePage.posts,
    topics: archivePage.currentPage === 1 ? getBlogTopicSummaries() : [],
    tags: getMeaningfulTagArchiveSummaries(),
    pagination: createArchivePagination(archivePage.currentPage, archivePage.totalPages, buildBlogArchivePath),
    structuredData: getArchiveStructuredData({
      title: BLOG_ARCHIVE_NAME,
      description: metadataDescription,
      path: buildBlogArchivePath(pageNumber),
      posts: archivePage.posts,
      startIndex: archivePage.startIndex,
    }),
  };
};

export const getTagArchiveViewModel = (tagSlug: string, pageNumber: number): ArchivePageViewModel | null => {
  const archiveSummary = getMeaningfulTagArchiveBySlug(tagSlug);
  const archivePage = getMeaningfulTagArchivePageBySlug(tagSlug, pageNumber);

  if (!archiveSummary || !archivePage) {
    return null;
  }

  const metadata = getTagArchiveMetadata(tagSlug, pageNumber);
  const metadataDescription =
    typeof metadata.description === 'string'
      ? metadata.description
      : buildTagArchiveDescription({
          tag: archiveSummary.tag,
          currentPage: archivePage.currentPage,
          totalPages: archivePage.totalPages,
          totalPosts: archivePage.totalPosts,
        });

  return {
    title: `${archiveSummary.tag} Articles`,
    description: `Browse ${archiveSummary.count} articles filed under ${archiveSummary.tag}.`,
    supportingText:
      'Tags stay available for narrower browsing, while the main blog archive now groups articles by topic first.',
    resultsSummary: formatArchiveResultsSummary({
      startIndex: archivePage.startIndex,
      postsOnPage: archivePage.posts.length,
      totalPosts: archivePage.totalPosts,
    }),
    posts: archivePage.posts,
    topics: [],
    tags: getMeaningfulTagArchiveSummaries(),
    pagination: createArchivePagination(archivePage.currentPage, archivePage.totalPages, (currentPage) =>
      buildTagArchivePath(tagSlug, currentPage),
    ),
    structuredData: getArchiveStructuredData({
      title: `${archiveSummary.tag} Articles`,
      description: metadataDescription,
      path: buildTagArchivePath(tagSlug, pageNumber),
      posts: archivePage.posts,
      startIndex: archivePage.startIndex,
      tag: archiveSummary.tag,
    }),
    currentTag: archiveSummary.tag,
    backLink: {
      href: '/blog',
      label: '← Back to all posts',
    },
  };
};
