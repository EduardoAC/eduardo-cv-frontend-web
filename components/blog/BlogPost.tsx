'use client';

import React from 'react';
import Link from 'next/link';
import { BlogPost as BlogPostType, BlogPostMeta } from '@/lib/blog/markdown';
import Container from '@/components/layout/Container';
import MarkdownRenderer from './MarkdownRenderer';
import Card from '../content/Card';
import Tag from '../content/Tag';
import styles from './BlogPost.module.scss';

interface BlogPostProps {
  post: BlogPostType;
  relatedPosts: BlogPostMeta[];
}

const BlogPost: React.FC<BlogPostProps> = ({ post, relatedPosts }) => {
  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareText = encodeURIComponent(`${post.title} - ${post.description}`);

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
    <Container as="article" padding="small">
      <header className='mb-sm'>
        <nav className='mb-sm'>
          <Link className="snap-link snap-read-more" href="/blog">
            ← Back to all posts
          </Link>
        </nav>
        <h1 className="snap-heading-h1">{post.title}</h1>
        <div className="snap-meta">
          <time dateTime={post.date} style={{ marginRight: '1rem' }}>
            {new Date(post.date).toLocaleDateString('en-GB', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>
          <span >• {post.readingTime} min read</span>
          <span style={{ marginLeft: '1rem' }}>By {post.author}</span>
        </div>
        <div style={{ marginBottom: '1rem' }}>
          {post.tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>
        <p>{post.description}</p>
      </header>
      {post.image && (
          <img
            src={post.image}
            alt={post.title}
            className={styles['blog-post-image']}
            loading="lazy"
          />
        )}
      <section className='mb-xl'>
        <MarkdownRenderer content={post.content} showTableOfContents={true} />
      </section>
      <footer style={{ borderTop: '1px solid #e5e7eb', paddingTop: '2rem', marginTop: '2rem' }}>
        <div style={{ marginBottom: '1.5rem' }}>
          <strong>Share this post:</strong>
          <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
            {shareLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#2563eb', textDecoration: 'none', fontWeight: 500 }}
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
        {relatedPosts.length > 0 && (
          <section>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem' }}>Related Posts</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem' }}>
              {relatedPosts.map((relatedPost) => (
                <Card key={relatedPost.slug}>
                  {relatedPost.image && (
                    <img
                      src={relatedPost.image}
                      alt={relatedPost.title}
                      style={{ width: '100%', height: '120px', objectFit: 'cover', borderRadius: '0.5rem', marginBottom: '0.75rem' }}
                      loading="lazy"
                    />
                  )}
                  <h4 className="snap-heading-h4">
                    <Link className="snap-link snap-read-more" href={`/blog/${relatedPost.slug}`}>
                      {relatedPost.title}
                    </Link>
                  </h4>
                  <div style={{ color: '#6b7280', fontSize: '0.95rem', marginBottom: '0.5rem' }}>
                    <time dateTime={relatedPost.date}>
                      {new Date(relatedPost.date).toLocaleDateString('en-GB', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </time>
                  </div>
                  <div>
                    {relatedPost.tags.slice(0, 2).map((tag) => (
                      <Tag key={tag}>{tag}</Tag>
                    ))}
                  </div>
                  <p style={{ color: '#fff', fontSize: '0.95rem', margin: '0.5rem 0 0 0' }}>{relatedPost.description}</p>
                </Card>
              ))}
            </div>
          </section>
        )}
      </footer>
    </Container>
  );
};

export default BlogPost; 