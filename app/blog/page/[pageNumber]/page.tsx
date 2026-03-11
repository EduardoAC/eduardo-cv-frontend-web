import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { BlogArchivePage } from '@/components/blog/BlogArchivePage';
import {
  getAdditionalBlogArchivePageNumbers,
  getBlogArchiveMetadata,
  getBlogArchiveViewModel,
  parsePageNumber,
} from '@/lib/blog/archive';

interface BlogArchivePaginationPageProps {
  params: {
    pageNumber: string;
  };
}

export const dynamicParams = false;

export async function generateStaticParams() {
  return getAdditionalBlogArchivePageNumbers().map((pageNumber) => ({
    pageNumber: String(pageNumber),
  }));
}

export async function generateMetadata({
  params,
}: BlogArchivePaginationPageProps): Promise<Metadata> {
  const pageNumber = parsePageNumber(params.pageNumber);

  if (!pageNumber || pageNumber === 1) {
    return {
      title: 'Blog Archive Not Found | Eduardo Aparicio Cardenes',
      description: 'The requested blog archive page could not be found.',
    };
  }

  return getBlogArchiveMetadata(pageNumber);
}

export default function BlogArchivePaginationPage({
  params,
}: Readonly<BlogArchivePaginationPageProps>) {
  const pageNumber = parsePageNumber(params.pageNumber);

  if (!pageNumber || pageNumber === 1) {
    notFound();
  }

  const archiveViewModel = getBlogArchiveViewModel(pageNumber);

  if (!archiveViewModel) {
    notFound();
  }

  return <BlogArchivePage {...archiveViewModel} />;
}
