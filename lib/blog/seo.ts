import type { BlogPost, BlogPostMeta } from './markdown';
import { getAbsoluteBlogAssetUrl, getBlogAuthor, getBlogPostUrl } from './author';
import { getResolvedTopicName } from './topics';

const getSeoImage = (post: BlogPost | BlogPostMeta) => {
  if (post.image) {
    return {
      url: post.image,
      width: post.imageWidth,
      height: post.imageHeight,
    };
  }

  const heroImage = post.coverImage?.contexts.hero;

  if (heroImage) {
    return {
      url: heroImage.src,
      width: heroImage.width,
      height: heroImage.height,
    };
  }

  return null;
};

const generateOpenGraph = (post: BlogPost | BlogPostMeta, baseUrl: string) => {
  const author = getBlogAuthor(baseUrl);
  const url = getBlogPostUrl(post.slug, baseUrl);
  const image = getSeoImage(post);
  const topicName = getResolvedTopicName(post);
  const openGraphTags = Array.from(new Set([topicName, ...post.tags].filter(Boolean)));
  
  return {
    title: post.title,
    description: post.description,
    url,
    siteName: 'Eduardo Aparicio Cardenes',
    images: image ? [
      {
        url: getAbsoluteBlogAssetUrl(image.url, baseUrl),
        width: image.width ?? 1200,
        height: image.height ?? 630,
        alt: post.imageAlt ?? post.title,
      }
    ] : [],
    locale: 'en_GB',
    type: 'article',
    publishedTime: post.date,
    modifiedTime: post.date,
    authors: [author.url],
    section: topicName || 'Blog',
    tags: openGraphTags,
  };
};

const generateTwitterCard = (post: BlogPost | BlogPostMeta, baseUrl: string) => {
  const image = getSeoImage(post);

  return {
    card: 'summary_large_image',
    title: post.title,
    description: post.description,
    images: image ? [
      getAbsoluteBlogAssetUrl(image.url, baseUrl)
    ] : [],
    creator: '@eduardoac',
    site: '@eduardoac',
  };
};

const generateStructuredData = (post: BlogPost | BlogPostMeta, baseUrl: string) => {
  const author = getBlogAuthor(baseUrl);
  const url = getBlogPostUrl(post.slug, baseUrl);
  const image = getSeoImage(post);
  const topicName = getResolvedTopicName(post);
  
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    image: image ? getAbsoluteBlogAssetUrl(image.url, baseUrl) : undefined,
    author: {
      '@type': 'Person',
      name: author.name,
      url: author.url,
      image: getAbsoluteBlogAssetUrl(author.image.src, baseUrl),
      sameAs: author.sameAs,
      jobTitle: author.jobTitle,
    },
    publisher: {
      '@type': 'Person',
      name: author.name,
      url: author.url,
      image: getAbsoluteBlogAssetUrl(author.image.src, baseUrl),
    },
    datePublished: post.date,
    dateModified: post.date,
    url,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    keywords: Array.from(new Set([topicName, ...post.tags].filter(Boolean))).join(', '),
    articleSection: topicName || 'Blog',
    inLanguage: 'en-GB',
  };
};

const generateCanonicalUrl = (slug: string, baseUrl: string) => {
  return getBlogPostUrl(slug, baseUrl);
};

export const generateMetaTags = (post: BlogPost | BlogPostMeta, baseUrl: string) => {
  const author = getBlogAuthor(baseUrl);
  const canonicalUrl = generateCanonicalUrl(post.slug, baseUrl);
  const openGraph = generateOpenGraph(post, baseUrl);
  const twitterCard = generateTwitterCard(post, baseUrl);
  const structuredData = generateStructuredData(post, baseUrl);
  const topicName = getResolvedTopicName(post);
  const keywords = Array.from(new Set([topicName, ...post.tags].filter(Boolean))).join(', ');

  return {
    title: `${post.title} | Eduardo Aparicio Cardenes`,
    description: post.description,
    keywords,
    author: author.name,
    authorUrl: author.url,
    canonical: canonicalUrl,
    openGraph,
    twitter: twitterCard,
    structuredData,
  };
};
