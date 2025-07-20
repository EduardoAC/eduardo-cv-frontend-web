import styles from './MentorProfile.module.scss';
import { mentorPlatforms, certificate, intro } from './data';
import ReviewsGrid from './ReviewsGrid';
import adplistReviews from './adplist-reviews.json';
import mentoringClubReviews from './mentoring-club-reviews.json';
import Container from '@/components/layout/Container';

export const metadata = {
  title: 'Mentor Profile | Eduardo Aparicio Cárdenes',
  description: 'Mentoring experience, platforms, and testimonials for Eduardo Aparicio Cárdenes. See where I mentor, read reviews, and view my mentoring certificate.'
};

export default function MentorProfilePage() {
  return (
    <Container className={styles.mentorProfile} variant="default" padding="medium">
      <h1 className='text-align-center'>Mentor Profile</h1>
      <p>{intro}</p>

      {mentorPlatforms.map(platform => {
        let reviews = null;
        if (platform.name === 'ADPList') reviews = adplistReviews;
        if (platform.name === 'Mentoring Club') reviews = mentoringClubReviews;
        return (
          <section key={platform.name} className={styles.platformSection}>
            <div className={styles.platformHeader}>
              <img src={platform.logo} alt={platform.name} width={platform.logoWidth}/>
              <h2>
                <a href={platform.url} target="_blank" rel="noopener noreferrer" className={styles.bookSession}>Book a session</a>
              </h2>
            </div>
            <p>{platform.description}</p>
            {platform.bookingWidget && (
              <div style={{ margin: '2rem 0' }} dangerouslySetInnerHTML={{ __html: platform.bookingWidget }} />
            )}
            {reviews && (
              <div className={styles.reviewsSection}>
                <h3>Reviews</h3>
                <ReviewsGrid reviews={reviews} />
              </div>
            )}
          </section>
        );
      })}

      <section className={styles.certificateSection}>
        <h2>Certificate</h2>
        <a href={certificate.file} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', textAlign: 'center' }}>
          <img src={certificate.preview} alt="Mentoring Excellence Certificate Preview" style={{ width: 200, marginBottom: 8, borderRadius: 8 }} />
          <br />
          <span>{certificate.description}</span>
        </a>
      </section>
    </Container>
  );
} 