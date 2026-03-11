import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { BlogArchivePage } from '@/components/blog/BlogArchivePage';
import {
  getMeaningfulTagArchiveSummaries,
  getTagArchiveMetadata,
  getTagArchiveViewModel,
} from '@/lib/blog/archive';

interface BlogTagArchivePageProps {
  params: {
    tag: string;
  };
}

export const dynamicParams = false;

export async function generateStaticParams() {
  return getMeaningfulTagArchiveSummaries().map((tagArchive) => ({
    tag: tagArchive.slug,
  }));
}

export async function generateMetadata({
  params,
}: BlogTagArchivePageProps): Promise<Metadata> {
  return getTagArchiveMetadata(params.tag, 1);
}

export default function BlogTagArchivePage({
  params,
}: Readonly<BlogTagArchivePageProps>) {
  const archiveViewModel = getTagArchiveViewModel(params.tag, 1);

  if (!archiveViewModel) {
    notFound();
  }

  return <BlogArchivePage {...archiveViewModel} />;
}
