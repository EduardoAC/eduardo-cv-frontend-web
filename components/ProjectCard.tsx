import Image from 'next/image';
import styles from './ProjectCard.module.scss';

interface ProjectCardProps {
  type: 'projects' | 'hackathons' | 'ideas';
  title: string;
  imgUrl: string;
  description: string;
  technologies: string;
  checkItOutUrl?: string;
}

export default function ProjectCard({
  type,
  title,
  imgUrl,
  description,
  technologies,
  checkItOutUrl,
}: ProjectCardProps) {
  const typeClass = styles[type] || styles.projects;

  return (
    <div className={`${styles.projects_desc_block} ${typeClass}`}>
      <div className={`${styles.shadow} row`}>
        <div className="container">
          <h2>{title}</h2>
          <div className="col-sm-4">
            <Image
              src={imgUrl}
              alt={title}
              width={250}
              height={250}
              className="img-responsive"
            />
          </div>
          <div className="col-sm-8">
            <p className={styles.text}>{description}</p>
            <div className={`${styles.details} details`}>
              <h3>Technologies</h3>
              <p className={styles.text}>{technologies}</p>
            </div>
            {checkItOutUrl && (
              <a href={checkItOutUrl} target="_blank" rel="noopener noreferrer">
                Check it out
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 