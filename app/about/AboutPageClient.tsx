"use client";
import { useEffect } from "react";
import Image from "next/image";
import styles from "./About.module.scss";
import { initializeAboutMe } from "../lib/about-me";

export default function AboutPageClient() {
  useEffect(() => {
    initializeAboutMe();
  }, []);

  return (
    <section className={styles.about_me}>
      <div className={styles.introduction}>
        <div className={styles.gradient_effect}>
          <Image
            src="/images/about-eduardo-hacktheviual-1280-optimized-1280.webp"
            alt="About Eduardo"
            width={1280}
            height={853}
            className="snap-img-fluid"
            priority
          />
        </div>
        <div className={`${styles.heading_block} snap-container`}>
          <h1 className='heading2'>The Story of Eduardo Aparicio Cardenes</h1>
          <p>
            Hi! I&apos;m Eduardo Aparicio Cardenes. I&apos;m a Web Developer, Software
            architect and Entrepreneur.
          </p>
          <p>
            Currently, I&apos;m co-founder of{" "}
            <a href="https://www.innervirtuoso.com">Inner Virtuoso</a>. Inner
            Virtuoso uses Global Incubator technology to create tailor made
            solutions that boost the development of human capital.
          </p>
          <p>
            And founder of{" "}
            <a href="https://www.dreammakerfactory.com">Dream Maker Factory</a>,
            takes ideas with potential and implement in successful products
            where I have three projects in my pipeline,{" "}
            <a href="https://www.tuocio.org">TuOcio</a>,{" "}
            <a href="https://www.trainerswod.com/">Trainer&apos;s WOD</a> and{" "}
            <a href="https://www.proyectoadoptame.es">Proyecto Adoptame</a>.
          </p>
          <p>
            When I&apos;m not doing those things, I&apos;m working for companies as a web
            developer or software architect. I&apos;m always happy to join to your
            projects and make it happens.
          </p>
          <div className={`${styles.centered_image_container} hidden-bigger-lg`}>
            <Image
              src="/images/photo-working-optimized-1280.webp"
              alt="Working"
              width={400}
              height={267}
              className="snap-img-fluid snap-img-thumbnail"
            />
          </div>
        </div>
      </div>

      <div className={styles.timeline_section}>
        <div className="snap-container">
          <div className={styles.site_about}>
            <h2>How did I started in this world?</h2>
            <p>
              I grew with computers, coding and internet. My mom was
              informatic teacher and my first experience with computers, it
              was when my mom took me to her informatic class when I was 8
              years old. After that I&apos;ve been with computers at home all my
              life, starting for Amstrad CPC to My current Intel Core i5, (I
              used most of the IBM and INTEL as 186, 286, 486, Pentium I, II,
              III, IV, etc.)
            </p>
          </div>
          <div className={styles.timeline_image_container}>
            <Image
              src="/images/my-life-timeline-optimized-1280.webp"
              alt="My Life Timeline"
              width={800}
              height={600}
              className="snap-img-fluid snap-img-thumbnail"
            />
          </div>
        </div>
      </div>

      <div className="snap-container">
        <div className={styles.site_about}>
          <p>
            Since then, I was the first of my school colleges to have the latest
            version of computer at home.
          </p>
          <blockquote className={styles.pull_quote}>
            You cannot say something because you hear from your enviroment and
            assume as a fact.
          </blockquote>
          <p>
            My colleges used to have opposite opinion than me, I usually
            proposed out of box thinking that they weren&apos;t capable to
            understand. Examaple, if we clone a dinnosaour we can provide more
            food to each person because we have plenty of plant to feed them.{" "}
            <strong>
              I heared all my life you cannot achieve, it will be impossible.
            </strong>{" "}
            or you are wrong when the time confirmed that I was right
          </p>
          <p>
            I don&apos;t know why but I found these things as a challenge every time
            they told me that encourage me to show them that they were wrong.
            Probably this is one of the reasons because. I never give up during
            my studies and achieve every single thing that&apos;s comes to my life
          </p>
          <p className={`${styles.final_thought} heading2`}>
            I am deeply thanks all the persons in my life that tried to
            discourage me, you helped me to become the person i am today
          </p>
          <Image
            src="/images/eduardo-challenge-complete-optimized-1280.webp"
            alt="Challenge Complete"
            width={500}
            height={458}
            className="snap-img-fluid snap-img-thumbnail"
          />
          <p className={styles.final_thought}>
            I capable to achieve every goal in my life
          </p>
        </div>
      </div>
      <div className={styles.site_about_last}>
        <div className={`snap-container ${styles.site_about}`}>
          <h3>About this site</h3>
          <p>
            This site is a personal project created by Eduardo Aparicio Cardenes.
            It&apos;s a place where he shares his thoughts, experiences, and projects
            related to his career and interests.
          </p>
          <p>
            The site is built using Next.js and is hosted on Vercel. It&apos;s designed
            to be responsive and accessible, ensuring that it works well on
            different devices and browsers.
          </p>
          <p>
            Eduardo is passionate about web development and enjoys creating
            interactive and visually appealing websites. He believes in the power
            of technology to solve problems and improve people&apos;s lives.
          </p>
          <p>
            If you&apos;re interested in learning more about Eduardo&apos;s work or
            collaborating on a project, you can contact him through the contact
            page on this site.
          </p>
        </div>
      </div>
    </section>
  );
}
