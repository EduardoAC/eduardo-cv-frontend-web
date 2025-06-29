import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ProfilePage, { generateMetadata as generateProfileMetadata } from '@/components/ProfilePage';
import { getProfileData, getAllProfileRoles } from '@/lib/profile-data';

interface PageProps {
  params: {
    role: string;
  };
}

export async function generateStaticParams() {
  const roles = getAllProfileRoles();
  return roles.map((role) => ({
    role: role,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { role } = params;
  
  try {
    const profileData = getProfileData(role as any);
    return generateProfileMetadata({
      role: role as any,
      title: profileData.title,
      description: profileData.description,
      openGraphImage: profileData.openGraphImage,
      introduction: profileData.introduction,
      strengths: profileData.strengths,
      linkedInUrl: profileData.linkedInUrl,
    });
  } catch (error) {
    return {
      title: 'Profile Not Found',
      description: 'The requested profile could not be found.',
    };
  }
}

export default function ProfilePageRoute({ params }: PageProps) {
  const { role } = params;
  
  try {
    const profileData = getProfileData(role as any);
    
    return (
      <ProfilePage
        role={role as any}
        title={profileData.title}
        description={profileData.description}
        openGraphImage={profileData.openGraphImage}
        introduction={profileData.introduction}
        strengths={profileData.strengths}
        linkedInUrl={profileData.linkedInUrl}
      />
    );
  } catch (error) {
    notFound();
  }
} 