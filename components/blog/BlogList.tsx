/* eslint-disable @next/next/no-img-element */
import type { CSSProperties } from 'react';
import Link from 'next/link';
import { getMeaningfulTagHref } from '@/lib/blog/archive';
import type { BlogPostMeta, BlogResponsiveImageContext } from '@/lib/blog/markdown';
import Card from '../content/Card';
import Tag from '../content/Tag';
import styles from './BlogList.module.scss';

interface BlogListProps {
  posts: ReadonlyArray<BlogPostMeta>;
  emptyMessage?: string;
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
    <Card>
      <Link className={`snap-link ${styles['blog-card-link']}`} href={articleHref} aria-label={`Read blog post: ${post.title}`}>
        {(cardImage || post.image) && (
          <div className={styles['blog-image-frame']} style={getImageFrameStyle(post)}>
            <img
              src={cardImage?.src ?? post.image}
              alt={post.title}
              className={styles['blog-image']}
              loading="lazy"
              decoding="async"
              width={cardImage?.width ?? post.imageWidth}
              height={cardImage?.height ?? post.imageHeight}
              srcSet={cardImage?.srcSet}
              sizes={cardImage?.sizes}
            />
          </div>
        )}
        <header>
          <h2 className="heading3 text-align-left">
            {post.title}
          </h2>
          <div className="snap-meta">
            <time dateTime={post.date} style={{ marginRight: '1rem' }}>
              {new Date(post.date).toLocaleDateString('en-GB', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
            <span>• {post.readingTime} min read</span>
          </div>
        </header>
        <p className="blog-description">{post.description}</p>
        <div className="blog-read-more">
          <span className="snap-link snap-read-more">
            Read more →
          </span>
        </div>
      </Link>
      <div className={`${styles['blog-tags']} blog-tags`}>
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
    </Card>
  );
}

export function BlogList({ posts, emptyMessage = 'No posts found.' }: Readonly<BlogListProps>) {
  return (
    <section aria-label="Blog posts list">
      {posts.length === 0 ? (
        <p>{emptyMessage}</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {posts.map((post) => (
            <li key={post.slug} style={{ marginBottom: '2rem' }}>
              <BlogListItem post={post} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
