/* eslint-disable @next/next/no-img-element */
import type { CSSProperties } from 'react';
import Link from 'next/link';
import { getMeaningfulTagHref } from '@/lib/blog/archive';
import type { BlogPost as BlogPostType, BlogPostMeta, BlogResponsiveImageContext } from '@/lib/blog/markdown';
import type { BlogSeriesContext } from '@/lib/blog/series';
import { buildTopicPath, getResolvedTopicName } from '@/lib/blog/topics';
import Container from '@/components/layout/Container';
import MarkdownRenderer from './MarkdownRenderer';
import Card from '../content/Card';
import Tag from '../content/Tag';
import styles from './BlogPost.module.scss';

interface BlogPostProps {
  post: BlogPostType;
  relatedPosts: BlogPostMeta[];
  seriesContext: BlogSeriesContext | null;
}

const baseUrl = (process.env.NEXT_PUBLIC_BASE_URL ?? 'https://eduardo-aparicio-cardenes.website').replace(/\/$/, '');

const getImageFrameStyle = (imageWidth?: number, imageHeight?: number): CSSProperties | undefined => {
  if (!imageWidth || !imageHeight) {
    return undefined;
  }

  return {
    '--blog-post-image-aspect': `${imageWidth} / ${imageHeight}`,
  } as CSSProperties;
};

const getImageContext = (
  post: Pick<BlogPostType, 'coverImage' | 'image' | 'imageWidth' | 'imageHeight'>,
  usage: 'card' | 'hero' | 'related',
): BlogResponsiveImageContext | null => post.coverImage?.contexts[usage] ?? null;

const getFallbackImageContext = (post: Pick<BlogPostType, 'image' | 'imageWidth' | 'imageHeight'>) => {
  if (!post.image) {
    return null;
  }

  return {
    src: post.image,
    width: post.imageWidth ?? undefined,
    height: post.imageHeight ?? undefined,
  };
};

const formatAuthorName = (author: string) =>
  author
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');

export default function BlogPost({ post, relatedPosts, seriesContext }: Readonly<BlogPostProps>) {
  const shareUrl = `${baseUrl}/blog/${post.slug}`;
  const shareText = encodeURIComponent(`${post.title} - ${post.description}`);
  const tagLinks = post.tags.map((tag) => ({
    tag,
    href: getMeaningfulTagHref(tag) ?? undefined,
  }));
  const heroImage = getImageContext(post, 'hero');
  const fallbackHeroImage = getFallbackImageContext(post);
  const displayAuthor = formatAuthorName(post.author);
  const shouldShowTableOfContents = post.toc.length > 0;
  const topicName = getResolvedTopicName(post);
  const topicHref = post.topicSlug ? buildTopicPath(post.topicSlug) : null;

  const shareLinks = [
    {
      name: 'Twitter',
      url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${shareText}`,
    },
    {
      name: 'LinkedIn',
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
    },
  ];

  return (
    <Container as="article" padding="small" variant="wide" className={styles['blog-post-page']}>
      <header className={styles['blog-post-header']}>
        <nav className={styles['blog-post-back-link']}>
          <Link className="snap-link snap-read-more" href="/blog">
            ← Back to all posts
          </Link>
        </nav>
        <div className={styles['blog-post-header-content']}>
          {topicHref && topicName && (
            <div className={styles['blog-post-topic']}>
              <span className={styles['blog-post-topic-label']}>Topic</span>
              <Link className={`snap-link ${styles['blog-post-topic-link']}`} href={topicHref}>
                {topicName}
              </Link>
            </div>
          )}
          <h1 className={`text-align-left ${styles['blog-post-title']}`}>{post.title}</h1>
          <p className={styles['blog-post-dek']}>{post.description}</p>
          <div className={styles['blog-post-meta']}>
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString('en-GB', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
            <span>• {post.readingTime} min read</span>
            <span>By {displayAuthor}</span>
          </div>
          <div className={styles['blog-post-tags']}>
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
          <section className={styles['author-strip']} aria-label="Author context">
            <p className={styles['author-strip-name']}>Eduardo Aparicio Cardenes</p>
            <p className={styles['author-strip-role']}>Frontend Engineer, Software Architect, Mentor, Speaker</p>
            <p className={styles['author-strip-summary']}>
              Writing from hands-on experience in frontend architecture, testing strategy, performance, and delivery.
            </p>
          </section>
          {seriesContext && (
            <section className={styles['blog-series']} aria-label="Series navigation">
              <div className={styles['blog-series-header']}>
                <p className={styles['blog-series-label']}>Series</p>
                <h2 className={styles['blog-series-title']}>{seriesContext.name}</h2>
                <p className={styles['blog-series-progress']}>
                  Part {seriesContext.currentIndex} of {seriesContext.totalPosts}
                </p>
              </div>
              <div className={styles['blog-series-links']}>
                {seriesContext.previousPost ? (
                  <Link
                    className={`snap-link snap-read-more ${styles['blog-series-link']}`}
                    href={`/blog/${seriesContext.previousPost.slug}`}
                  >
                    Previous article: {seriesContext.previousPost.title}
                  </Link>
                ) : (
                  <p className={styles['blog-series-edge']}>This is the first article in the series.</p>
                )}
                {seriesContext.nextPost ? (
                  <Link
                    className={`snap-link snap-read-more ${styles['blog-series-link']}`}
                    href={`/blog/${seriesContext.nextPost.slug}`}
                  >
                    Next article: {seriesContext.nextPost.title}
                  </Link>
                ) : (
                  <p className={styles['blog-series-edge']}>This is the latest article in the series.</p>
                )}
              </div>
            </section>
          )}
        </div>
      </header>
      {(heroImage || fallbackHeroImage) && (
        <div className={styles['blog-post-hero']}>
          <div
            className={styles['blog-post-image-frame']}
            style={getImageFrameStyle(heroImage?.width ?? fallbackHeroImage?.width, heroImage?.height ?? fallbackHeroImage?.height)}
          >
            <img
              src={heroImage?.src ?? fallbackHeroImage?.src}
              alt={post.imageAlt ?? post.title}
              className={styles['blog-post-image']}
              loading="eager"
              fetchPriority="high"
              decoding="async"
              width={heroImage?.width ?? fallbackHeroImage?.width}
              height={heroImage?.height ?? fallbackHeroImage?.height}
              srcSet={heroImage?.srcSet}
              sizes={heroImage?.sizes}
            />
          </div>
        </div>
      )}
      <section className={styles['blog-post-body']}>
        <MarkdownRenderer
          html={post.html}
          toc={post.toc}
          showTableOfContents={shouldShowTableOfContents}
          tocCollapsible={shouldShowTableOfContents}
          className={`snap-markdown-article ${styles['blog-post-content']}`}
        />
      </section>
      <footer className={styles['blog-post-footer']}>
        <section className={styles['blog-post-share']} aria-label="Share this post">
          <h2 className={styles['blog-post-share-title']}>Share this post</h2>
          <div className={styles['blog-post-share-links']}>
            {shareLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles['blog-post-share-link']}
              >
                {link.name}
              </a>
            ))}
          </div>
        </section>
        {relatedPosts.length > 0 && (
          <section className={styles['related-posts']}>
            <div className={styles['related-posts-header']}>
              <h2 className={styles['related-posts-title']}>Related posts</h2>
            </div>
            <div className={styles['related-posts-grid']}>
              {relatedPosts.map((relatedPost) => {
                const relatedImage = getImageContext(relatedPost, 'related');
                const relatedFallbackImage = getFallbackImageContext(relatedPost);

                return (
                  <Card key={relatedPost.slug} className={styles['related-post-card']}>
                    {(relatedImage || relatedFallbackImage) && (
                      <img
                        src={relatedImage?.src ?? relatedFallbackImage?.src}
                        alt={relatedPost.imageAlt ?? relatedPost.title}
                        className={styles['related-post-image']}
                        loading="lazy"
                        decoding="async"
                        width={relatedImage?.width ?? relatedFallbackImage?.width}
                        height={relatedImage?.height ?? relatedFallbackImage?.height}
                        srcSet={relatedImage?.srcSet}
                        sizes={relatedImage?.sizes}
                      />
                    )}
                    <h3 className={styles['related-post-card-title']}>
                      <Link className={`snap-link snap-read-more ${styles['related-post-link']}`} href={`/blog/${relatedPost.slug}`}>
                        {relatedPost.title}
                      </Link>
                    </h3>
                    <div className={styles['related-post-meta']}>
                      <time dateTime={relatedPost.date}>
                        {new Date(relatedPost.date).toLocaleDateString('en-GB', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </time>
                    </div>
                    <div className={styles['related-post-tags']}>
                      {relatedPost.tags.slice(0, 2).map((tag) => {
                        const href = getMeaningfulTagHref(tag) ?? undefined;

                        return (
                          <Tag
                            key={tag}
                            href={href}
                            ariaLabel={href ? `Browse articles tagged ${tag}` : undefined}
                          >
                            {tag}
                          </Tag>
                        );
                      })}
                    </div>
                    <p className={styles['related-post-description']}>{relatedPost.summary ?? relatedPost.description}</p>
                  </Card>
                );
              })}
            </div>
          </section>
        )}
      </footer>
    </Container>
  );
}
