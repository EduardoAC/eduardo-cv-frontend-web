import type { Metadata } from 'next';
import Link from 'next/link';
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
      <section className="snap-container introduction">
        <h1>My Work Experience</h1>
        <p>
          I've been working as web developer for almost five years switched from
          a software engineer job because I found more attractive for my
          professional career. Therefore, in this page you will find the big
          picture of my evolution as a web developer, where I decided to
          include my principal studies that put me away for a long period of
          time for work world in order to develop better my skills.
        </p>
        <p>
          Essentially, in these years I learned how to build and develop
          platforms where I acquired backend and frontend knowledge to do more
          effective my job in these companies. However, my team managers decided
          in a intuitive way always to assign me more tasks related with
          frontend in the last three years. It's probably then when I discovered
          that I really enjoyed doing this work.
        </p>
        <p>
          Currently{' '}
          <strong>
            I decided that I want to become a successful frontend engineer
          </strong>
          , I feel that it's my true vocation bring alive the amazing design
          comming from the designers so please scroll down to see my evolution
          across my work timeline .
        </p>
      </section>
      <section className="snap-container">
        <div className={styles.my_experience_timeline}>
          <div className="snap-container">
            {experienceList.map((experience) => (
              <ExperienceBlock key={experience.company} {...experience} />
            ))}
          </div>
        </div>
      </section>
      <section className="snap-container conclusion">
        <p>
          If you want to ask me, please feel free to{' '}
          <Link href="/contact">contact me</Link> or drop me a{' '}
          <a href="mailto:eduardo@dreammakerfactory.com">email</a>. I will be
          happy to answer any question, offer or consideration as soon as
          possible
        </p>
      </section>
    </article>
  );
} 