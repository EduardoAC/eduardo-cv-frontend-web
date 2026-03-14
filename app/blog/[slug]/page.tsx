import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPostBySlug, getRelatedPosts, getAllPosts, getPostMetaBySlug } from '@/lib/blog/markdown';
import { getSeriesContext } from '@/lib/blog/series';
import { generateMetaTags } from '@/lib/blog/seo';
import { getResolvedTopicName } from '@/lib/blog/topics';
import BlogPost from '@/components/blog/BlogPost';

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate static params for all blog posts
export async function generateStaticParams() {
  const posts = getAllPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostMetaBySlug(slug);
  
  if (!post) {
    return {
      title: 'Post Not Found | Eduardo Aparicio Cárdenes',
    };
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://eduardo-aparicio-cardenes.website';
  const metaTags = generateMetaTags(post, baseUrl);
  const articleSection = getResolvedTopicName(post) || 'Blog';

  return {
    title: metaTags.title,
    description: metaTags.description,
    keywords: metaTags.keywords,
    authors: [{ name: metaTags.author }],
    alternates: {
      canonical: metaTags.canonical,
    },
    openGraph: metaTags.openGraph,
    twitter: metaTags.twitter,
    other: {
      'article:published_time': post.date,
      'article:author': post.author,
      'article:section': articleSection,
      'article:tag': post.tags.join(', '),
    },
  };
}

export default async function BlogPostPage({ params }: Readonly<BlogPostPageProps>) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  
  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(slug, 3);
  const seriesContext = getSeriesContext(slug);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://eduardo-aparicio-cardenes.website';
  const structuredData = generateMetaTags(post, baseUrl).structuredData;

  return (
    <>
      <script
        type="application/ld+json"
        nonce="structured-data-nonce"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <BlogPost post={post} relatedPosts={relatedPosts} seriesContext={seriesContext} />
    </>
  );
} 
