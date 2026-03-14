/* eslint-disable @next/next/no-img-element */
import { Fragment, type CSSProperties, type ReactNode } from 'react';
import Link from 'next/link';
import { getMeaningfulTagHref } from '@/lib/blog/archive';
import type { BlogPostMeta, BlogResponsiveImageContext } from '@/lib/blog/markdown';
import Card from '../content/Card';
import Tag from '../content/Tag';
import styles from './BlogList.module.scss';

interface BlogListProps {
  posts: ReadonlyArray<BlogPostMeta>;
  emptyMessage?: string;
  interstitial?: ReactNode;
  interstitialAfter?: number;
}

const getImageContext = (post: BlogPostMeta): BlogResponsiveImageContext | null => post.coverImage?.contexts.card ?? null;

const getImageFrameStyle = (post: BlogPostMeta): CSSProperties | undefined => {
  const cardImage = getImageContext(post);
  const imageWidth = cardImage?.width ?? post.imageWidth;
  const imageHeight = cardImage?.height ?? post.imageHeight;

  if (!imageWidth || !imageHeight) {
    return undefined;
  }

  return {
    '--blog-image-aspect': `${imageWidth} / ${imageHeight}`,
  } as CSSProperties;
};

function BlogListItem({ post }: { post: BlogPostMeta }) {
  const articleHref = `/blog/${post.slug}`;
  const tagLinks = post.tags.map((tag) => ({
    tag,
    href: getMeaningfulTagHref(tag) ?? undefined,
  }));
  const cardImage = getImageContext(post);

  return (
    <Card className={styles['blog-card']}>
      {(cardImage || post.image) && (
        <Link className={`snap-link ${styles['blog-card-cover-link']}`} href={articleHref} aria-label={`Read blog post: ${post.title}`}>
          <div className={styles['blog-image-frame']} style={getImageFrameStyle(post)}>
            <img
              src={cardImage?.src ?? post.image}
              alt={post.imageAlt ?? post.title}
              className={styles['blog-image']}
              loading="lazy"
              decoding="async"
              width={cardImage?.width ?? post.imageWidth}
              height={cardImage?.height ?? post.imageHeight}
              srcSet={cardImage?.srcSet}
              sizes={cardImage?.sizes}
            />
          </div>
        </Link>
      )}

      <div className={styles['blog-card-body']}>
        <header className={styles['blog-card-header']}>
          <h2 className={styles['blog-card-title']}>
            <Link className={`snap-link ${styles['blog-card-title-link']}`} href={articleHref}>
              {post.title}
            </Link>
          </h2>

          <div className={styles['blog-card-meta']}>
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString('en-GB', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
            <span>• {post.readingTime} min read</span>
          </div>
        </header>

        <p className={styles['blog-card-description']}>{post.summary ?? post.description}</p>

        <div className={styles['blog-card-footer']}>
          <Link className={`snap-link snap-read-more ${styles['blog-card-read-more']}`} href={articleHref}>
            Read article →
          </Link>

          <div className={styles['blog-tags']}>
            {tagLinks.map(({ tag, href }) => (
              <Tag
                key={tag}
                href={href}
                ariaLabel={href ? `Browse articles tagged ${tag}` : undefined}
              >
                {tag}
              </Tag>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}

export function BlogList({
  posts,
  emptyMessage = 'No posts found.',
  interstitial,
  interstitialAfter = 4,
}: Readonly<BlogListProps>) {
  const showInlineInterstitial = Boolean(interstitial) && posts.length > interstitialAfter;
  const showFallbackInterstitial = Boolean(interstitial) && posts.length > 0 && !showInlineInterstitial;

  return (
    <section aria-label="Blog posts list">
      {posts.length === 0 ? (
        <p>{emptyMessage}</p>
      ) : (
        <ul className={styles.blogList}>
          {posts.map((post, index) => (
            <Fragment key={post.slug}>
              <li className={styles.blogListItem}>
                <BlogListItem post={post} />
              </li>
              {showInlineInterstitial && index === interstitialAfter - 1 && (
                <li className={styles.blogListItem}>
                  {interstitial}
                </li>
              )}
            </Fragment>
          ))}
        </ul>
      )}
      {showFallbackInterstitial && (
        <div className={styles.blogListSecondaryCta}>
          {interstitial}
        </div>
      )}
    </section>
  );
}
