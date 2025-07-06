import { BlogPost, BlogPostMeta } from './markdown';

export interface BlogSEOData {
  title: string;
  description: string;
  image?: string;
  publishedTime: string;
  author: string;
  tags: string[];
  url: string;
}

// Generate Open Graph metadata
export const generateOpenGraph = (post: BlogPost | BlogPostMeta, baseUrl: string) => {
  const url = `${baseUrl}/posts/${post.slug}`;
  
  return {
    title: post.title,
    description: post.description,
    url,
    siteName: 'Eduardo Aparicio Cárdenes',
    images: post.image ? [
      {
        url: post.image.startsWith('http') ? post.image : `${baseUrl}${post.image}`,
        width: 1200,
        height: 630,
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
  return {
    card: 'summary_large_image',
    title: post.title,
    description: post.description,
    images: post.image ? [
      post.image.startsWith('http') ? post.image : `${baseUrl}${post.image}`
    ] : [],
    creator: '@eduardoac',
    site: '@eduardoac',
  };
};

// Generate structured data (JSON-LD)
export const generateStructuredData = (post: BlogPost | BlogPostMeta, baseUrl: string) => {
  const url = `${baseUrl}/posts/${post.slug}`;
  
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    image: post.image ? (post.image.startsWith('http') ? post.image : `${baseUrl}${post.image}`) : undefined,
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
  return `${baseUrl}/posts/${slug}`;
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
Allow: /posts/
Allow: /posts/*

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