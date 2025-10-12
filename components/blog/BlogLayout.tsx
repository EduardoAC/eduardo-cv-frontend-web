import React from 'react';
import SearchBar from './SearchBar';
import Container from '@/components/layout/Container';
import styles from './Blog.module.scss';
import TagFilter from './TagFilter';
import SubscribeForm from './SubscribeForm';

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
        <h1 className="text-align-left">
          Business And Technology Blog
        </h1>
        <p>
          Unlock advanced strategies in web performance, Software Architecture, Chrome extensions, and software leadership.
        </p>
        <p>
          Learn directly from hands-on experience in real-world projects. Whether you&apos;re a developer, 
          software architect, or tech lead, this blog offers practical insights, best practices, and advanced solutions to elevate your engineering journey.
        </p>
      </header>

      <SubscribeForm />

      <nav className={styles['blog-navigation']} aria-label="Main navigation">
        {onSearch && (
          <div className={styles['blog-search']}>
            <SearchBar onChange={onSearch} placeholder="Search blog posts..." />
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
