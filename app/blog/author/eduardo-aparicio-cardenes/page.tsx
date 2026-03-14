import type { Metadata } from 'next';
import BlogAuthorPage from '@/components/blog/BlogAuthorPage';
import {
  getAbsoluteBlogAssetUrl,
  getBlogAuthor,
  getBlogAuthorStructuredData,
  getPostsByPrimaryBlogAuthor,
} from '@/lib/blog/author';

export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://eduardo-aparicio-cardenes.website';
  const author = getBlogAuthor(baseUrl);
  const imageUrl = getAbsoluteBlogAssetUrl(author.image.src, baseUrl);

  return {
    title: `${author.name} | Blog Author`,
    description: author.description,
    authors: [{ name: author.name, url: author.url }],
    alternates: {
      canonical: author.url,
    },
    openGraph: {
      title: `${author.name} | Blog Author`,
      description: author.description,
      type: 'profile',
      url: author.url,
      images: [
        {
          url: imageUrl,
          width: author.image.width,
          height: author.image.height,
          alt: author.image.alt,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${author.name} | Blog Author`,
      description: author.description,
      images: [imageUrl],
      creator: '@eduardoac',
      site: '@eduardoac',
    },
  };
}

export default function BlogAuthorRoutePage() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://eduardo-aparicio-cardenes.website';

  return (
    <BlogAuthorPage
      posts={getPostsByPrimaryBlogAuthor()}
      structuredData={getBlogAuthorStructuredData(baseUrl)}
    />
  );
}
