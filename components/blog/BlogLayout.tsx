'use client';

import React, { useState } from 'react';
import SearchBar from './SearchBar';
import Container from '@/components/layout/Container';
import styles from './Blog.module.scss';
import TagFilter from './TagFilter';

interface BlogLayoutProps {
  children: React.ReactNode;
  currentTag?: string;
  onSearch?: (query: string) => void;
  onTagFilter?: (tag: string) => void;
  tags: Readonly<string[]>;
}

export function BlogLayout({
  children,
  currentTag,
  onSearch,
  onTagFilter,
  tags,
}: BlogLayoutProps) {
  const popularTags = tags.slice(0, 10);

  return (
    <Container as="section" variant="default" padding="small" className={styles['blog-layout']}>
      <header className={`${styles['blog-header']}`}>
        <h1>
          Business And Technology Blog
        </h1>
        <p>Explore my latest thoughts on web development, performance optimization, and modern technologies.</p>
      </header>
      <nav className={styles['blog-navigation']} aria-label="Main navigation">
        {onSearch && (
          <div className={styles['blog-search']}>
            <SearchBar value="" onChange={onSearch} placeholder="Search blog posts..." />
          </div>
        )}
        <TagFilter
          tags={popularTags}
          selectedTags={currentTag ? [currentTag] : []}
          onTagToggle={(tag) => onTagFilter?.(tag)}
          onClearAll={() => onTagFilter?.('')}
        />
      </nav>
      <main>{children}</main>
    </Container>
  );
};