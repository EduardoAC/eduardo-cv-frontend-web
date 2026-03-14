import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { BlogTopicPage } from '@/components/blog/BlogTopicPage';
import {
  getBlogTopics,
  getTopicArchiveViewModel,
  getTopicMetadata,
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
  return getTopicMetadata(topic, 1);
}

export default async function BlogTopicArchivePage({
  params,
}: Readonly<BlogTopicArchivePageProps>) {
  const { topic: topicSlug } = await params;
  const topicArchiveViewModel = getTopicArchiveViewModel(topicSlug, 1);

  if (!topicArchiveViewModel) {
    notFound();
  }

  return <BlogTopicPage {...topicArchiveViewModel} />;
}
