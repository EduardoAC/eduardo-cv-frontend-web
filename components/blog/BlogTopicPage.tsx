import type { BlogPostMeta } from '@/lib/blog/markdown';
import { buildTopicPath, type BlogTopicDefinition, type BlogTopicSubthemeGroup } from '@/lib/blog/topics';
import { BlogLayout } from './BlogLayout';
import { BlogList } from './BlogList';
import styles from './Blog.module.scss';

interface BlogTopicPageProps {
  topic: BlogTopicDefinition;
  posts: ReadonlyArray<BlogPostMeta>;
  subthemes: ReadonlyArray<BlogTopicSubthemeGroup>;
  structuredData: Record<string, unknown>;
}

export function BlogTopicPage({
  topic,
  posts,
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
