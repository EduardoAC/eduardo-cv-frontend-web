import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPostBySlug, getRelatedPosts, getAllPosts } from '@/lib/blog/markdown';
import { generateMetaTags } from '@/lib/blog/seo';
import BlogPost from '@/components/blog/BlogPost';

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

// Generate static params for all blog posts
export async function generateStaticParams() {
  const posts = getAllPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = getPostBySlug(params.slug);
  
  if (!post) {
    return {
      title: 'Post Not Found | Eduardo Aparicio Cárdenes',
    };
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://eduardo-aparicio-cardenes.website';
  const metaTags = generateMetaTags(post, baseUrl);

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
      'article:section': 'Blog',
      'article:tag': post.tags.join(', '),
    },
  };
}

export default function BlogPostPage({ params }: Readonly<BlogPostPageProps>) {
  const post = getPostBySlug(params.slug);
  
  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(params.slug, 3);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://eduardo-aparicio-cardenes.website';
  const structuredData = generateMetaTags(post, baseUrl).structuredData;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <BlogPost post={post} relatedPosts={relatedPosts} />
    </>
  );
} 