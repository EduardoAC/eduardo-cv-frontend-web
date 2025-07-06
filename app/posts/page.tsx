import React from 'react';
import { Metadata } from 'next';
import { getAllPosts, getAllTags } from '@/lib/blog/markdown';
import BlogList from '@/components/blog/BlogList';
import BlogPageClient from './BlogPageClient';

export const metadata: Metadata = {
  title: 'Business And Technology blog | Eduardo Aparicio Cardenes',
  description: 'Explore my latest thoughts on web development, performance optimization, and modern technologies.',
  keywords: 'blog, web development, performance, Next.js, React, TypeScript',
  openGraph: {
    title: 'Business And Technology blog | Eduardo Aparicio Cardenes',
    description: 'Explore my latest thoughts on web development, performance optimization, and modern technologies.',
    type: 'website',
    url: 'https://eduardoac.com/posts',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Business And Technology blog | Eduardo Aparicio Cardenes',
    description: 'Explore my latest thoughts on web development, performance optimization, and modern technologies.',
  },
};

export default function BlogPage() {
  const allPosts = getAllPosts();
  const tags = getAllTags();
  return <BlogPageClient allPosts={allPosts} tags={tags} />;
} 