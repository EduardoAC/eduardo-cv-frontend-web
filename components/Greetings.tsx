import Image from 'next/image'
import { getSiteImageDimensions } from '@/lib/images/siteImageData'
import { HOME_PROMO_IMAGE_SIZES } from '@/lib/images/siteSizes'
import Link from 'next/link'
import Container from './layout/Container'
import styles from './Greetings.module.scss'

const imageSrc = '/images/finding-the-secrets-optimized-1280.webp'
const imageDimensions = getSiteImageDimensions(imageSrc, { width: 1280, height: 960 })

export default function Greetings() {
  return (
    <section className={styles['greetings-contact']}>
      <Container variant="default" padding="medium">
        <h2>Thanks for reading my interactive curriculum</h2>
        <div className="snap-grid align-items-center">
          <div className="snap-col snap-col-md-5">
            <Image
              src={imageSrc}
              alt="Illustration of a person exploring a hidden passage"
              width={imageDimensions.width}
              height={imageDimensions.height}
              sizes={HOME_PROMO_IMAGE_SIZES}
              className="snap-img-fluid"
            />
          </div>
          <div className="snap-col snap-col-md-7">
            <p>
              I hope you like it. Discover more in each page some of them have amazing secrets. As my frontend career is done in Angular and NodeJs
            </p>
            <p>
              Are you ready to discover all of them? Then visit <Link href="/projects/how-do-i-build-it">how I build my interactive CV</Link>
            </p>
            <p>
              Do you want to hire me or give me some feedback? Please use the <Link href="/contact">contact page</Link>
            </p>
          </div>
        </div>
      </Container>
    </section>
  )
}
