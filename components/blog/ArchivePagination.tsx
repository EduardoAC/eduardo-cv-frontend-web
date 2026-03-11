import Link from 'next/link';
import type { ArchivePaginationData } from '@/lib/blog/archive';
import styles from './Blog.module.scss';

interface ArchivePaginationProps {
  pagination: ArchivePaginationData;
}

export function ArchivePagination({ pagination }: ArchivePaginationProps) {
  if (pagination.totalPages <= 1) {
    return null;
  }

  return (
    <nav className={styles['archive-pagination']} aria-label="Blog archive pagination">
      <span className={styles['archive-pagination-status']}>
        Page {pagination.currentPage} of {pagination.totalPages}
      </span>

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
    </nav>
  );
}
