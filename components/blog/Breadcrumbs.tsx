import Link from 'next/link';
import type { BlogBreadcrumbItem } from '@/lib/blog/breadcrumbs';
import styles from './Breadcrumbs.module.scss';

interface BreadcrumbsProps {
  items: ReadonlyArray<BlogBreadcrumbItem>;
  className?: string;
}

export default function Breadcrumbs({ items, className }: Readonly<BreadcrumbsProps>) {
  if (items.length < 2) {
    return null;
  }

  return (
    <nav className={[styles.breadcrumbs, className].filter(Boolean).join(' ')} aria-label="Breadcrumb">
      <ol className={styles['breadcrumbs-list']}>
        {items.map((item, index) => {
          const isCurrentPage = index === items.length - 1 && !item.href;

          return (
            <li key={`${item.label}-${index}`} className={styles['breadcrumbs-item']}>
              {item.href ? (
                <Link className={styles['breadcrumbs-link']} href={item.href}>
                  {item.label}
                </Link>
              ) : (
                <span className={styles['breadcrumbs-current']} aria-current={isCurrentPage ? 'page' : undefined}>
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
