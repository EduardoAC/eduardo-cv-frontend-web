import type { Metadata } from 'next';
import Link from 'next/link';
import Container from './layout/Container';
import ContentBlock from '@/components/ContentBlock';
import styles from './ProfilePage.module.scss';

export interface Strength {
  title: string;
  description: string;
  imgUrl: string;
}

export interface ProfilePageProps {
  role: 'frontend' | 'backend' | 'software-architect';
  title: string;
  description: string;
  openGraphImage: string;
  introduction: string[];
  strengths: Strength[];
  linkedInUrl?: string;
}

export function generateMetadata(props: ProfilePageProps): Metadata {
  return {
    title: props.title,
    description: props.description,
    openGraph: {
      images: [props.openGraphImage],
    },
  };
}

export default function ProfilePage({
  role,
  title,
  description,
  openGraphImage,
  introduction,
  strengths,
  linkedInUrl = 'https://www.linkedin.com/in/eacardenes',
}: ProfilePageProps) {
  return (
    <Container variant="default" padding="medium" className={styles.profile_page} data-role={role}>
      <h1>{title}</h1>
      <section className={styles.introduction}>
        {introduction.map((paragraph, index) => (
          <p key={index} dangerouslySetInnerHTML={{ __html: paragraph }} />
        ))}
      </section>
      <section className={styles.skills}>
        <hr />
        {strengths.map((data, index) => (
          <ContentBlock 
            {...data} 
            odd={index % 2 === 0} 
            key={data.title}
            role={role}
          />
        ))}
        <hr />
        <a
          href={linkedInUrl}
          rel="nofollow"
          target="_blank"
        >
          <p className={styles.conclusion}>Would you like to know more?</p>
        </a>
      </section>
    </Container>
  );
} 