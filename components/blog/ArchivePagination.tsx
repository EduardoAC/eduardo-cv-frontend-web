import Link from 'next/link';
import type { ArchivePaginationData } from '@/lib/blog/pagination';
import styles from './Blog.module.scss';

interface ArchivePaginationProps {
  pagination: ArchivePaginationData;
  summary?: string;
  ariaLabel?: string;
}

export function ArchivePagination({
  pagination,
  summary,
  ariaLabel = 'Article archive pagination',
}: ArchivePaginationProps) {
  const showLinks = pagination.totalPages > 1;

  if (!summary && !showLinks) {
    return null;
  }

  const Wrapper = showLinks ? 'nav' : 'section';

  return (
    <Wrapper className={styles['archive-pagination']} aria-label={showLinks ? ariaLabel : undefined}>
      <div className={styles['archive-pagination-overview']}>
        {summary && <p className={styles['archive-summary']}>{summary}</p>}
        <span className={styles['archive-pagination-status']}>
          Page {pagination.currentPage} of {pagination.totalPages}
        </span>
      </div>

      {showLinks && (
        <div className={styles['archive-pagination-links']}>
          {pagination.previousHref && (
            <Link className={`snap-link ${styles['archive-pagination-link']}`} href={pagination.previousHref}>
              Previous
            </Link>
          )}

          {pagination.links.map((link) =>
            link.isCurrent ? (
              <span
                key={link.page}
                aria-current="page"
                className={styles['archive-pagination-current']}
              >
                {link.page}
              </span>
            ) : (
              <Link key={link.page} className={`snap-link ${styles['archive-pagination-link']}`} href={link.href}>
                {link.page}
              </Link>
            ),
          )}

          {pagination.nextHref && (
            <Link className={`snap-link ${styles['archive-pagination-link']}`} href={pagination.nextHref}>
              Next
            </Link>
          )}
        </div>
      )}
    </Wrapper>
  );
}
