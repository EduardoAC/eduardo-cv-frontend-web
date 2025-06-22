import Image from 'next/image'
import Link from 'next/link'
import styles from './JobsTimeline.module.scss'

export default function JobsTimeline() {
  return (
    <section className={`container clearfix ${styles['jobs-timeline']}`}>
      <h2>My Work Experience</h2>
      <div className="col-md-5">
        <Image
          src="/images/jobs-timeline.jpg"
          alt="Jobs Timeline"
          width={400}
          height={300}
          className="img-responsive"
        />
      </div>
      <div className="col-md-7">
        <p className="text">
          I've been working as web developer for almost five years switched from
          a software engineer job because I found more attractive for my
          professional career.
        </p>
        <p className="text">
          Therefore, in this page you will find the big picture of my evolution as a web developer, where I decided to
          include my principal studies that put me away for a long period of time for work world in order to develop better my skills.
        </p>
        <p className="text">
          Essentially, in these years I learned how to build and develop
          platforms where I acquired backend and frontend knowledge to do more
          effective my job in these companies.
        </p>
        <p className="text">
          Currently I decided that I want to become a successful frontend engineer, I feel that it's my true vocation bring alive the amazing design
          comming from the designers so please scroll down to see my evolution
          across my work timeline.
        </p>
        <p className="text">
          <Link href="/my-experience">See my complete work timeline</Link>
        </p>
      </div>
    </section>
  )
} 