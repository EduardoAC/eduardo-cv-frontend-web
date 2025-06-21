import type { Metadata } from 'next';
import Link from 'next/link';
import ContentBlock from '@/components/ContentBlock';
import { strengths } from './data';
import styles from './FrontendProfile.module.scss';

export const metadata: Metadata = {
  title: 'My Frontend background - Eduardo Aparicio Cardenes',
  description:
    'My frontend background is currently growing with elements as AngularJS, SVG, Grunt, etc. Here you will see my skills from my five years as web developer',
  openGraph: {
    images: ['/images/frontend-developer.png'],
  },
};

export default function FrontendProfilePage() {
  return (
    <article className={`container ${styles.frontend_profile}`}>
      <h1>My Frontend Developer Background</h1>
      <section className={styles.introduction}>
        <p>
          My first steps on Internet started as freelance web developer creating
          websites for companies that involves four main skills HTML, CSS,
          JAVASCRIPT and PHP in my case. However Internet technologies have
          being growing in complexity since I did my first websites at begining
          of 2011. As a informatic engineer I knew the importance to specialize
          to be the best in your area.
        </p>
        <p>
          That's why I decided to focus more my profesional career next steps
          in this wonderful discipline without forget my past. Therefore, to my
          current knowledge growing as frontend developer I want to high line
          my extensive experience as{' '}
          <Link href="/software-architect-profile">Software architect</Link> and{' '}
          <Link href="/backend-profile">Backend developer</Link> as a
          complement of my skills that allow me to deeply aware for the global
          vision of the designs and comunicate effectively with other teams.
        </p>
        <p>
          Currently, I'm developing my knowledge in this area, in specific in
          <strong>
            AngularJS, SVG, performance and testing with frameworks as Jasmine.
          </strong>
          What are my strengths as a frontend developer?
        </p>
      </section>
      <section className={styles.my_frontend_skills}>
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