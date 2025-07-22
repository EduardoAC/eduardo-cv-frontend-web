import Image from 'next/image';
import Link from 'next/link';
import Tag from '@/components/content/Tag';
import styles from './MyExperience.module.scss';

interface ExperienceBlockProps {
  startDate: string;
  endDate: string;
  company: string;
  position: string;
  description: string;
  logo?: string;
  articles?: { title: string; slug: string }[];
  technologies?: string[];
}

export default function ExperienceBlock({
  startDate,
  endDate,
  company,
  position,
  description,
  logo,
  articles = [],
  technologies = [],
}: ExperienceBlockProps) {
  return (
    <div className={styles.experience_block}>
      <div className={styles.timeline_dot}></div>
      <div className={styles.date_range}>
        <span>{endDate}</span>
        <span>{startDate}</span>
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
          {technologies.length > 0 && (
            <div className={styles.technologies}>
              <strong className='mb-sm'>Technologies:</strong>
              <div className={styles.tech_icons}>
                {technologies.map((tech) => (
                  <Tag key={tech}>{tech}</Tag>
                ))}
              </div>
            </div>
          )}
          {articles.length > 0 && (
            <div className={styles.articles}>
              <strong>Articles:</strong>
              <ul>
                {articles.map((article) => (
                  <li key={article.slug}>
                    <Link href={`/blog/${article.slug}`}>{article.title}</Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 