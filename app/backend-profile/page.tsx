import ProfilePage from '@/components/ProfilePage';
import { getProfileData } from '@/lib/profile-data';

export default function BackendProfilePage() {
  const profileData = getProfileData('backend');
  
  return (
    <ProfilePage
      role="backend"
      title={profileData.title}
      description={profileData.description}
      openGraphImage={profileData.openGraphImage}
      introduction={profileData.introduction}
      strengths={profileData.strengths}
      linkedInUrl={profileData.linkedInUrl}
    />
  );
} 