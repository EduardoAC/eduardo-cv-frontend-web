'use client';

import React from 'react';
import Link from 'next/link';
import { BlogPostMeta } from '@/lib/blog/markdown';
import Container from '../content/Container';
import Card from '../content/Card';
import Tag from '../content/Tag';
import styles from './BlogList.module.scss';

interface BlogListProps {
  posts: BlogPostMeta[];
}

export function BlogList({ posts }: BlogListProps) {
  return (
    <Container>
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
    </Container>
  );
};

function BlogListItem({ post }: { post: BlogPostMeta}) {
  return (
    <Card>
      {post.image && (
        <Link href={`/blog/${post.slug}`}>
          <img
            src={post.image}
            alt={post.title}
            className={styles['blog-image']}
            loading="lazy"
          />
        </Link>
      )}
      <header>
        <h2 className="snap-heading-h2">
          <Link className="snap-link" href={`/blog/${post.slug}`}>{post.title}</Link>
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
        <Link className="snap-link snap-read-more" href={`/blog/${post.slug}`}>
          Read more →
        </Link>
      </div>
    </Card>
  )
}