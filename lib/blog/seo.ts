import type { BlogPost, BlogPostMeta } from './markdown';

const formatAuthorName = (author: string) =>
  author
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');

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
  const url = `${baseUrl}/blog/${post.slug}`;
  const image = getSeoImage(post);
  const authorName = formatAuthorName(post.author);
  
  return {
    title: post.title,
    description: post.description,
    url,
    siteName: 'Eduardo Aparicio Cárdenes',
    images: image ? [
      {
        url: image.url.startsWith('http') ? image.url : `${baseUrl}${image.url}`,
        width: image.width ?? 1200,
        height: image.height ?? 630,
        alt: post.title,
      }
    ] : [],
    locale: 'en_GB',
    type: 'article',
    publishedTime: post.date,
    author: authorName,
    tags: post.tags,
  };
};

const generateTwitterCard = (post: BlogPost | BlogPostMeta, baseUrl: string) => {
  const image = getSeoImage(post);

  return {
    card: 'summary_large_image',
    title: post.title,
    description: post.description,
    images: image ? [
      image.url.startsWith('http') ? image.url : `${baseUrl}${image.url}`
    ] : [],
    creator: '@eduardoac',
    site: '@eduardoac',
  };
};

const generateStructuredData = (post: BlogPost | BlogPostMeta, baseUrl: string) => {
  const url = `${baseUrl}/blog/${post.slug}`;
  const image = getSeoImage(post);
  const authorName = formatAuthorName(post.author);
  
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    image: image ? (image.url.startsWith('http') ? image.url : `${baseUrl}${image.url}`) : undefined,
    author: {
      '@type': 'Person',
      name: authorName,
      url: baseUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Eduardo Aparicio Cárdenes',
      url: baseUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/favicon.ico`,
      },
    },
    datePublished: post.date,
    dateModified: post.date,
    url,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    keywords: post.tags.join(', '),
    articleSection: 'Blog',
    inLanguage: 'en-GB',
  };
};

const generateCanonicalUrl = (slug: string, baseUrl: string) => {
  return `${baseUrl}/blog/${slug}`;
};

export const generateMetaTags = (post: BlogPost | BlogPostMeta, baseUrl: string) => {
  const canonicalUrl = generateCanonicalUrl(post.slug, baseUrl);
  const openGraph = generateOpenGraph(post, baseUrl);
  const twitterCard = generateTwitterCard(post, baseUrl);
  const structuredData = generateStructuredData(post, baseUrl);
  const authorName = formatAuthorName(post.author);

  return {
    title: `${post.title} | Eduardo Aparicio Cárdenes`,
    description: post.description,
    keywords: post.tags.join(', '),
    author: authorName,
    canonical: canonicalUrl,
    openGraph,
    twitter: twitterCard,
    structuredData,
  };
};
