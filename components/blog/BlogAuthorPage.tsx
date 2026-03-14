/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import Container from '@/components/layout/Container';
import type { BlogPostMeta } from '@/lib/blog/markdown';
import { getBlogAuthor } from '@/lib/blog/author';
import { BlogList } from './BlogList';
import styles from './BlogAuthorPage.module.scss';

interface BlogAuthorPageProps {
  posts: ReadonlyArray<BlogPostMeta>;
  structuredData: Record<string, unknown>;
}

export default function BlogAuthorPage({ posts, structuredData }: Readonly<BlogAuthorPageProps>) {
  const author = getBlogAuthor();
  const latestPost = posts[0] ?? null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      <Container as="section" variant="default" padding="small" className={styles['author-page']}>
        <nav className={styles['author-back-link']} aria-label="Blog breadcrumb">
          <Link className={`snap-link snap-read-more ${styles['author-back-link-anchor']}`} href="/blog">
            ← Back to all posts
          </Link>
        </nav>

        <header className={styles['author-hero']}>
          <div className={styles['author-hero-media']}>
            <img
              src={author.image.src}
              alt={author.image.alt}
              width={author.image.width}
              height={author.image.height}
              className={styles['author-hero-image']}
              loading="eager"
              fetchPriority="high"
              decoding="async"
              sizes="(max-width: 900px) 160px, 240px"
            />
          </div>

          <div className={styles['author-hero-copy']}>
            <p className={styles['author-eyebrow']}>Technical author</p>
            <h1 className={styles['author-title']}>{author.name}</h1>
            <p className={styles['author-summary']}>{author.bio}</p>

            <ul className={styles['author-highlights']} aria-label="Selected credibility points">
              {author.credibilityPoints.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>

            <div className={styles['author-proof-links']} aria-label="Author proof links">
              {author.proofLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.external ? '_blank' : undefined}
                  rel={link.external ? 'noopener noreferrer' : undefined}
                  className={styles['author-proof-link']}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </header>

        <section className={styles['author-focus']} aria-labelledby="author-focus-title">
          <div className={styles['author-focus-header']}>
            <h2 id="author-focus-title" className={styles['author-section-title']}>
              Focus areas
            </h2>
            <p className={styles['author-focus-summary']}>
              {latestPost
                ? `${posts.length} article${posts.length === 1 ? '' : 's'} published here. Latest article: ${latestPost.title}.`
                : 'Technical writing across architecture, testing, performance, and delivery.'}
            </p>
          </div>

          <div className={styles['author-focus-links']}>
            {author.topicLinks.map((link) => (
              <Link key={link.href} className={styles['author-focus-link']} href={link.href}>
                {link.label}
              </Link>
            ))}
          </div>
        </section>

        <section className={styles['author-posts']} aria-labelledby="author-posts-title">
          <div className={styles['author-posts-header']}>
            <h2 id="author-posts-title" className={styles['author-section-title']}>
              Articles by Eduardo
            </h2>
            <p className={styles['author-posts-summary']}>
              Practical writing on frontend architecture, testing strategy, web performance, and payment flows.
            </p>
          </div>

          <BlogList posts={posts} emptyMessage="No articles have been published yet." />
        </section>
      </Container>
    </>
  );
}
