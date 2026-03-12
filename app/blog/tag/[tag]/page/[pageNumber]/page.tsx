import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { BlogArchivePage } from '@/components/blog/BlogArchivePage';
import {
  getAdditionalTagArchivePageParams,
  getTagArchiveMetadata,
  getTagArchiveViewModel,
  parsePageNumber,
} from '@/lib/blog/archive';

interface BlogTagArchivePaginationPageProps {
  params: Promise<{
    tag: string;
    pageNumber: string;
  }>;
}

export const dynamicParams = false;

export async function generateStaticParams() {
  return getAdditionalTagArchivePageParams();
}

export async function generateMetadata({
  params,
}: BlogTagArchivePaginationPageProps): Promise<Metadata> {
  const { tag, pageNumber: rawPageNumber } = await params;
  const pageNumber = parsePageNumber(rawPageNumber);

  if (!pageNumber || pageNumber === 1) {
    return {
      title: 'Tag Archive Not Found | Eduardo Aparicio Cardenes',
      description: 'The requested tag archive page could not be found.',
    };
  }

  return getTagArchiveMetadata(tag, pageNumber);
}

export default async function BlogTagArchivePaginationPage({
  params,
}: Readonly<BlogTagArchivePaginationPageProps>) {
  const { tag, pageNumber: rawPageNumber } = await params;
  const pageNumber = parsePageNumber(rawPageNumber);

  if (!pageNumber || pageNumber === 1) {
    notFound();
  }

  const archiveViewModel = getTagArchiveViewModel(tag, pageNumber);

  if (!archiveViewModel) {
    notFound();
  }

  return <BlogArchivePage {...archiveViewModel} />;
}
