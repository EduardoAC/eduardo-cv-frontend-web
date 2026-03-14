import Image from 'next/image'
import { getSiteImageDimensions } from '@/lib/images/siteImageData'
import { HOME_PROMO_IMAGE_SIZES } from '@/lib/images/siteSizes'
import Link from 'next/link'
import Container from './layout/Container'
import styles from './ContentBlogs.module.scss'

const imageSrc = '/images/ideas-content-blog-optimized-1280.webp'
const imageDimensions = getSiteImageDimensions(imageSrc, { width: 1280, height: 960 })

export default function ContentBlogs() {
  return (
    <section className={styles['content-blogs']}>
      <Container variant="default" padding="medium">
        <h2>Business and Technology Addiction</h2>
        <div className="snap-grid align-items-center">
          <div className="snap-col snap-col-md-5">
            <Image
              src={imageSrc}
              alt="Notebook and desk setup representing blog writing and technical ideas"
              width={imageDimensions.width}
              height={imageDimensions.height}
              sizes={HOME_PROMO_IMAGE_SIZES}
              className="snap-img-fluid"
            />
          </div>
          <div className="snap-col snap-col-md-7">
            <p>
              I&apos;m passionate about technology, business and personal growing so I wanted to contribute to internet sharing
            </p>
            <p>
              Therefore I added two areas in that will contribute with my own posts and ideas about it
            </p>
            <p>
              These are <Link href="/blog">business and technology blog</Link> and <Link href="/forum">the brainstorming forum</Link>
            </p>
            <p>
              where I publish different about topic related with all the topics that I mentioned before
            </p>
          </div>
        </div>
      </Container>
    </section>
  )
}
