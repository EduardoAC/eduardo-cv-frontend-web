import { getAllPosts, type BlogPostMeta } from './markdown';

const DEFAULT_BASE_URL = 'https://eduardo-aparicio-cardenes.website';

export const BLOG_AUTHOR_NAME = 'Eduardo Aparicio Cardenes';
export const BLOG_AUTHOR_SLUG = 'eduardo-aparicio-cardenes';
export const BLOG_AUTHOR_PATH = `/blog/author/${BLOG_AUTHOR_SLUG}`;

const BLOG_AUTHOR_JOB_TITLE = 'Senior Frontend Engineer at super.xyz';
const BLOG_AUTHOR_BIO =
  'Eduardo Aparicio Cardenes is a Senior Frontend Engineer at super.xyz (formerly happening.xyz), former Principal Frontend Engineer, speaker, mentor, and the creator of GenX API. He writes about frontend architecture, testing strategy, web performance, and payment systems, drawing on hands-on experience building reliable product journeys and developer tooling at scale.';
const BLOG_AUTHOR_DESCRIPTION =
  'Technical author profile for Eduardo Aparicio Cardenes, Senior Frontend Engineer at super.xyz, covering frontend architecture, testing strategy, web performance, and payment systems.';
const BLOG_AUTHOR_IMAGE_PATH = '/images/profiles/eduardo-aparicio-cardenes-homepage-490px.webp';
const BLOG_AUTHOR_SAME_AS = [
  'https://github.com/EduardoAC',
  'https://www.linkedin.com/in/eacardenes',
] as const;
const BLOG_AUTHOR_TOPIC_LINKS = [
  {
    label: 'Frontend architecture',
    href: '/blog/topics/frontend-architecture',
  },
  {
    label: 'Testing strategy',
    href: '/blog/topics/testing-strategy',
  },
  {
    label: 'Performance and reliability',
    href: '/blog/topics/web-performance-reliability-security',
  },
] as const;
const BLOG_AUTHOR_CREDIBILITY_POINTS = [
  'Senior Frontend Engineer at super.xyz',
  'Former Principal Frontend Engineer',
  'Creator of GenX API',
  'Speaker and mentor',
] as const;

export interface BlogAuthorLink {
  label: string;
  href: string;
  external?: boolean;
}

export interface BlogAuthorProfile {
  name: string;
  slug: string;
  path: string;
  url: string;
  bio: string;
  description: string;
  jobTitle: string;
  image: {
    src: string;
    width: number;
    height: number;
    alt: string;
  };
  proofLinks: BlogAuthorLink[];
  sameAs: string[];
  expertise: string[];
  credibilityPoints: string[];
  ctaLabel: string;
  topicLinks: Array<{
    label: string;
    href: string;
  }>;
}

const normalizeBaseUrl = (baseUrl: string): string => baseUrl.replace(/\/$/, '');

const normalizeAuthorKey = (author: string): string =>
  author
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, ' ');

const PRIMARY_AUTHOR_KEY = normalizeAuthorKey(BLOG_AUTHOR_NAME);

const toTitleCase = (author: string): string =>
  author
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join(' ');

export const isPrimaryBlogAuthor = (author: string): boolean => normalizeAuthorKey(author) === PRIMARY_AUTHOR_KEY;

export const getCanonicalBlogAuthorName = (author: string): string =>
  isPrimaryBlogAuthor(author) ? BLOG_AUTHOR_NAME : toTitleCase(normalizeAuthorKey(author));

export const getAbsoluteBlogAssetUrl = (assetPath: string, baseUrl: string = DEFAULT_BASE_URL): string =>
  assetPath.startsWith('http') ? assetPath : `${normalizeBaseUrl(baseUrl)}${assetPath}`;

export const getBlogPostUrl = (slug: string, baseUrl: string = DEFAULT_BASE_URL): string =>
  `${normalizeBaseUrl(baseUrl)}/blog/${slug}`;

export const getBlogAuthorUrl = (baseUrl: string = DEFAULT_BASE_URL): string =>
  `${normalizeBaseUrl(baseUrl)}${BLOG_AUTHOR_PATH}`;

export const getBlogAuthor = (baseUrl: string = DEFAULT_BASE_URL): BlogAuthorProfile => ({
  name: BLOG_AUTHOR_NAME,
  slug: BLOG_AUTHOR_SLUG,
  path: BLOG_AUTHOR_PATH,
  url: getBlogAuthorUrl(baseUrl),
  bio: BLOG_AUTHOR_BIO,
  description: BLOG_AUTHOR_DESCRIPTION,
  jobTitle: BLOG_AUTHOR_JOB_TITLE,
  image: {
    src: BLOG_AUTHOR_IMAGE_PATH,
    width: 490,
    height: 490,
    alt: `Portrait of ${BLOG_AUTHOR_NAME}`,
  },
  proofLinks: BLOG_AUTHOR_SAME_AS.map((href) => ({
    label: href.includes('github.com') ? 'GitHub' : 'LinkedIn',
    href,
    external: true,
  })),
  sameAs: [...BLOG_AUTHOR_SAME_AS],
  expertise: [
    'Frontend architecture',
    'Testing strategy',
    'Web performance',
    'Payment systems',
    'Developer tooling',
  ],
  credibilityPoints: [...BLOG_AUTHOR_CREDIBILITY_POINTS],
  ctaLabel: 'Read the full author profile',
  topicLinks: BLOG_AUTHOR_TOPIC_LINKS.map((link) => ({ ...link })),
});

export const getBlogAuthorStructuredData = (baseUrl: string = DEFAULT_BASE_URL) => {
  const author = getBlogAuthor(baseUrl);

  return {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    url: author.url,
    name: `${author.name} | Blog Author`,
    description: author.description,
    mainEntity: {
      '@type': 'Person',
      name: author.name,
      url: author.url,
      image: getAbsoluteBlogAssetUrl(author.image.src, baseUrl),
      sameAs: author.sameAs,
      description: author.bio,
      jobTitle: author.jobTitle,
      knowsAbout: author.expertise,
    },
  };
};

export const getPostsByPrimaryBlogAuthor = (): BlogPostMeta[] =>
  getAllPosts().filter((post) => isPrimaryBlogAuthor(post.author));
