import Image from 'next/image'
import Link from 'next/link'
import Container from './layout/Container'
import styles from './JobsTimeline.module.scss'

export default function JobsTimeline() {
  return (
    <section className={styles['jobs-timeline']}>
      <Container variant="default" padding="medium">
        <h2 className={styles.title}>My Career Timeline</h2>
        <div className="snap-grid">
          <div className="snap-col snap-col-md-7">
            <p className="text">
              Finally I created to have a deeper idea what it's{' '}
              <Link href="/my-experience">my work experience</Link>, I collected
              all job timeline.
            </p>
            <p className="text">
              where you can see my career evolution since I was a child to what
              I'm currently doing.
            </p>
            <p className="text">
              It will include personal projects, jobs, hackathons so you will
              get idea where I spend my professional and personal time to
              develop my skills
            </p>
          </div>
          <div className="snap-col snap-col-md-5">
            <Image
              src="/images/jobs-timeline-optimized-1280.webp"
              alt="My Career Timeline"
              width={400}
              height={300}
              className="snap-img-fluid"
            />
          </div>
        </div>
      </Container>
    </section>
  )
} 