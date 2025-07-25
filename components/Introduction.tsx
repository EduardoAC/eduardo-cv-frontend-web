import styles from './Introduction.module.scss'

export default function Introduction() {
  return (
    <section className={styles.introduction}>
      <picture>
        <source
          srcSet="/images/introduction-image-1280-optimized-640.webp 640w, /images/introduction-image-1280-optimized-1280.webp 1280w, /images/introduction-image-1280-optimized-1920.webp 1920w"
          sizes="(max-width: 640px) 640px, (max-width: 1280px) 1280px, 1920px"
          type="image/webp"
        />
        <img
          src="/images/introduction-image-1280-optimized-1280.webp"
          alt="Eduardo Aparicio Cardenes Introduction"
          width={1280}
          height={853}
          className="snap-img-fluid"
          sizes="(max-width: 640px) 640px, (max-width: 1280px) 1280px, 1920px"
          srcSet="/images/introduction-image-1280-optimized-640.webp 640w, /images/introduction-image-1280-optimized-1280.webp 1280w, /images/introduction-image-1280-optimized-1920.webp 1920w"
        />
      </picture>
      <div className={styles['title-block']}>
        <h1>
          Eduardo Aparicio Cardenes
          <div className={`${styles.subtitle}`}>
            Software Architect, Frontend Engineer, Mentor and speaker
          </div>
        </h1>
        <p className={`hidden-sm heading3 color-text-primary`}>One place that define my worker soul and share it with you</p>
      </div>
    </section>
  )
}