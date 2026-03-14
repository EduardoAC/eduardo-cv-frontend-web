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
        <h2>Projects and tooling</h2>
        <div className="snap-grid align-items-center">
          <div className="snap-col snap-col-md-7 snap-col-lg-8">
            <p>
              The projects page curates the work that best represents how I build today, from developer tooling and
              open source to hackathons and earlier ventures.
            </p>
            <p>
              Explore the <Link href="/projects">full projects collection</Link> to see flagship work such as GenX API,
              browser tooling, platform experiments, and the ventures that shaped my product thinking.
            </p>
            <p>
              If you want the technical context behind that work, the <Link href="/blog">blog</Link> connects many of
              these projects to architecture, testing, and delivery decisions.
            </p>
          </div>
          <div className="snap-col snap-col-md-5 snap-col-lg-4">
            <Link href="/projects">
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
