import type { Metadata } from 'next';
import { getBlogAuthor } from '@/lib/blog/author';
import ProjectsPage from './ProjectsPage';
import { getVisibleProjectEntries } from './data';

const baseUrl = (process.env.NEXT_PUBLIC_BASE_URL ?? 'https://eduardo-aparicio-cardenes.website').replace(/\/$/, '');
const pagePath = '/projects';
const pageUrl = `${baseUrl}${pagePath}`;
const imagePath = '/images/code-projects-done-optimized-1280.webp';
const imageUrl = `${baseUrl}${imagePath}`;
const pageTitle = 'Projects, Open Source and Hackathons | Eduardo Aparicio Cardenes';
const pageDescription =
  'Explore the projects, open-source tools, hackathons, and product experiments created by Eduardo Aparicio Cardenes across frontend engineering, developer experience, and platform design.';

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  keywords: [
    'Eduardo Aparicio Cardenes projects',
    'Eduardo Aparicio Cardenes portfolio',
    'Eduardo Aparicio Cardenes open source',
    'frontend engineer projects',
    'open source frontend tooling',
    'hackathon projects portfolio',
    'API client generation tools',
    'browser extension boilerplate',
  ],
  alternates: {
    canonical: pagePath,
  },
  openGraph: {
    title: 'Projects by Eduardo Aparicio Cardenes',
    description:
      'Explore featured projects, open-source tooling, hackathon work, and product experiments across frontend engineering, developer experience, and platform thinking.',
    url: pageUrl,
    type: 'website',
    locale: 'en_GB',
    images: [
      {
        url: imageUrl,
        width: 1280,
        height: 853,
        alt: 'Illustration of software projects and engineering work by Eduardo Aparicio Cardenes',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Projects by Eduardo Aparicio Cardenes',
    description:
      'Explore featured projects, open-source tooling, hackathon work, and product experiments across frontend engineering, developer experience, and platform thinking.',
    images: [imageUrl],
    creator: '@eduardoac',
    site: '@eduardoac',
  },
};

const buildStructuredData = () => {
  const author = getBlogAuthor(baseUrl);
  const visibleProjects = getVisibleProjectEntries();

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': `${pageUrl}#collection`,
        url: pageUrl,
        name: 'Projects, Open Source and Hackathons',
        description: pageDescription,
        mainEntity: {
          '@id': `${pageUrl}#itemlist`,
        },
        about: {
          '@id': `${pageUrl}#person`,
        },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${pageUrl}#breadcrumbs`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: baseUrl,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Projects',
            item: pageUrl,
          },
        ],
      },
      {
        '@type': 'ItemList',
        '@id': `${pageUrl}#itemlist`,
        itemListOrder: 'https://schema.org/ItemListOrderAscending',
        numberOfItems: visibleProjects.length,
        itemListElement: visibleProjects.map((project, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          item: {
            '@type': 'CreativeWork',
            '@id': `${pageUrl}#${project.slug}`,
            name: project.title,
            description: project.summary,
            url: `${pageUrl}#${project.slug}`,
            keywords: project.techTags.join(', '),
          },
        })),
      },
      {
        '@type': 'Person',
        '@id': `${pageUrl}#person`,
        name: author.name,
        url: author.url,
        image: `${baseUrl}${author.image.src}`,
        sameAs: author.sameAs,
        jobTitle: author.jobTitle,
        description: author.bio,
        knowsAbout: author.expertise,
      },
    ],
  };
};

export default function ProjectsRoutePage() {
  const structuredData = buildStructuredData();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <ProjectsPage />
    </>
  );
}
