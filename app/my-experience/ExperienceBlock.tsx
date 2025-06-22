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
    <div className={`${styles.experience_block} snap-grid`}>
      <div className="snap-col snap-col-sm-4">
        <div className={styles.thumbnail_container}>
          <Image
            src={logo}
            alt={company}
            width={100}
            height={100}
          />
        </div>
        <div className={`${styles.work_year} snap-pull-right`}>
          <span className={styles.prev_y}>{startDate}</span>
          <span className={styles.after_y}>{endDate}</span>
        </div>
      </div>
      <div className="snap-col snap-col-sm-8">
        <div className={styles.right_area}>
          <div className={styles.arrowpart}></div>
          <div className={styles.ex_con}>
            <h4>{company}</h4>
            <h5 dangerouslySetInnerHTML={{ __html: position }}></h5>
            <div dangerouslySetInnerHTML={{ __html: description }}></div>
          </div>
        </div>
      </div>
    </div>
  );
} 