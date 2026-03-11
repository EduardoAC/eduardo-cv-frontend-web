import React from 'react';
import Link from 'next/link';
import Container from '@/components/layout/Container';
import type { ArchivePaginationData, MeaningfulTagArchiveSummary } from '@/lib/blog/archive';
import Tag from '../content/Tag';
import { ArchivePagination } from './ArchivePagination';
import styles from './Blog.module.scss';

interface BlogLayoutProps {
  children: React.ReactNode;
  title: string;
  description: string;
  supportingText?: string;
  resultsSummary: string;
  currentTag?: string;
  tags: ReadonlyArray<MeaningfulTagArchiveSummary>;
  pagination: ArchivePaginationData;
  backLink?: {
    href: string;
    label: string;
  };
}

export function BlogLayout({
  children,
  title,
  description,
  supportingText,
  resultsSummary,
  currentTag,
  pagination,
  tags,
  backLink,
}: BlogLayoutProps) {
  const topTags = tags.slice(0, 3);
  const currentTagEntry = currentTag ? tags.find((tag) => tag.tag === currentTag) : undefined;
  const visibleTagEntries = currentTagEntry && !topTags.some((tag) => tag.slug === currentTagEntry.slug)
    ? [...topTags, currentTagEntry]
    : topTags;
  const visibleTagSlugs = new Set(visibleTagEntries.map((tag) => tag.slug));
  const overflowTags = tags.filter((tag) => !visibleTagSlugs.has(tag.slug));

  const renderTag = (tag: MeaningfulTagArchiveSummary) => (
    <Tag
      key={tag.slug}
      href={`/blog/tag/${tag.slug}`}
      ariaLabel={`Browse ${tag.count} articles tagged ${tag.tag}`}
      className={currentTag === tag.tag ? styles['archive-tag-active'] : ''}
    >
      {`${tag.tag} (${tag.count})`}
    </Tag>
  );

  return (
    <Container as="section" variant="default" padding="small" className={styles['blog-layout']}>
      <header className={`${styles['blog-header']}`}>
        {backLink && (
          <nav className={styles['archive-back-link']} aria-label="Archive breadcrumb">
            <Link className={`snap-link snap-read-more ${styles['archive-inline-link']}`} href={backLink.href}>
              {backLink.label}
            </Link>
          </nav>
        )}
        <h1 className="text-align-left">
          {title}
        </h1>
        <p>
          {description}
        </p>
        {supportingText && <p>{supportingText}</p>}
      </header>

      <div className={styles['blog-navigation']}>
        <p className={styles['archive-summary']}>{resultsSummary}</p>

        {tags.length > 0 && (
          <section className={styles['archive-tags-panel']} aria-label="Browse blog topics">
            <div className={styles['archive-tags-header']}>
              <h2 className="heading4">Browse by topic</h2>
              {currentTag && (
                <Link className={`snap-link snap-read-more ${styles['archive-inline-link']}`} href="/blog">
                  View all posts
                </Link>
              )}
            </div>
            <div className={`${styles['archive-tag-list']} ${styles['archive-tag-list-desktop']}`}>
              {tags.map(renderTag)}
            </div>
            <div className={`${styles['archive-tag-list']} ${styles['archive-tag-list-mobile']}`}>
              {visibleTagEntries.map(renderTag)}
            </div>
            {overflowTags.length > 0 && (
              <details className={styles['archive-tag-disclosure']}>
                <summary className={styles['archive-tag-summary']}>
                  {`Show ${overflowTags.length} more topic${overflowTags.length === 1 ? '' : 's'}`}
                </summary>
                <div className={`${styles['archive-tag-list']} ${styles['archive-tag-list-overflow']}`}>
                  {overflowTags.map(renderTag)}
                </div>
              </details>
            )}
          </section>
        )}

        <div className={styles['archive-top-pagination']}>
          <ArchivePagination pagination={pagination} />
        </div>
      </div>

      <main>{children}</main>
    </Container>
  );
};
