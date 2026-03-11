import Image from 'next/image';
import Link from 'next/link';
import Container from '@/components/layout/Container';
import styles from './ComingSoonLanding.module.scss';

type ComingSoonAction = {
  href: string;
  label: string;
  variant?: 'primary' | 'secondary';
};

type ComingSoonHighlight = {
  title: string;
  description: string;
};

type ComingSoonLink = {
  href: string;
  title: string;
  description: string;
};

interface ComingSoonLandingProps {
  eyebrow: string;
  title: string;
  lead: string;
  paragraphs: string[];
  statusTitle: string;
  statusBody: string;
  highlightsTitle: string;
  highlightsDescription: string;
  highlights: ComingSoonHighlight[];
  helpfulTitle: string;
  helpfulDescription: string;
  helpfulLinks: ComingSoonLink[];
  actions: ComingSoonAction[];
  imageAlt: string;
}

export default function ComingSoonLanding({
  eyebrow,
  title,
  lead,
  paragraphs,
  statusTitle,
  statusBody,
  highlightsTitle,
  highlightsDescription,
  highlights,
  helpfulTitle,
  helpfulDescription,
  helpfulLinks,
  actions,
  imageAlt,
}: ComingSoonLandingProps) {
  return (
    <main className={styles.page}>
      <Container variant="default" padding="large">
        <section className={styles.hero} aria-labelledby="coming-soon-title">
          <div className={styles.copy}>
            <p className={styles.eyebrow}>{eyebrow}</p>
            <h1 id="coming-soon-title" className={styles.title}>
              {title}
            </h1>
            <p className={styles.lead}>{lead}</p>
            <div className={styles.body}>
              {paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <div className={styles.actions}>
              {actions.map(({ href, label, variant = 'secondary' }) => (
                <Link
                  key={href}
                  href={href}
                  className={[
                    'snap-btn',
                    variant === 'primary' ? 'snap-btn-primary' : '',
                    styles.action,
                    variant === 'secondary' ? styles.secondaryAction : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
          <div className={styles.media}>
            <div className={styles.imageFrame}>
              <Image
                src="/images/comingsoon-optimized-1280.webp"
                alt={imageAlt}
                width={1280}
                height={582}
                priority
                className={`snap-img-fluid ${styles.image}`}
              />
            </div>
            <aside className={`snap-card ${styles.statusCard}`} aria-label={statusTitle}>
              <p className={styles.statusEyebrow}>Current focus</p>
              <h2>{statusTitle}</h2>
              <p>{statusBody}</p>
            </aside>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="coming-soon-highlights-title">
          <div className={styles.sectionHeader}>
            <h2 id="coming-soon-highlights-title">{highlightsTitle}</h2>
            <p>{highlightsDescription}</p>
          </div>
          <div className={styles.highlightGrid}>
            {highlights.map((highlight) => (
              <article key={highlight.title} className={`snap-card ${styles.highlightCard}`}>
                <h3>{highlight.title}</h3>
                <p>{highlight.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={`snap-card ${styles.helpfulCard}`} aria-labelledby="coming-soon-helpful-title">
          <h2 id="coming-soon-helpful-title">{helpfulTitle}</h2>
          <p className={styles.helpfulIntro}>{helpfulDescription}</p>
          <div className={styles.helpfulGrid}>
            {helpfulLinks.map((link) => (
              <article key={link.href} className={styles.helpfulItem}>
                <Link href={link.href} className={styles.helpfulLink}>
                  {link.title}
                </Link>
                <p>{link.description}</p>
              </article>
            ))}
          </div>
        </section>
      </Container>
    </main>
  );
}
