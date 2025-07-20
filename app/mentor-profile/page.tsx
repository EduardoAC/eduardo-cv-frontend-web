import styles from './MentorProfile.module.scss';
import { mentorPlatforms, certificate, intro } from './data';

export const metadata = {
  title: 'Mentor Profile | Eduardo Aparicio Cárdenes',
  description: 'Mentoring experience, platforms, and testimonials for Eduardo Aparicio Cárdenes. See where I mentor, read reviews, and view my mentoring certificate.'
};

export default function MentorProfilePage() {
  return (
    <div className={`${styles.mentorProfile}`}>
      <h1 className='text-align-center'>Mentor Profile</h1>
      <p>{intro}</p>

      {mentorPlatforms.map(platform => (
        <section key={platform.name} className={styles.platformSection}>
          <div className={styles.platformHeader}>
            <img src={platform.logo} alt={platform.name} style={{ width: 80, height: 'auto', marginBottom: 8 }} />
            <h2>
              <a href={platform.url} target="_blank" rel="noopener noreferrer">{platform.name}</a>
            </h2>
          </div>
          <p>{platform.description}</p>
          {platform.reviewsEmbed && (
            <div dangerouslySetInnerHTML={{ __html: platform.reviewsEmbed }} />
          )}
          {platform.reviewsUrl && (
            <a href={platform.reviewsUrl} target="_blank" rel="noopener noreferrer">See Reviews</a>
          )}
        </section>
      ))}

      <section className={styles.certificateSection}>
        <h2>Certificate</h2>
        <a href={certificate.file} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', textAlign: 'center' }}>
          <img src={certificate.preview} alt="Mentoring Excellence Certificate Preview" style={{ width: 200, marginBottom: 8, borderRadius: 8 }} />
          <br />
          <span>{certificate.description}</span>
        </a>
      </section>
    </div>
  );
} 