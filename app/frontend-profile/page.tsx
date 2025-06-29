import ProfilePage from '@/components/ProfilePage';
import { getProfileData } from '@/lib/profile-data';

export default function FrontendProfilePage() {
  const profileData = getProfileData('frontend');
  
  return (
    <ProfilePage
      role="frontend"
      title={profileData.title}
      description={profileData.description}
      openGraphImage={profileData.openGraphImage}
      introduction={profileData.introduction}
      strengths={profileData.strengths}
      linkedInUrl={profileData.linkedInUrl}
    />
  );
} 