'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { BlogPostMeta } from '@/lib/blog/markdown';
import SearchBar from './SearchBar';
import TagFilter from './TagFilter';

interface BlogListProps {
  posts: BlogPostMeta[];
}

const BlogList: React.FC<BlogListProps> = ({ posts }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Get all unique tags
  const allTags = useMemo(() => {
    const tags = posts.flatMap((post) => post.tags);
    return Array.from(new Set(tags)).sort();
  }, [posts]);

  // Filter posts based on search query and selected tags
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesSearch = searchQuery === '' || 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesTags = selectedTags.length === 0 || 
        selectedTags.some(tag => post.tags.includes(tag));

      return matchesSearch && matchesTags;
    });
  }, [posts, searchQuery, selectedTags]);

  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedTags([]);
  };

  return (
    <div className="space-y-6">
      {/* Search and Filter Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <SearchBar 
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search posts..."
        />
        
        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}`}
            aria-label="Grid view"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
          </button>
          
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}`}
            aria-label="List view"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>

      {/* Tag Filters */}
      <TagFilter 
        tags={allTags}
        selectedTags={selectedTags}
        onTagToggle={handleTagToggle}
        onClearAll={clearFilters}
      />

      {/* Results Summary */}
      <div className="text-sm text-gray-600">
        {filteredPosts.length === posts.length ? (
          `Showing all ${posts.length} posts`
        ) : (
          `Showing ${filteredPosts.length} of ${posts.length} posts`
        )}
        {(searchQuery || selectedTags.length > 0) && (
          <button
            onClick={clearFilters}
            className="ml-2 text-blue-600 hover:text-blue-800 underline"
          >
            Clear filters
          </button>
        )}
      </div>

      {/* Posts Grid/List */}
      {filteredPosts.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900 mb-2">No posts found</h3>
          <p className="text-gray-600">
            Try adjusting your search or filter criteria.
          </p>
        </div>
      ) : (
        <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-6'}>
          {filteredPosts.map((post) => (
            <article
              key={post.slug}
              className={`bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 ${
                viewMode === 'list' ? 'flex' : ''
              }`}
            >
              {post.image && (
                <div className={viewMode === 'list' ? 'w-48 flex-shrink-0' : ''}>
                  <img
                    src={post.image}
                    alt={post.title}
                    className={`w-full h-48 object-cover ${
                      viewMode === 'list' ? 'h-full' : ''
                    }`}
                    loading="lazy"
                  />
                </div>
              )}
              
              <div className="p-6 flex-1">
                <div className="flex items-center text-sm text-gray-500 mb-2">
                  <time dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString('en-GB', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </time>
                  <span className="mx-2">•</span>
                  <span>{post.readingTime} min read</span>
                </div>

                <h2 className="text-xl font-semibold text-gray-900 mb-2 hover:text-blue-600 transition-colors">
                  <Link href={`/posts/${post.slug}`}>
                    {post.title}
                  </Link>
                </h2>

                <p className="text-gray-600 mb-4 line-clamp-3">
                  {post.description}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-2">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                    {post.tags.length > 3 && (
                      <span className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full">
                        +{post.tags.length - 3}
                      </span>
                    )}
                  </div>

                  <Link
                    href={`/posts/${post.slug}`}
                    className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                  >
                    Read more →
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogList; 