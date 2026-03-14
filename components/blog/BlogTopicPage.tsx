import Link from 'next/link';
import { BLOG_AUTHOR_PATH, getCanonicalBlogAuthorName } from '@/lib/blog/author';
import type { BlogPostMeta } from '@/lib/blog/markdown';
import { buildTopicPath, type BlogTopicDefinition, type BlogTopicSubthemeGroup } from '@/lib/blog/topics';
import { BlogLayout } from './BlogLayout';
import { BlogList } from './BlogList';
import styles from './Blog.module.scss';

interface BlogTopicPageProps {
  topic: BlogTopicDefinition;
  posts: ReadonlyArray<BlogPostMeta>;
  featuredPost: BlogPostMeta | null;
  featuredReason: 'start-here' | 'latest';
  subthemes: ReadonlyArray<BlogTopicSubthemeGroup>;
  structuredData: Record<string, unknown>;
}

export function BlogTopicPage({
  topic,
  posts,
  featuredPost,
  featuredReason,
  subthemes,
  structuredData,
}: Readonly<BlogTopicPageProps>) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      <BlogLayout
        title={topic.name}
        description={topic.description}
        supportingText={topic.intro}
        resultsSummary={`${posts.length} article${posts.length === 1 ? '' : 's'} in this topic.`}
        topics={[]}
        tags={[]}
        pagination={{
          currentPage: 1,
          totalPages: 1,
          links: [
            {
              page: 1,
              href: buildTopicPath(topic.slug),
              isCurrent: true,
            },
          ],
        }}
        backLink={{
          href: '/blog',
          label: '← Back to all posts',
        }}
      >
        {featuredPost && (
          <section className={styles['topic-start-here']} aria-labelledby="topic-start-here-heading">
            <div className={styles['topic-start-here-header']}>
              <h2 id="topic-start-here-heading" className="heading4">
                {featuredReason === 'start-here' ? 'Start here' : 'Latest article'}
              </h2>
              <p className={styles['topic-start-here-intro']}>
                {featuredReason === 'start-here'
                  ? 'A strong entry point if you are new to this topic.'
                  : 'The newest article in this topic.'}
              </p>
            </div>
            <article className={styles['topic-start-here-card']}>
              <h3 className={styles['topic-start-here-title']}>
                <Link className={`snap-link ${styles['topic-start-here-link']}`} href={`/blog/${featuredPost.slug}`}>
                  {featuredPost.title}
                </Link>
              </h3>
              <div className={styles['topic-start-here-meta']}>
                <time dateTime={featuredPost.date}>
                  {new Date(featuredPost.date).toLocaleDateString('en-GB', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
                <span>• {featuredPost.readingTime} min read</span>
                <span className={styles['topic-start-here-author']}>
                  <span>By</span>
                  <Link className={`snap-link ${styles['topic-inline-author-link']}`} href={BLOG_AUTHOR_PATH}>
                    {getCanonicalBlogAuthorName(featuredPost.author)}
                  </Link>
                </span>
              </div>
              <p className={styles['topic-start-here-summary']}>{featuredPost.summary ?? featuredPost.description}</p>
            </article>
          </section>
        )}

        {subthemes.length > 0 && (
          <section className={styles['topic-subthemes']} aria-labelledby="topic-subthemes-heading">
            <div className={styles['topic-subthemes-header']}>
              <h2 id="topic-subthemes-heading" className="heading4">
                Sub-themes
              </h2>
            </div>
            <ul className={styles['topic-subtheme-grid']}>
              {subthemes.map((subtheme) => (
                <li key={subtheme.name} className={styles['topic-subtheme-card']}>
                  <h3 className={styles['topic-subtheme-title']}>{subtheme.name}</h3>
                  {subtheme.description && <p className={styles['topic-subtheme-description']}>{subtheme.description}</p>}
                  <p className={styles['topic-subtheme-count']}>
                    {subtheme.posts.length} post{subtheme.posts.length === 1 ? '' : 's'}
                  </p>
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className={styles['topic-posts-section']} aria-labelledby="topic-posts-heading">
          <div className={styles['topic-posts-header']}>
            <h2 id="topic-posts-heading" className="heading4">
              All posts in this topic
            </h2>
          </div>
          <BlogList posts={posts} emptyMessage="No posts have been assigned to this topic yet." />
        </section>
      </BlogLayout>
    </>
  );
}
