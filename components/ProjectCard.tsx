import Image from 'next/image';
import styles from './ProjectCard.module.scss';

interface ProjectCardProps {
  type: string;
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
    <div className={`${styles.project_card_simple} ${typeClass}`}>
      <h3 className='heading4'>{title}</h3>
      <Image
        src={imgUrl}
        alt={title}
        width={100}
        height={100}
        className={styles.logo}
      />
      <p>{description}</p>
      <h4 className='heading5'>Technologies</h4>
      <p>{technologies}</p>
      {checkItOutUrl && (
        <a href={checkItOutUrl} target="_blank" rel="noopener noreferrer">
          Check it out
        </a>
      )}
    </div>
  );
} 