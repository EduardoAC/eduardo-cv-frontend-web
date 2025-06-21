import type { Metadata } from 'next';
import ContentBlock from '@/components/ContentBlock';
import { strengths } from './data';
import styles from './BackendProfile.module.scss';

export const metadata: Metadata = {
  title: 'My Backend background - Eduardo Aparicio Cardenes',
  description:
    'I like the backend world as part of the WWW enviroment, I got involved for the last five years. I learned php, mysql and more. Access to know where i specialize',
  openGraph: {
    images: ['/images/backend-developer.png'],
  },
};

export default function BackendProfilePage() {
  return (
    <article className={`container ${styles.backend_profile}`}>
      <h1>My Backend Developer Background</h1>
      <section className={styles.introduction}>
        <p>
          I did backend developments as web developer for many years and I'm
          still doing sometimes when it's required. It's a part of myself to
          try to achieve the best result possible doing when need to be done.
          I've involved in this area for the last five years sometimes as a
          contractor, a employee and others in my personal projects. I
          understand well how the back end works and how to build it from
          scratch.
        </p>
        <p>
          Also, if I currently want to specialize as frontend developer, I can
          provide experience and vision to develop together a great platform
          that helps us to achieve our goal together.
        </p>
        <p>
          Consequently, I like to do backend work as well as frontend because
          all it's about this WWW world that I have passion about it. Therefore
          I won't hesitate to get involved myself when you ask me for. Here is
          my backend background so i hope you find useful because it's a great
          complement for a frontend developer have comprehesion and
          understanding the language the backend developers speaks.
        </p>
      </section>
      <section className={styles.my_backend_skills}>
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