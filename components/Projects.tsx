import Container from './layout/Container'
import Image from 'next/image'
import { getSiteImageDimensions } from '@/lib/images/siteImageData'
import { HOME_PROJECT_IMAGE_SIZES } from '@/lib/images/siteSizes'
import Link from 'next/link'
import styles from './Projects.module.scss'

const imageSrc = '/images/code-projects-done-optimized-1280.webp'
const imageDimensions = getSiteImageDimensions(imageSrc, { width: 1280, height: 960 })

export default function Projects() {
  return (
    <section className={styles.projects}>
      <Container variant="default" padding="medium">
        <h2>Some of my projects</h2>
        <div className="snap-grid align-items-center">
          <div className="snap-col snap-col-md-7 snap-col-lg-8">
            <p>
              As part of this project that try to catch new employers and clients attention to open the door to new work opportunities.
            </p>
            <p>
              I upload all <Link href="/my-projects">my projects here that include hackathons, work and personal ideas</Link>
            </p>
            <p>Please self yourself to enter and take a look</p>
          </div>
          <div className="snap-col snap-col-md-5 snap-col-lg-4">
            <Link href="/my-projects">
              <Image
                src={imageSrc}
                alt="Illustration of completed software projects and code milestones"
                width={imageDimensions.width}
                height={imageDimensions.height}
                sizes={HOME_PROJECT_IMAGE_SIZES}
                className="snap-img-fluid"
              />
            </Link>
          </div>
        </div>
      </Container>
    </section>
  )
}
