import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { BlogTopicPage } from '@/components/blog/BlogTopicPage';
import {
  getBlogTopicBySlug,
  getBlogTopicSummaries,
  getBlogTopics,
  getPostsForTopic,
  getTopicMetadata,
  getTopicStructuredData,
  getTopicSubthemeGroups,
} from '@/lib/blog/topics';

interface BlogTopicArchivePageProps {
  params: Promise<{
    topic: string;
  }>;
}

export const dynamicParams = false;

export async function generateStaticParams() {
  return getBlogTopics().map((topic) => ({
    topic: topic.slug,
  }));
}

export async function generateMetadata({
  params,
}: BlogTopicArchivePageProps): Promise<Metadata> {
  const { topic } = await params;
  return getTopicMetadata(topic);
}

export default async function BlogTopicArchivePage({
  params,
}: Readonly<BlogTopicArchivePageProps>) {
  const { topic: topicSlug } = await params;
  const topic = getBlogTopicBySlug(topicSlug);

  if (!topic) {
    notFound();
  }

  const topicSummary = getBlogTopicSummaries().find((entry) => entry.slug === topicSlug);

  return (
    <BlogTopicPage
      topic={topic}
      posts={getPostsForTopic(topicSlug)}
      featuredPost={topicSummary?.featuredPost ?? null}
      featuredReason={topicSummary?.featuredReason ?? 'latest'}
      subthemes={getTopicSubthemeGroups(topicSlug)}
      structuredData={getTopicStructuredData(topicSlug) ?? {}}
    />
  );
}
