import type { Metadata } from 'next';

const baseUrl = (process.env.NEXT_PUBLIC_BASE_URL ?? 'https://eduardo-aparicio-cardenes.website').replace(/\/$/, '');

interface ComingSoonMetadataOptions {
  title: string;
  description: string;
  path: string;
  keywords: string[];
  imageAlt: string;
}

export function createComingSoonMetadata({
  title,
  description,
  path,
  keywords,
  imageAlt,
}: ComingSoonMetadataOptions): Metadata {
  const url = `${baseUrl}${path}`;
  const imageUrl = `${baseUrl}/images/comingsoon.png`;

  return {
    title: `${title} | Eduardo Aparicio Cardenes`,
    description,
    keywords,
    alternates: {
      canonical: path,
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title,
      description,
      url,
      type: 'website',
      locale: 'en_GB',
      siteName: 'Eduardo Aparicio Cardenes Website',
      images: [
        {
          url: imageUrl,
          width: 845,
          height: 384,
          alt: imageAlt,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
      creator: '@eduardoac',
      site: '@eduardoac',
    },
  };
}
