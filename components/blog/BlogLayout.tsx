'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import SearchBar from './SearchBar';
import Container from '../content/Container';
import styles from './Blog.module.scss';

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
    <div className={styles['blog-layout']}>
      <Container>
        <header className={styles['blog-header']}>
          <nav className={styles['blog-navigation']} aria-label="Main navigation">
            <Link href="/blog" className={styles['blog-title']}>
              Business And Technology Blog
            </Link>
            {onSearch && (
              <div className={styles['blog-search']}>
                <SearchBar value="" onChange={onSearch} placeholder="Search blog posts..." />
              </div>
            )}
          </nav>
        </header>
        <aside style={{ marginBottom: '2rem' }}>
          <div>
            <strong style={{ color: '#fff', fontSize: '1rem', marginBottom: '0.75rem', display: 'block' }}>Filter by tags</strong>
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
                    padding: '0.5rem 1rem',
                    fontWeight: 500,
                    cursor: 'pointer',
                    fontSize: '0.875rem',
                    transition: 'all 0.2s ease',
                    boxShadow: currentTag === tag ? '0 2px 4px 0 rgba(37, 99, 235, 0.2)' : '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
                  }}
                  onMouseEnter={(e) => {
                    if (currentTag !== tag) {
                      e.currentTarget.style.background = '#e5e7eb';
                      e.currentTarget.style.color = '#111827';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (currentTag !== tag) {
                      e.currentTarget.style.background = '#f3f4f6';
                      e.currentTarget.style.color = '#374151';
                    }
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
    </div>
  );
};

export default BlogLayout; 