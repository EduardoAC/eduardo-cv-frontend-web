import React from 'react';
import { Metadata } from 'next';
import { getAllPosts, getAllTags } from '@/lib/blog/markdown';
import BlogPageClient from './BlogPageClient';

export const metadata: Metadata = {
  title: 'Business And Technology blog | Eduardo Aparicio Cardenes',
  description: 'Discover expert insights on web performance, Chrome extension mastery, frontend innovation, and software leadership from Eduardo Aparicio Cardenes.',
  keywords: 'performance, Chrome extensions, frontend, mentorship, React, JavaScript',
  openGraph: {
    title: 'Business And Technology blog | Eduardo Aparicio Cardenes',
    description: 'Unlock expert insights on web performance, Software Architecture, Chrome extension mastery, frontend innovation, and software leadership from Eduardo Aparicio Cardenes.',
    type: 'website',
    url: 'https://eduardo-aparicio-cardenes.website/blog',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Business And Technology blog | Eduardo Aparicio Cardenes',
    description: 'Unlock expert insights on web performance, Software Architecture, Chrome extension mastery, frontend innovation, and software leadership from Eduardo Aparicio Cardenes.',
  },
};

export default function BlogPage() {
  const allPosts = getAllPosts();
  const tags = getAllTags();
  return <BlogPageClient allPosts={allPosts} tags={tags} />;
} 