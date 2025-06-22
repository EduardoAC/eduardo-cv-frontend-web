import Image from 'next/image'
import Link from 'next/link'
import styles from './Projects.module.scss'

export default function Projects() {
  return (
    <section className={styles.projects}>
      <div className="snap-container">
        <h2>Some of my projects</h2>
        <div className="snap-grid">
          <div className="snap-col snap-col-md-7 snap-col-lg-8">
            <p className="text">
              As part of this project that try to catch new employers and clients attention to open the door to new work opportunities.
            </p>
            <p className="text">
              I upload all <Link href="/my-projects">my projects here that include hackathons, work and personal ideas</Link>
            </p>
            <p className="text">Please self yourself to enter and take a look</p>
          </div>
          <div className="snap-col snap-col-md-5 snap-col-lg-4">
            <Link href="/my-projects">
              <Image
                src="/images/code-projects-done.jpg"
                alt="Code Projects Done"
                width={400}
                height={300}
                className="snap-img-fluid"
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
} 