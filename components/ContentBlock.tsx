import Image from 'next/image';
import Link from 'next/link';
import styles from './ContentBlock.module.scss';

interface ContentBlockProps {
  title: string;
  description?: string;
  imgUrl: string;
  odd?: boolean;
  swap?: boolean;
  role?: 'frontend' | 'backend' | 'software-architect';
  imageSize?: 'small' | 'medium' | 'large';
  variant?: 'default' | 'profile' | 'experience';
  // Profile-specific props
  link?: string;
  // Experience-specific props
  company?: string;
  startDate?: string;
  endDate?: string;
  position?: string;
  logo?: string;
}

export default function ContentBlock({
  title,
  description,
  imgUrl,
  odd = false,
  swap = false,
  role,
  imageSize = 'medium',
  variant = 'default',
  // Profile-specific props
  link,
  // Experience-specific props
  company,
  startDate,
  endDate,
  position,
  logo,
}: ContentBlockProps) {
  const leftClass = swap ? 'snap-order-sm-2 snap-order-md-2' : '';
  const rightClass = swap ? 'snap-order-sm-1 snap-order-md-1' : '';

  // Profile variant
  if (variant === 'profile' && link) {
    return (
      <div className={styles.content_block} data-variant="profile" data-role={role}>
        <Link href={link}>
          <div className={styles.profile_block_picture}>
            <picture>
              <source 
                srcSet={imgUrl.replace('.png', '-optimized-640.webp') + ' 640w, ' +
                       imgUrl.replace('.png', '-optimized-1280.webp') + ' 1280w, ' +
                       imgUrl.replace('.png', '-optimized-1920.webp') + ' 1920w'} 
                type="image/webp" 
              />
              <Image
                src={imgUrl.replace('.png', '-optimized.png')}
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
    );
  }

  // Experience variant
  if (variant === 'experience' && company) {
    return (
      <div className={styles.content_block} data-variant="experience" data-role={role}>
        <div className={styles.date_range}>
          <span>{startDate}</span>
          <span>{endDate}</span>
        </div>
        <div className={styles.timeline_dot}></div>
        <div className={styles.content}>
          <div className={styles.logo_container}>
            <Image
              src={logo || '/images/defaultImage-optimized-1280.webp'}
              alt={company}
              width={80}
              height={80}
            />
          </div>
          <div className={styles.details}>
            <h4>{company}</h4>
            <h5 dangerouslySetInnerHTML={{ __html: position || '' }}></h5>
            <div dangerouslySetInnerHTML={{ __html: description || '' }}></div>
          </div>
        </div>
      </div>
    );
  }

  // Default variant (original ContentBlock)
  return (
    <div className={styles.content_block} data-variant="default" data-role={role}>
      <div className="snap-grid">
        <div className={`logo snap-col snap-col-sm-6 snap-col-md-4 ${leftClass}`}>
          <div className={styles.thumbnail_mid_container}>
            <div className={styles.thumbnail_mid}>
              <Image
                src={imgUrl}
                alt={title}
                width={300}
                height={300}
                className="snap-img-fluid"
              />
            </div>
          </div>
        </div>
        <div className={`details snap-col snap-col-sm-6 snap-col-md-8 ${rightClass}`}>
          <h2>{title}</h2>
          <div
            className={styles.text}
            dangerouslySetInnerHTML={{ __html: description || '' }}
          ></div>
        </div>
      </div>
    </div>
  );
}