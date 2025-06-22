import type { Metadata } from 'next';
import ContentBlock from '@/components/ContentBlock';
import { strengths } from './data';
import styles from './SoftwareArchitectProfile.module.scss';

export const metadata: Metadata = {
  title: 'My Software Architect background - Eduardo Aparicio Cardenes',
  description:
    "I'm a informatic engineer that I specialized in software architectures that I use in my daily basic to improve the quality of the software I deliver to my clients",
  openGraph: {
    images: ['/images/software-architect.png'],
  },
};

export default function SoftwareArchitectProfilePage() {
  return (
    <article className={`snap-container ${styles.software_architect_profile}`}>
      <h1>My Software Architect Background</h1>
      <section className={styles.introduction}>
        <p>
          I'm a certified Informatic Engineer that have been trained ready to
          build technical software and hardware architectures that I loved the
          very beginning dreaming to build the best PC ever imagine from the
          hardware to the software that will extract all the potential.
        </p>
        <p>
          However, I realised soon that this goal is a team effort, it's
          impossible to achieve it on your own in a lifespawn, so I decided to
          focus in a more realistic approach to become a really good Software
          architect that deliver high quality job.
        </p>
        <p>
          My firsts jobs as developer started to design, build and implement
          components and entire enviroments as websites or libraries in bigger
          projects as a Business intelligence module or Filtering systems of
          Big Data information.
        </p>
        <p>
          As far I remember I've always been a developer that built a special
          trust with my bosses each time to allow me to put in place well
          designed solutions for all the platforms I've been working in my
          professional career. I feel deeply grateful for that, they gave my
          the chance to improve my software architect skills.
        </p>
      </section>
      <section className={styles.my_software_engineer_skills}>
        <hr />
        {strengths.map((data, index) => (
          <>
            <ContentBlock {...data} odd={index % 2 === 0} key={data.title} />
            <hr />
          </>
        ))}
        <a
          href="https://www.linkedin.com/in/eacardenes"
          rel="nofollow"
          target="_blank"
        >
          <p className={styles.conclusion}>Would you like to know more?</p>
        </a>
      </section>
    </article>
  );
} 