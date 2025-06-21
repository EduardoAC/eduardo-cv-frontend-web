import styles from './MyExperience.module.scss';

interface ExperienceBlockProps {
  startDate: string;
  endDate: string;
  company: string;
  position: string;
  description: string;
}

export default function ExperienceBlock({
  startDate,
  endDate,
  company,
  position,
  description,
}: ExperienceBlockProps) {
  return (
    <div className={`${styles.experience_block} row`}>
      <div className="col-sm-4">
        <div className={`${styles.work_year} pull-right`}>
          <span className={styles.prev_y}>{startDate}</span>
          <span className={styles.after_y}>{endDate}</span>
        </div>
      </div>
      <div className="col-sm-8">
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