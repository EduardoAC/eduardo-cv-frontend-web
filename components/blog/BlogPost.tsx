/* eslint-disable @next/next/no-img-element */
import type { CSSProperties } from 'react';
import Link from 'next/link';
import { getMeaningfulTagHref } from '@/lib/blog/archive';
import type { BlogPost as BlogPostType, BlogPostMeta, BlogResponsiveImageContext } from '@/lib/blog/markdown';
import Container from '@/components/layout/Container';
import MarkdownRenderer from './MarkdownRenderer';
import Card from '../content/Card';
import Tag from '../content/Tag';
import styles from './BlogPost.module.scss';

interface BlogPostProps {
  post: BlogPostType;
  relatedPosts: BlogPostMeta[];
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
  usage: 'card' | 'hero',
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

export default function BlogPost({ post, relatedPosts }: Readonly<BlogPostProps>) {
  const shareUrl = `${baseUrl}/blog/${post.slug}`;
  const shareText = encodeURIComponent(`${post.title} - ${post.description}`);
  const tagLinks = post.tags.map((tag) => ({
    tag,
    href: getMeaningfulTagHref(tag) ?? undefined,
  }));
  const heroImage = getImageContext(post, 'hero');
  const fallbackHeroImage = getFallbackImageContext(post);

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
    <Container as="article" padding="small" variant="wide">
      <header className="mb-sm">
        <nav className="mb-sm">
          <Link className="snap-link snap-read-more" href="/blog">
            ← Back to all posts
          </Link>
        </nav>
        <h1 className="text-align-left">{post.title}</h1>
        <div className="snap-meta">
          <time dateTime={post.date} style={{ marginRight: '1rem' }}>
            {new Date(post.date).toLocaleDateString('en-GB', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>
          <span>• {post.readingTime} min read</span>
          <span style={{ marginLeft: '1rem' }}>By {post.author}</span>
        </div>
        <div style={{ marginBottom: '1rem' }}>
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
        <p>{post.description}</p>
      </header>
      {(heroImage || fallbackHeroImage) && (
        <div
          className={styles['blog-post-image-frame']}
          style={getImageFrameStyle(heroImage?.width ?? fallbackHeroImage?.width, heroImage?.height ?? fallbackHeroImage?.height)}
        >
          <img
            src={heroImage?.src ?? fallbackHeroImage?.src}
            alt={post.title}
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
      )}
      <section className="mb-xl">
        <MarkdownRenderer html={post.html} toc={post.toc} showTableOfContents />
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
              {relatedPosts.map((relatedPost) => {
                const relatedImage = getImageContext(relatedPost, 'card');
                const relatedFallbackImage = getFallbackImageContext(relatedPost);

                return (
                  <Card key={relatedPost.slug}>
                    {(relatedImage || relatedFallbackImage) && (
                      <img
                        src={relatedImage?.src ?? relatedFallbackImage?.src}
                        alt={relatedPost.title}
                        style={{ width: '100%', height: '120px', objectFit: 'cover', borderRadius: '0.5rem', marginBottom: '0.75rem' }}
                        loading="lazy"
                        decoding="async"
                        width={relatedImage?.width ?? relatedFallbackImage?.width}
                        height={relatedImage?.height ?? relatedFallbackImage?.height}
                        srcSet={relatedImage?.srcSet}
                        sizes={relatedImage?.sizes}
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
                    <p style={{ color: '#fff', fontSize: '0.95rem', margin: '0.5rem 0 0 0' }}>{relatedPost.description}</p>
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
