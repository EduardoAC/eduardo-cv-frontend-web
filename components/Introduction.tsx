import Image from 'next/image'
import { getSiteImageDimensions } from '@/lib/images/siteImageData'
import { HOME_HERO_IMAGE_SIZES } from '@/lib/images/siteSizes'
import styles from './Introduction.module.scss'

const heroImageSrc = '/images/introduction-image-1280-optimized-1280.webp'
const heroImageDimensions = getSiteImageDimensions(heroImageSrc, {
  width: 1280,
  height: 853,
})

export default function Introduction() {
  return (
    <section className={styles.introduction}>
      <Image
        src={heroImageSrc}
        alt="Portrait of Eduardo Aparicio Cardenes standing outdoors"
        width={heroImageDimensions.width}
        height={heroImageDimensions.height}
        sizes={HOME_HERO_IMAGE_SIZES}
        priority
        className="snap-img-fluid"
      />
      <div className={styles['title-block']}>
        <h1>
          Eduardo Aparicio Cardenes
          <div className={`${styles.subtitle}`}>
            Software Architect, Frontend Engineer, Mentor and speaker
          </div>
        </h1>
        <p className={`hidden-sm heading3 color-text-emphasis`}>One place that define my worker soul and share it with you</p>
      </div>
    </section>
  )
}
