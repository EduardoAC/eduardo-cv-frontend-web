import type { Metadata } from 'next';
import ProfilePage, { generateMetadata as generateProfileMetadata } from '@/components/ProfilePage';
import { getProfileData } from '@/lib/profile-data';

const ROLE = 'software-architect';

export const dynamicParams = false;

export async function generateMetadata(): Promise<Metadata> {
  const profileData = getProfileData(ROLE);

  return generateProfileMetadata({
    role: ROLE,
    title: profileData.title,
    description: profileData.description,
    openGraphImage: profileData.openGraphImage,
    introduction: profileData.introduction,
    strengths: profileData.strengths,
    linkedInUrl: profileData.linkedInUrl,
  });
}

export default function SoftwareArchitectProfilePage() {
  const profileData = getProfileData(ROLE);

  return (
    <ProfilePage
      role={ROLE}
      title={profileData.title}
      description={profileData.description}
      openGraphImage={profileData.openGraphImage}
      introduction={profileData.introduction}
      strengths={profileData.strengths}
      linkedInUrl={profileData.linkedInUrl}
    />
  );
}
