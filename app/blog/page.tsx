import { notFound } from 'next/navigation';
import { BlogArchivePage } from '@/components/blog/BlogArchivePage';
import { getBlogArchiveMetadata, getBlogArchiveViewModel } from '@/lib/blog/archive';

export const metadata = getBlogArchiveMetadata(1);

export default function BlogPage() {
  const archiveViewModel = getBlogArchiveViewModel(1);

  if (!archiveViewModel) {
    notFound();
  }

  return <BlogArchivePage {...archiveViewModel} />;
}
