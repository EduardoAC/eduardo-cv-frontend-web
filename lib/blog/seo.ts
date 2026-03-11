import type { BlogPost, BlogPostMeta } from './markdown';

export interface BlogSEOData {
  title: string;
  description: string;
  image?: string;
  publishedTime: string;
  author: string;
  tags: string[];
  url: string;
}

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

// Generate Open Graph metadata
export const generateOpenGraph = (post: BlogPost | BlogPostMeta, baseUrl: string) => {
  const url = `${baseUrl}/blog/${post.slug}`;
  const image = getSeoImage(post);
  
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
    author: post.author,
    tags: post.tags,
  };
};

// Generate Twitter Card metadata
export const generateTwitterCard = (post: BlogPost | BlogPostMeta, baseUrl: string) => {
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

// Generate structured data (JSON-LD)
export const generateStructuredData = (post: BlogPost | BlogPostMeta, baseUrl: string) => {
  const url = `${baseUrl}/blog/${post.slug}`;
  const image = getSeoImage(post);
  
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    image: image ? (image.url.startsWith('http') ? image.url : `${baseUrl}${image.url}`) : undefined,
    author: {
      '@type': 'Person',
      name: post.author,
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

// Generate canonical URL
export const generateCanonicalUrl = (slug: string, baseUrl: string) => {
  return `${baseUrl}/blog/${slug}`;
};

// Generate meta tags for blog post
export const generateMetaTags = (post: BlogPost | BlogPostMeta, baseUrl: string) => {
  const canonicalUrl = generateCanonicalUrl(post.slug, baseUrl);
  const openGraph = generateOpenGraph(post, baseUrl);
  const twitterCard = generateTwitterCard(post, baseUrl);
  const structuredData = generateStructuredData(post, baseUrl);

  return {
    title: `${post.title} | Eduardo Aparicio Cárdenes`,
    description: post.description,
    keywords: post.tags.join(', '),
    author: post.author,
    canonical: canonicalUrl,
    openGraph,
    twitter: twitterCard,
    structuredData,
  };
};

// Generate sitemap entry for blog post
export const generateSitemapEntry = (post: BlogPostMeta, baseUrl: string) => {
  return {
    url: generateCanonicalUrl(post.slug, baseUrl),
    lastModified: new Date(post.date).toISOString(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  };
};

// Generate robots.txt content for blog
export const generateRobotsContent = (baseUrl: string) => {
  return `User-agent: *
Allow: /blog/
Allow: /blog/*

Sitemap: ${baseUrl}/sitemap.xml`;
};

// Validate SEO data
export const validateSEOData = (post: BlogPost | BlogPostMeta): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (!post.title || post.title.length < 10) {
    errors.push('Title should be at least 10 characters long');
  }

  if (!post.description || post.description.length < 50) {
    errors.push('Description should be at least 50 characters long');
  }

  if (post.description && post.description.length > 160) {
    errors.push('Description should not exceed 160 characters');
  }

  if (!post.tags || post.tags.length === 0) {
    errors.push('At least one tag is required for SEO');
  }

  if (post.tags && post.tags.length > 10) {
    errors.push('Too many tags (maximum 10)');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}; 
