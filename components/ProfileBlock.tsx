import Image from 'next/image'
import Link from 'next/link'
import styles from './ProfileBlock.module.scss'

interface ProfileBlockProps {
  title: string
  imgUrl: string
  link: string
}

export default function ProfileBlock({ title, imgUrl, link }: ProfileBlockProps) {
  // Convert PNG to WebP for optimization with responsive variants
  const webpUrl = imgUrl.replace('.png', '-optimized.webp')
  const optimizedUrl = imgUrl.replace('.png', '-optimized.png')
  
  // Create responsive srcSet for WebP variants
  const webpSrcSet = webpUrl.replace('-optimized.webp', '-optimized-640.webp') + ' 640w, ' +
                    webpUrl.replace('-optimized.webp', '-optimized-1280.webp') + ' 1280w, ' +
                    webpUrl.replace('-optimized.webp', '-optimized-1920.webp') + ' 1920w'
  
  return (
    <div className={styles.profile_block}>
      <Link href={link}>
        <div className={styles.profile_block_picture}>
          <picture>
            <source srcSet={webpSrcSet} type="image/webp" />
            <Image
              src={optimizedUrl}
              alt={title}
              width={0}
              height={0}
              sizes="(max-width: 640px) 640px, (max-width: 1280px) 1280px, 1920px"
              className={styles.img_full_width}
            />
          </picture>
        </div>
        <h3>{title}</h3>
      </Link>
    </div>
  )
} 