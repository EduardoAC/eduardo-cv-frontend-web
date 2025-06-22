import Image from 'next/image'
import Link from 'next/link'
import styles from './JobsTimeline.module.scss'

export default function JobsTimeline() {
  return (
    <section className={styles['jobs-timeline']}>
      <div className="container clearfix">
          <h2>My Career Timeline</h2>
        <div className="col-md-7">
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
        <div className="col-md-5">
          <Image
            src="/images/jobs-timeline.jpg"
            alt="Jobs Timeline"
            width={400}
            height={300}
            className="img-responsive"
          />
        </div>
      </div>
    </section>
  )
} 