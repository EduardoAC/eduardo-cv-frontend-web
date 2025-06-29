'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import SearchBar from './SearchBar';
import Container from '../content/Container';

interface BlogLayoutProps {
  children: React.ReactNode;
  currentTag?: string;
  onSearch?: (query: string) => void;
  onTagFilter?: (tag: string) => void;
  tags: string[];
}

const BlogLayout: React.FC<BlogLayoutProps> = ({
  children,
  currentTag,
  onSearch,
  onTagFilter,
  tags,
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const popularTags = tags.slice(0, 10);

  return (
    <Container>
      <header style={{ borderBottom: '1px solid #e5e7eb', padding: '1.5rem 0', marginBottom: '2rem' }}>
        <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} aria-label="Main navigation">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <Link href="/" style={{ fontWeight: 700, fontSize: '1.25rem', color: '#111827', textDecoration: 'none' }}>
              Eduardo Aparicio Cárdenes
            </Link>
            <span style={{ color: '#d1d5db', margin: '0 1rem' }}>|</span>
            <Link href="/posts" style={{ fontSize: '1rem', color: '#374151', textDecoration: 'none' }}>
              Blog
            </Link>
          </div>
          {onSearch && (
            <div style={{ maxWidth: 320, width: '100%' }}>
              <SearchBar value="" onChange={onSearch} placeholder="Search blog posts..." />
            </div>
          )}
        </nav>
      </header>
      <aside style={{ marginBottom: '2rem' }}>
        <div>
          <strong>Filter by tags</strong>
          <div style={{ marginTop: '0.5rem', display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {popularTags.map((tag) => (
              <button
                key={tag}
                onClick={() => onTagFilter?.(tag)}
                style={{
                  background: currentTag === tag ? '#2563eb' : '#f3f4f6',
                  color: currentTag === tag ? '#fff' : '#374151',
                  border: 'none',
                  borderRadius: '9999px',
                  padding: '0.25em 0.75em',
                  fontWeight: 500,
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                  transition: 'background 0.2s, color 0.2s',
                }}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </aside>
      <main>{children}</main>
    </Container>
  );
};

export default BlogLayout; 