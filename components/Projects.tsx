import Image from 'next/image'
import Link from 'next/link'
import styles from './Projects.module.scss'

export default function Projects() {
  return (
    <section className={styles.projects}>
      <div className="container clearfix">
        <h2>Some of my projects</h2>
        <div className="col-md-7 col-lg-8">
          <p className="text">
            As part of this project that try to catch new employers and clients attention to open the door to new work opportunities.
          </p>
          <p className="text">
            I upload all <Link href="/my-projects">my projects here that include hackathons, work and personal ideas</Link>
          </p>
          <p className="text">Please self yourself to enter and take a look</p>
        </div>
        <div className="col-md-5 col-lg-4">
          <Link href="/my-projects">
            <Image
              src="/images/code-projects-done.jpg"
              alt="Code Projects Done"
              width={400}
              height={300}
              className="img-responsive"
            />
          </Link>
        </div>
      </div>
    </section>
  )
} 