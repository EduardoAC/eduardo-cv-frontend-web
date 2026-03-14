/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { getBlogAuthor } from '@/lib/blog/author';
import styles from './BlogAuthorCard.module.scss';

export default function BlogAuthorCard() {
  const author = getBlogAuthor();

  return (
    <section className={styles['author-card']} aria-labelledby="blog-author-card-title">
      <div className={styles['author-card-layout']}>
        <div className={styles['author-card-avatar-shell']}>
          <img
            src={author.image.src}
            alt={author.image.alt}
            width={author.image.width}
            height={author.image.height}
            className={styles['author-card-avatar']}
            loading="lazy"
            decoding="async"
            sizes="(max-width: 640px) 88px, 112px"
          />
        </div>

        <div className={styles['author-card-content']}>
          <p className={styles['author-card-eyebrow']}>About the author</p>
          <h2 id="blog-author-card-title" className={styles['author-card-name']}>
            {author.name}
          </h2>
          <p className={styles['author-card-role']}>{author.jobTitle}</p>
          <p className={styles['author-card-bio']}>{author.bio}</p>

          <div className={styles['author-card-links']} aria-label="Author proof links">
            {author.proofLinks.map((link) => (
              <a
                key={link.label}
                className={styles['author-card-proof-link']}
                href={link.href}
                target={link.external ? '_blank' : undefined}
                rel={link.external ? 'noopener noreferrer' : undefined}
              >
                {link.label}
              </a>
            ))}
          </div>

          <Link className={styles['author-card-cta']} href={author.path}>
            {author.ctaLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
