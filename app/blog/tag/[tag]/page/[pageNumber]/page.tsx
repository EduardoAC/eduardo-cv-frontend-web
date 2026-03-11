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
  params: {
    tag: string;
    pageNumber: string;
  };
}

export const dynamicParams = false;

export async function generateStaticParams() {
  return getAdditionalTagArchivePageParams();
}

export async function generateMetadata({
  params,
}: BlogTagArchivePaginationPageProps): Promise<Metadata> {
  const pageNumber = parsePageNumber(params.pageNumber);

  if (!pageNumber || pageNumber === 1) {
    return {
      title: 'Tag Archive Not Found | Eduardo Aparicio Cardenes',
      description: 'The requested tag archive page could not be found.',
    };
  }

  return getTagArchiveMetadata(params.tag, pageNumber);
}

export default function BlogTagArchivePaginationPage({
  params,
}: Readonly<BlogTagArchivePaginationPageProps>) {
  const pageNumber = parsePageNumber(params.pageNumber);

  if (!pageNumber || pageNumber === 1) {
    notFound();
  }

  const archiveViewModel = getTagArchiveViewModel(params.tag, pageNumber);

  if (!archiveViewModel) {
    notFound();
  }

  return <BlogArchivePage {...archiveViewModel} />;
}
