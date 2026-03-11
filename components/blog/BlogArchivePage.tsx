import type { BlogPostMeta } from '@/lib/blog/markdown';
import type { ArchivePaginationData, MeaningfulTagArchiveSummary } from '@/lib/blog/archive';
import { ArchivePagination } from './ArchivePagination';
import { BlogLayout } from './BlogLayout';
import { BlogList } from './BlogList';
import SubscribeForm from './SubscribeForm';
import styles from './Blog.module.scss';

interface BlogArchivePageProps {
  title: string;
  description: string;
  supportingText?: string;
  resultsSummary: string;
  posts: ReadonlyArray<BlogPostMeta>;
  tags: ReadonlyArray<MeaningfulTagArchiveSummary>;
  pagination: ArchivePaginationData;
  structuredData: Record<string, unknown>;
  currentTag?: string;
  backLink?: {
    href: string;
    label: string;
  };
  emptyMessage?: string;
}

export function BlogArchivePage({
  title,
  description,
  supportingText,
  resultsSummary,
  posts,
  tags,
  pagination,
  structuredData,
  currentTag,
  backLink,
  emptyMessage,
}: BlogArchivePageProps) {
  const showSubscribeCta = posts.length > 0 && !currentTag && pagination.currentPage === 1;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      <BlogLayout
        title={title}
        description={description}
        supportingText={supportingText}
        resultsSummary={resultsSummary}
        currentTag={currentTag}
        tags={tags}
        pagination={pagination}
        backLink={backLink}
      >
        <BlogList posts={posts} emptyMessage={emptyMessage} />
        {showSubscribeCta && (
          <section className={styles['archive-subscribe']} aria-label="Newsletter subscription">
            <SubscribeForm className={styles['archive-subscribe-form']} />
          </section>
        )}
        <div className={styles['archive-bottom-pagination']}>
          <ArchivePagination pagination={pagination} />
        </div>
      </BlogLayout>
    </>
  );
}
