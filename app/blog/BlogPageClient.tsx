'use client';

import React, { useState, useMemo } from 'react';
import { BlogPostMeta } from '@/lib/blog/markdown';
import BlogList from '@/components/blog/BlogList';
import BlogLayout from '@/components/blog/BlogLayout';

interface BlogPageClientProps {
  allPosts: BlogPostMeta[];
  tags: string[];
}

export default function BlogPageClient({ allPosts, tags }: BlogPageClientProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('');

  // Filter posts based on search query and selected tag
  const filteredPosts = useMemo(() => {
    return allPosts.filter((post) => {
      const matchesSearch = searchQuery === '' || 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesTag = selectedTag === '' || post.tags.includes(selectedTag);

      return matchesSearch && matchesTag;
    });
  }, [allPosts, searchQuery, selectedTag]);

  // const handleSearch = (query: string) => {
  //   setSearchQuery(query);
  //   setSelectedTag(''); // Clear tag filter when searching
  // };

  const handleTagFilter = (tag: string) => {
    setSelectedTag(selectedTag === tag ? '' : tag);
    setSearchQuery(''); // Clear search when filtering by tag
  };

  return (
    <BlogLayout
      currentTag={selectedTag}
      // onSearch={handleSearch}
      onTagFilter={handleTagFilter}
      tags={tags}
    >
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Blog Posts
        </h1>
        <p className="text-lg text-gray-600">
          Explore my latest thoughts on web development, performance optimization, and modern technologies.
        </p>
      </header>

      <BlogList posts={filteredPosts} />
    </BlogLayout>
  );
} 