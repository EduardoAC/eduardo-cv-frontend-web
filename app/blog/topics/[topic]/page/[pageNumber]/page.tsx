import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { BlogTopicPage } from '@/components/blog/BlogTopicPage';
import { parsePageNumber } from '@/lib/blog/pagination';
import {
  getAdditionalTopicArchivePageParams,
  getTopicArchiveViewModel,
  getTopicMetadata,
} from '@/lib/blog/topics';

interface BlogTopicArchivePaginationPageProps {
  params: Promise<{
    topic: string;
    pageNumber: string;
  }>;
}

export const dynamicParams = false;

export async function generateStaticParams() {
  return getAdditionalTopicArchivePageParams();
}

export async function generateMetadata({
  params,
}: BlogTopicArchivePaginationPageProps): Promise<Metadata> {
  const { topic, pageNumber: rawPageNumber } = await params;
  const pageNumber = parsePageNumber(rawPageNumber);

  if (!pageNumber || pageNumber === 1) {
    return {
      title: 'Topic Not Found | Eduardo Aparicio Cardenes',
      description: 'The requested topic page could not be found.',
    };
  }

  return getTopicMetadata(topic, pageNumber);
}

export default async function BlogTopicArchivePaginationPage({
  params,
}: Readonly<BlogTopicArchivePaginationPageProps>) {
  const { topic, pageNumber: rawPageNumber } = await params;
  const pageNumber = parsePageNumber(rawPageNumber);

  if (!pageNumber || pageNumber === 1) {
    notFound();
  }

  const topicArchiveViewModel = getTopicArchiveViewModel(topic, pageNumber);

  if (!topicArchiveViewModel) {
    notFound();
  }

  return <BlogTopicPage {...topicArchiveViewModel} />;
}
