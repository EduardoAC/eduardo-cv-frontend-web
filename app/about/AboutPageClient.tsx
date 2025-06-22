'use client';
import { useEffect } from 'react';
import Image from 'next/image';
import styles from './About.module.scss';
import { initializeAboutMe } from '../lib/about-me';

export default function AboutPageClient() {
  useEffect(() => {
    initializeAboutMe();
  }, []);

  return (
    <section className={styles.about_me}>
      <div className={styles.introduction}>
        <div className={styles.gradient_effect}>
          <Image
            src="/images/about-eduardo-hacktheviual-1280.jpg"
            alt="About Eduardo"
            width={1280}
            height={853}
            className="snap-img-fluid"
            priority
          />
        </div>
        <div className={styles.heading_block}>
          <h1>The Story of Eduardo Aparicio Cardenes</h1>
          <p>
            Hi! I'm Eduardo Aparicio Cardenes. I'm a Web Developer, Software
            architect and Entrepreneur.
          </p>
          <p>
            Currently, I'm co-founder of{' '}
            <a href="http://www.innervirtuoso.com">Inner Virtuoso</a>. Inner
            Virtuoso uses Global Incubator technology to create tailor made
            solutions that boost the development of human capital.
          </p>
          <p>
            And founder of{' '}
            <a href="http://www.dreammakerfactory.com">Dream Maker Factory</a>,
            takes ideas with potential and implement in successful products
            where I have three projects in my pipeline,{' '}
            <a href="http://www.tuocio.org">TuOcio</a>,{' '}
            <a href="http://www.trainerswod.com/">Trainer's WOD</a> and{' '}
            <a href="http://www.proyectoadoptame.es">Proyecto Adoptame</a>.
          </p>
          <p>
            When I'm not doing those things, I'm working for companies as a web
            developer or software architect. I'm always happy to join to your
            projects and make it happens.
          </p>
          <Image
            src="/images/photo-working.jpg"
            alt="Working"
            width={300}
            height={200}
            className="snap-img-fluid img-thumbnail visible-xs visible-lg"
          />
        </div>
      </div>
      <div className={`snap-container ${styles.site_about}`}>
        <h2>How did I started in this world?</h2>
        <p>
          I grew with computers, coding and internet. My mom was informatic
          teacher and my first experience with computers, it was when my mom
          took me to her informatic class when I was 8 years old. After that
          I've been with computers at home all my life, starting for Amstrad
          CPC to My current Intel Core i5, (I used most of the IBM and INTEL as
          186, 286, 486, Pentium I, II, III, IV, etc.)
        </p>
        
        <div className={styles.timeline_section}>
          <h3>My life timeline</h3>
          <p>I believe that a timeline is a good way to represent the progression of my life and career.</p>
          <div className={styles.timeline_image_container}>
            <Image
              src="/images/my-life-timeline.png"
              alt="My Life Timeline"
              width={800}
              height={600}
              className="snap-img-fluid snap-img-thumbnail"
            />
          </div>
        </div>

        <p>
          Since then, I was the first of my school colleges to have the latest
          version of computer at home.
        </p>
        <blockquote className={styles.pull_quote}>
          I mounted my first computer with 14 and fixing computers at 16 years old.
        </blockquote>
        <p>
          I still remember how we used to connect to internet with our Intel
          486 and 28k modem. I knew that technology and internet it was my
          world, create things that other people use filled my soul.
        </p>
        <p>
          Everyone used to ask my about hardware and technologies all the time,
          help, fix and advice was my work until I joined to the university. My
          first year it was the most exited day of my life, from Matemathic
          analysis to build computers, I did a really hard work studing every
          day but I enjoyed every second of my{' '}
          <a
            href="http://www2.ulpgc.es//index.php?pagina=estudios&ver=weees002&tipoplan=&codigo=180_1801_10_00#2"
            rel="nofollow"
          >
            Informatic engineer
          </a>
          .
        </p>
        <div className="snap-grid" style={{ alignItems: 'flex-start', marginTop: '2rem' }}>
          <div className="snap-col snap-col-md-5">
            <Image
              src="/images/eduardo-aparicio-cardenes-graduation.jpg"
              alt="Graduation"
              width={400}
              height={500}
              className="snap-img-fluid"
            />
          </div>
          <div className="snap-col snap-col-md-7">
            <blockquote className={styles.pull_quote}>
              My time in the ULPGC and Rey Juan carlos Universities as the best
              time to exploit and develop my creativity.
            </blockquote>
            <p>
              Many times, I remember how my teachers struggle with me often doing
              more complex solutions that it was required for the exercise that I
              needed to solve it because I want to discover and research.
            </p>
            <blockquote className={styles.pull_quote}>
              I have been different thinking all my life, sometimes wrong and other right.
            </blockquote>
            <p>
              I did a lot of interesting things that open my mind that made me the man who i am
              now. I feel proud of my marks where my only a few low marks was in
              my expedient as you can see about.
            </p>
            <div className={`snap-grid ${styles.marks_container}`}>
              <div className="snap-col snap-col-sm-6">
                <Image
                  src="/images/certificacion-academica-eduardo-aparicio-cardenes-pag_1.jpg"
                  alt="Marks page 1"
                  width={500}
                  height={700}
                  className="snap-img-fluid"
                />
                <p>Eduardo Aparicio Cardenes Marks Page 1</p>
              </div>
              <div className="snap-col snap-col-sm-6">
                <Image
                  src="/images/certificacion-academica-eduardo-aparicio-cardenes-pag_2.jpg"
                  alt="Marks page 2"
                  width={500}
                  height={700}
                  className="snap-img-fluid"
                />
                <p>Eduardo Aparicio Cardenes Marks Page 2</p>
              </div>
            </div>
          </div>
        </div>
        <div className="snap-clearfix"></div>
        <h2>Looking for challenges</h2>
        <blockquote className={styles.pull_quote}>
          You cannot say something because you hear from your enviroment and assume as a fact.
        </blockquote>
        <p>
          My parents usually often said "you are lucky because your time
          studying is the easiest time in your live" that a job is always
          more complex than study.
        </p>
        <blockquote className={styles.pull_quote}>
          I always believe that everything is possible and the facts in my
          all life need to be challenge it.
        </blockquote>
        <p>
          My colleges used to have opposite opinion than me, I usually
          proposed out of box thinking that they weren't capable to
          understand. Examaple, if we clone a dinnosaour we can provide more
          food to each person because we have plenty of plant to feed them.{' '}
          <strong>
            I heared all my life you cannot achieve, it will be impossible.
          </strong>{' '}
          or you are wrong when the time confirmed that I was right
        </p>
        <p>
          I don't know why but I found these things as a challenge every time
          they told me that encourage me to show them that they were wrong.
          Probably this is one of the reasons because. I never give up during
          my studies and achieve every single thing that's comes to my life
        </p>
        <p className={styles.final_thought}>
          I am deeply thanks all the persons in my life that tried to
          discourage me, you helped me to become the person i am today
        </p>
        <Image
          src="/images/eduardo-challenge-complete.jpg"
          alt="Challenge Complete"
          width={800}
          height={600}
          className="snap-img-fluid snap-img-thumbnail"
        />
        <p className={styles.final_thought}>
          I capable to achieve every goal in my life
        </p>
      </div>
      <div className={`snap-container ${styles.site_about}`}>
        <h3>About this site</h3>
        <p>
          This site is a personal project created by Eduardo Aparicio Cardenes.
          It's a place where he shares his thoughts, experiences, and projects
          related to his career and interests.
        </p>
        <p>
          The site is built using Next.js and is hosted on Vercel. It's designed
          to be responsive and accessible, ensuring that it works well on
          different devices and browsers.
        </p>
        <p>
          Eduardo is passionate about web development and enjoys creating
          interactive and visually appealing websites. He believes in the power
          of technology to solve problems and improve people's lives.
        </p>
        <p>
          If you're interested in learning more about Eduardo's work or
          collaborating on a project, you can contact him through the
          contact page on this site.
        </p>
      </div>
    </section>
  );
} 