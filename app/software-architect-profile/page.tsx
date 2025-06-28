import ProfilePage from '@/components/ProfilePage';
import { getProfileData } from '@/lib/profile-data';

export default function SoftwareArchitectProfilePage() {
  const profileData = getProfileData('software-architect');
  
  return (
    <ProfilePage
      role="software-architect"
      title={profileData.title}
      description={profileData.description}
      openGraphImage={profileData.openGraphImage}
      introduction={profileData.introduction}
      strengths={profileData.strengths}
      linkedInUrl={profileData.linkedInUrl}
    />
  );
} 