import Image from "next/image";
import Link from 'next/link';
import { getSiteImageDimensions } from '@/lib/images/siteImageData';
import {
  CONTENT_BLOCK_LOGO_IMAGE_SIZES,
  PROFILE_STRENGTH_IMAGE_SIZES,
  PROFILE_TILE_IMAGE_SIZES,
} from '@/lib/images/siteSizes';
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
  const profileImageDimensions = getSiteImageDimensions(imgUrl, { width: 490, height: 490 });
  const contentImageDimensions = getSiteImageDimensions(imgUrl, { width: 300, height: 300 });

  // Profile variant
  if (variant === 'profile' && link) {
    return (
      <div className={styles.content_block} data-variant="profile" data-role={role}>
        <Link href={link}>
          <div className={styles.profile_block_picture}>
            <Image
              src={imgUrl}
              alt={title}
              width={profileImageDimensions.width}
              height={profileImageDimensions.height}
              sizes={PROFILE_TILE_IMAGE_SIZES}
              className={styles.img_full_width}
            />
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
              sizes={CONTENT_BLOCK_LOGO_IMAGE_SIZES}
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

  const dataAttributes: Record<string, string | undefined> = {};
  if (typeof odd === 'boolean') {
    dataAttributes['data-odd'] = odd ? 'true' : 'false';
  }
  if (imageSize) {
    dataAttributes['data-image-size'] = imageSize;
  }

  // Default variant (original ContentBlock)
  return (
    <div
      className={styles.content_block}
      data-variant="default"
      data-role={role}
      {...dataAttributes}
    >
      <div className="snap-grid">
        <div className={`logo snap-col snap-col-sm-6 snap-col-md-4 ${leftClass}`}>
          <div className={styles.thumbnail_mid_container}>
            <div className={styles.thumbnail_mid}>
              <Image
                src={imgUrl}
                alt={title}
                width={contentImageDimensions.width}
                height={contentImageDimensions.height}
                sizes={PROFILE_STRENGTH_IMAGE_SIZES}
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
