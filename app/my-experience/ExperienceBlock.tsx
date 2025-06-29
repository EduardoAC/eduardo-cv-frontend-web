import Image from 'next/image';
import styles from './MyExperience.module.scss';

interface ExperienceBlockProps {
  startDate: string;
  endDate: string;
  company: string;
  position: string;
  description: string;
  logo?: string;
}

export default function ExperienceBlock({
  startDate,
  endDate,
  company,
  position,
  description,
  logo
}: ExperienceBlockProps) {
  return (
    <div className={styles.experience_block}>
      <div className={styles.timeline_dot}></div>
      <div className={styles.date_range}>
        <span>{startDate}</span>
        <span>{endDate}</span>
      </div>
      <div className={styles.content}>
        <div className={styles.logo_container}>
          <Image
            src={logo || '/images/defaultImage-optimized-1280.webp'}
            alt={company}
            width={60}
            height={60}
          />
        </div>
        <div className={styles.details}>
          <h4>{company}</h4>
          <h5 dangerouslySetInnerHTML={{ __html: position }}></h5>
          <div dangerouslySetInnerHTML={{ __html: description }}></div>
        </div>
      </div>
    </div>
  );
} 