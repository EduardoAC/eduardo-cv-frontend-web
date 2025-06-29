import { Metadata } from 'next';
import { getAllPosts } from '@/lib/blog/markdown';
import BlogList from '@/components/blog/BlogList';

export const metadata: Metadata = {
  title: 'Blog Posts | Eduardo Aparicio Cárdenes',
  description: 'Explore my latest thoughts on web development, performance optimization, and modern technologies.',
  keywords: 'blog, web development, performance, Next.js, React, TypeScript',
  openGraph: {
    title: 'Blog Posts | Eduardo Aparicio Cárdenes',
    description: 'Explore my latest thoughts on web development, performance optimization, and modern technologies.',
    type: 'website',
    url: 'https://eduardoac.com/posts',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog Posts | Eduardo Aparicio Cárdenes',
    description: 'Explore my latest thoughts on web development, performance optimization, and modern technologies.',
  },
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Blog Posts
        </h1>
        <p className="text-lg text-gray-600">
          Explore my latest thoughts on web development, performance optimization, and modern technologies.
        </p>
      </header>

      <BlogList posts={posts} />
    </div>
  );
} 