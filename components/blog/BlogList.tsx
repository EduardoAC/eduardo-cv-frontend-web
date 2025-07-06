'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { BlogPostMeta } from '@/lib/blog/markdown';
import SearchBar from './SearchBar';
import TagFilter from './TagFilter';
import Container from '../content/Container';
import Card from '../content/Card';
import Tag from '../content/Tag';

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
    <Container>
      <section aria-label="Blog posts list">
        {posts.length === 0 ? (
          <p>No posts found.</p>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {posts.map((post) => (
              <li key={post.slug} style={{ marginBottom: '2rem' }}>
                <Card>
                  {post.image && (
                    <Link href={`/posts/${post.slug}`}>
                      <img
                        src={post.image}
                        alt={post.title}
                        style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '0.5rem', marginBottom: '1rem' }}
                        loading="lazy"
                      />
                    </Link>
                  )}
                  <header>
                    <h2 className="snap-heading-h2">
                      <Link className="snap-link" href={`/posts/${post.slug}`}>{post.title}</Link>
                    </h2>
                    <div className="snap-meta">
                      <time dateTime={post.date} style={{ marginRight: '1rem' }}>
                        {new Date(post.date).toLocaleDateString('en-GB', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </time>
                      <span>• {post.readingTime} min read</span>
                    </div>
                  </header>
                  <p className="blog-description">{post.description}</p>
                  <div className="blog-tags">
                    {post.tags.map((tag) => (
                      <Tag key={tag}>{tag}</Tag>
                    ))}
                  </div>
                  <div className="blog-read-more">
                    <Link className="snap-link snap-read-more" href={`/posts/${post.slug}`}>
                      Read more →
                    </Link>
                  </div>
                </Card>
              </li>
            ))}
          </ul>
        )}
      </section>
    </Container>
  );
};

export default BlogList;