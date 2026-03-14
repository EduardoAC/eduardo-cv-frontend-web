import Link from 'next/link';
import type { BlogTopicSummary } from '@/lib/blog/topics';
import Card from '../content/Card';
import styles from './Blog.module.scss';

interface TopicHubGridProps {
  topics: ReadonlyArray<BlogTopicSummary>;
}

export function TopicHubGrid({ topics }: Readonly<TopicHubGridProps>) {
  if (topics.length === 0) {
    return null;
  }

  return (
    <section className={styles['topic-hub-section']} aria-labelledby="blog-topics-heading">
      <div className={styles['topic-hub-header']}>
        <h2 id="blog-topics-heading" className="heading4">
          Start by topic
        </h2>
        <p className={styles['topic-hub-intro']}>
          These are the main areas the blog is organised around. Start with a topic page if you want a clearer route
          into the archive.
        </p>
      </div>

      <ul className={styles['topic-hub-grid']}>
        {topics.map((topic) => (
          <li key={topic.slug}>
            <Card className={styles['topic-hub-card']}>
              <div className={styles['topic-hub-meta']}>
                <span className={styles['topic-hub-count']}>
                  {topic.count} post{topic.count === 1 ? '' : 's'}
                </span>
              </div>
              <h3 className={styles['topic-hub-title']}>
                <Link className={`snap-link ${styles['topic-hub-title-link']}`} href={topic.href}>
                  {topic.name}
                </Link>
              </h3>
              <p className={styles['topic-hub-description']}>{topic.description}</p>
              {topic.featuredPost && (
                <div className={styles['topic-hub-featured']}>
                  <p className={styles['topic-hub-featured-label']}>
                    {topic.featuredReason === 'start-here' ? 'Start here' : 'Latest article'}
                  </p>
                  <Link className={`snap-link ${styles['topic-hub-featured-link']}`} href={`/blog/${topic.featuredPost.slug}`}>
                    {topic.featuredPost.title}
                  </Link>
                  <p className={styles['topic-hub-featured-summary']}>
                    {topic.featuredPost.summary ?? topic.featuredPost.description}
                  </p>
                </div>
              )}
              <Link className={`snap-link snap-read-more ${styles['topic-hub-cta']}`} href={topic.href}>
                Explore topic
              </Link>
            </Card>
          </li>
        ))}
      </ul>
    </section>
  );
}
