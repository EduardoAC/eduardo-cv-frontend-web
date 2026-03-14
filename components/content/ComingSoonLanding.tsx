import Image from 'next/image';
import { getSiteImageDimensions } from '@/lib/images/siteImageData';
import { COMING_SOON_IMAGE_SIZES } from '@/lib/images/siteSizes';
import Link from 'next/link';
import Container from '@/components/layout/Container';
import styles from './ComingSoonLanding.module.scss';

type ComingSoonLandingVariant = 'forum' | 'build-journal';

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
  variant: ComingSoonLandingVariant;
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

const imageSrc = '/images/comingsoon-optimized-1280.webp';
const imageDimensions = getSiteImageDimensions(imageSrc, { width: 1280, height: 582 });

export default function ComingSoonLanding({
  variant,
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
    <main className={styles.page} data-variant={variant}>
      <section className={styles.heroSection} aria-labelledby="coming-soon-title">
        <Container variant="default" padding="large">
          <div className={styles.heroInner}>
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
                      styles.action,
                      variant === 'primary' ? styles.primaryAction : styles.secondaryAction,
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
                  src={imageSrc}
                  alt={imageAlt}
                  width={imageDimensions.width}
                  height={imageDimensions.height}
                  sizes={COMING_SOON_IMAGE_SIZES}
                  priority
                  className={`snap-img-fluid ${styles.image}`}
                />
              </div>
              <aside className={styles.statusPanel} aria-label={statusTitle}>
                <p className={styles.statusEyebrow}>Current focus</p>
                <h2>{statusTitle}</h2>
                <p>{statusBody}</p>
              </aside>
            </div>
          </div>
        </Container>
      </section>

      <section className={styles.highlightsSection} aria-labelledby="coming-soon-highlights-title">
        <Container variant="default" padding="large">
          <div className={styles.sectionHeader}>
            <h2 id="coming-soon-highlights-title">{highlightsTitle}</h2>
            <p>{highlightsDescription}</p>
          </div>
          <div className={styles.highlightGrid}>
            {highlights.map((highlight) => (
              <article key={highlight.title} className={styles.highlightItem}>
                <h3>{highlight.title}</h3>
                <p>{highlight.description}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className={styles.linksSection} aria-labelledby="coming-soon-helpful-title">
        <Container variant="default" padding="large">
          <div className={styles.sectionHeader}>
            <h2 id="coming-soon-helpful-title">{helpfulTitle}</h2>
            <p>{helpfulDescription}</p>
          </div>
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
        </Container>
      </section>
    </main>
  );
}
