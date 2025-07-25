import type { Metadata } from 'next';
import Link from 'next/link';
import Container from '@/components/layout/Container';
import ExperienceBlock from './ExperienceBlock';
import { experienceList } from './data';
import styles from './MyExperience.module.scss';

export const metadata: Metadata = {
  title: 'My Work Experience - Eduardo Aparicio Cardenes',
  description: 'My Work Experience',
};

export default function MyExperiencePage() {
  return (
    <article className={styles.my_experience}>
      <Container variant="default" padding="large" className="introduction">
        <h1 className='heading1'>My Work Experience</h1>
        <p>
          I have been working in the web development industry for over a decade.
          During this time, I have had the opportunity to work with amazing
          companies and teams, learning and growing both professionally and
          personally.
        </p>
        <p>
          Here you can find a timeline of my work experience, including the
          companies I have worked for, the positions I have held, and the
          projects I have been involved in.
        </p>
      </Container>
      <section className={styles.experience_timeline}>
        <Container variant="default" padding="medium">
          <div className={styles.timeline}>
            {experienceList.map((experience, index) => (
              <ExperienceBlock key={index} {...experience} />
            ))}
          </div>
        </Container>
      </section>
      <Container variant="default" padding="large" className="conclusion">
        <h2>What's Next?</h2>
        <p>
          I'm always looking for new challenges and opportunities to grow. If you
          think I could be a good fit for your team or project, please{' '}
          <Link href="/contact">get in touch</Link>.
        </p>
      </Container>
    </article>
  );
}