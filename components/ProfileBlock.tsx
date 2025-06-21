import Image from 'next/image'
import Link from 'next/link'

interface ProfileBlockProps {
  title: string
  imgUrl: string
  link: string
}

export default function ProfileBlock({ title, imgUrl, link }: ProfileBlockProps) {
  return (
    <div className="profile-block">
      <Link href={link}>
        <Image
          src={imgUrl}
          alt={title}
          width={300}
          height={300}
          className="img-responsive"
        />
        <p className="link">{title}</p>
      </Link>
    </div>
  )
} 