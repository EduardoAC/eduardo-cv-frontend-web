/* eslint-disable @next/next/no-img-element */
'use client';

import React, { type CSSProperties } from 'react';
import Link from 'next/link';
import type { BlogPostMeta } from '@/lib/blog/markdown';
import Card from '../content/Card';
import Tag from '../content/Tag';
import styles from './BlogList.module.scss';

interface BlogListProps {
  posts: BlogPostMeta[];
}

export function BlogList({ posts }: BlogListProps) {
  return (
    <section aria-label="Blog posts list">
      {posts.length === 0 ? (
        <p>No posts found.</p>
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
};

const getImageFrameStyle = (post: BlogPostMeta): CSSProperties | undefined => {
  if (!post.imageWidth || !post.imageHeight) {
    return undefined;
  }

  return {
    '--blog-image-aspect': `${post.imageWidth} / ${post.imageHeight}`,
  } as CSSProperties;
};

function BlogListItem({ post }: { post: BlogPostMeta }) {
  return (
    <Card>
      <Link className="snap-link" href={`/blog/${post.slug}`} aria-label={`Read blog post: ${post.title}`}>
        {post.image && (
          <div className={styles['blog-image-frame']} style={getImageFrameStyle(post)}>
            <img
              src={post.image}
              alt={post.title}
              className={styles['blog-image']}
              loading="lazy"
              width={post.imageWidth}
              height={post.imageHeight}
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
        <div className="blog-tags">
          {post.tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>
        <div className="blog-read-more">
          <span className="snap-link snap-read-more">
            Read more →
          </span>
        </div>
      </Link>
    </Card>
  )
}
