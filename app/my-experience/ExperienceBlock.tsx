import styles from './MyExperience.module.scss';
import Image from 'next/image';

interface ExperienceBlockProps {
  company: string;
  startDate: string;
  endDate: string;
  position: string;
  description: string;
  logo: string;
}

export default function ExperienceBlock({
  company,
  startDate,
  endDate,
  position,
  description,
  logo,
}: ExperienceBlockProps) {
  return (
    <div className={styles.experience_block}>
      <div className={styles.date_range}>
        <span>{startDate}</span>
        <span>{endDate}</span>
      </div>
      <div className={styles.timeline_dot}></div>
      <div className={styles.content}>
        <div className={styles.logo_container}>
          <Image
            src={logo}
            alt={company}
            width={80}
            height={80}
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