import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { BlogArchivePage } from '@/components/blog/BlogArchivePage';
import {
  getMeaningfulTagArchiveSummaries,
  getTagArchiveMetadata,
  getTagArchiveViewModel,
} from '@/lib/blog/archive';

interface BlogTagArchivePageProps {
  params: Promise<{
    tag: string;
  }>;
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
  const { tag } = await params;
  return getTagArchiveMetadata(tag, 1);
}

export default async function BlogTagArchivePage({
  params,
}: Readonly<BlogTagArchivePageProps>) {
  const { tag } = await params;
  const archiveViewModel = getTagArchiveViewModel(tag, 1);

  if (!archiveViewModel) {
    notFound();
  }

  return <BlogArchivePage {...archiveViewModel} />;
}
