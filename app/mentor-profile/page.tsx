import React from 'react';
import dynamic from 'next/dynamic';
import styles from './MentorProfile.module.scss';
import { mentorPlatforms, certificate } from './data';
import ReviewsGrid from './ReviewsGrid';
import adplistReviews from './adplist-reviews.json';
import mentoringClubReviews from './mentoring-club-reviews.json';
import Container from '@/components/layout/Container';

const BookingModalClient = dynamic(() => import('./BookingModalClient'), { ssr: false });

export const metadata = {
  title: 'Mentor Profile | Eduardo Aparicio Cárdenes',
  description: 'Mentoring experience, platforms, and testimonials for Eduardo Aparicio Cárdenes. See where I mentor, read reviews, and view my mentoring certificate.',
  openGraphImage: '/images/mentor-profile.webp',
  linkedInUrl: 'https://www.linkedin.com/in/eacardenes',
};

export default function MentorProfilePage() {
  return (
    <Container className={styles.mentorProfile} variant="default" padding="medium">
      <h1 className='text-align-center'>Mentor Profile</h1>
      <section className={styles.introduction}>
        <p>
          Excited to share my knowledge and experience with you on your frontend development journey.
          With over 15 years in the field. With deep expertise in HTML, CSS, JavaScript, and modern 
          technologies like React, Webpack, and Chrome Extensions. I’m here to guide you through the 
          essential (and advanced!) tools of frontend development.
        </p>
        <p>
          My mission as a mentor is simple: help you build real-world skills, write clean code, and grow confidently
          into your role as a frontend developer.
        </p>
        <p>
          Mentorship for me is more than just answering questions — it’s about helping you think like a developer,
          debug smarter, and build with confidence.
        </p>
        <h2 className="heading4">What I Help With</h2>
        <ul>
          <li>
            <strong>🧱 Core Skills:</strong> Solid foundation in HTML, CSS, and modern JavaScript (ES6+)
          </li>
          <li>
            <strong>⚛️ Frameworks & Tooling:</strong> React, Webpack, Next.js, and more
          </li>
          <li>
            <strong>📱 Responsive Design:</strong> Build layouts that work across all screen sizes
          </li>
          <li>
            <strong>🔧 Collaboration & Git:</strong> Version control and team workflows with Git and GitHub
          </li>
          <li>
            <strong>⚡ Performance:</strong> Optimize for speed, accessibility, and best practices
          </li>
          <li>
            <strong>🧪 Testing:</strong> Write maintainable unit and end-to-end tests using Jest, Cypress, and Enzyme
          </li>
        </ul>

        <p><strong>Let’s create together, and level up your frontend journey.</strong></p>
      </section>

      {mentorPlatforms.map(platform => {
        let reviews = null;
        if (platform.name === 'ADPList') reviews = adplistReviews;
        if (platform.name === 'Mentoring Club') reviews = mentoringClubReviews;
        return (
          <section key={platform.name} className={styles.platformSection}>
            <div className={styles.platformHeader}>
              <img src={platform.logo} alt={platform.name} width={platform.logoWidth} />
              <h2>
                <BookingModalClient platform={platform} />
              </h2>
            </div>
            <p>{platform.description}</p>
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