import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import VersionedFrontendProfile from '@/app/frontend-profile/VersionedFrontendProfile';
import {
  getFrontendProfileVersion,
  getFrontendProfileVersions,
  type FrontendProfileVersionId,
} from '@/app/frontend-profile/data';
import { generateMetadata as generateProfileMetadata } from '@/components/ProfilePage';

interface PageProps {
  params: {
    version: string;
  };
}

export const dynamicParams = false;

export async function generateStaticParams() {
  return getFrontendProfileVersions().map((version) => ({
    version: version.id,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const versionId = params.version as FrontendProfileVersionId;
  const activeVersion = getFrontendProfileVersion(versionId);

  if (!activeVersion) {
    return {
      title: 'Frontend Profile',
      description: 'The requested frontend profile version could not be found.',
    };
  }

  return generateProfileMetadata({
    role: 'frontend',
    title: `${activeVersion.title} - ${activeVersion.label}`,
    description: activeVersion.description,
    openGraphImage: activeVersion.openGraphImage,
    introduction: activeVersion.introduction,
    strengths: activeVersion.strengths,
    linkedInUrl: 'https://www.linkedin.com/in/eacardenes',
  });
}

export default function FrontendProfileVersionPage({ params }: PageProps) {
  const versionId = params.version as FrontendProfileVersionId;
  const activeVersion = getFrontendProfileVersion(versionId);

  if (!activeVersion) {
    notFound();
  }

  const versions = getFrontendProfileVersions();

  return (
    <VersionedFrontendProfile
      activeVersion={activeVersion}
      versions={versions}
    />
  );
}
