import Image from 'next/image'
import styles from './Introduction.module.scss'

export default function Introduction() {
  return (
    <section className={styles.introduction}>
      <picture>
        <source
          srcSet="/images/introduction-image-1280-optimized-640.webp 640w, /images/introduction-image-1280-optimized-1280.webp 1280w, /images/introduction-image-1280-optimized-1920.webp 1920w"
          type="image/webp"
        />
        <Image
          src="/images/introduction-image-1280-optimized-1280.webp"
          alt="Eduardo Aparicio Cardenes Introduction"
          width={1280}
          height={853}
          className="snap-img-fluid"
          priority
          sizes="(max-width: 640px) 640px, (max-width: 1280px) 1280px, 1920px"
        />
      </picture>
      <div className={styles['title-block']}>
        <h1>
          Welcome to my interactive curriculum
          <br />
          My name is Eduardo Aparicio Cardenes
        </h1>
        <p className={`hidden-sm heading3`}>One place that define my worker soul and share with you</p>
      </div>
    </section>
  )
}