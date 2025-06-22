import Image from 'next/image'
import Link from 'next/link'
import styles from './ProfileBlock.module.scss'

interface ProfileBlockProps {
  title: string
  imgUrl: string
  link: string
}

export default function ProfileBlock({ title, imgUrl, link }: ProfileBlockProps) {
  return (
    <div className={styles.profile_block}>
      <Link href={link}>
        <div className={styles.profile_block_picture}>
          <Image
            src={imgUrl}
              alt={title}
              width={0}
              height={0}
              sizes="100%"
            className={styles.img_full_width}
          />
        </div>
        <h3>{title}</h3>
      </Link>
    </div>
  )
} 