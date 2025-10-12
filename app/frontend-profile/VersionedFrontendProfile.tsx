import Link from 'next/link';
import Container from '@/components/layout/Container';
import ProfilePage from '@/components/ProfilePage';
import type { FrontendProfileVersion, FrontendProfileVersionId } from './data';
import styles from './VersionedFrontendProfile.module.scss';

const LINKEDIN_URL = 'https://www.linkedin.com/in/eacardenes';

interface VersionedFrontendProfileProps {
  activeVersion: FrontendProfileVersion;
  versions: FrontendProfileVersion[];
}

function buildVersionHref(id: FrontendProfileVersionId) {
  return `/profile/${id}/frontend`;
}

export default function VersionedFrontendProfile({
  activeVersion,
  versions,
}: VersionedFrontendProfileProps) {
  return (
    <div className={styles.page} data-version={activeVersion.id}>
      <Container variant="default" padding="medium" className={styles.hero}>
        <div className={styles.hero_content}>
          <span className={styles.version_badge}>v{activeVersion.version}</span>
          <h1>{activeVersion.title}</h1>
          <p className={styles.hero_tagline}>{activeVersion.heroTagline}</p>
          <p className={styles.hero_release}>{activeVersion.releaseWindow}</p>
        </div>
        <nav className={styles.version_switcher} aria-label="Frontend profile versions">
          {versions.map((version) => {
            const isActive = version.id === activeVersion.id;

            return (
              <Link
                key={version.id}
                href={buildVersionHref(version.id)}
                className={`${styles.version_link}${isActive ? ` ${styles.version_link__active}` : ''}`}
                aria-current={isActive ? 'page' : undefined}
              >
                <span className={styles.version_link_number}>{version.version}</span>
                <span className={styles.version_link_label}>{version.label}</span>
                <span className={styles.version_link_release}>{version.releaseWindow}</span>
              </Link>
            );
          })}
        </nav>
      </Container>

      <ProfilePage
        role="frontend"
        title={activeVersion.title}
        description={activeVersion.description}
        openGraphImage={activeVersion.openGraphImage}
        introduction={activeVersion.introduction}
        strengths={activeVersion.strengths}
        linkedInUrl={LINKEDIN_URL}
      />

      <Container variant="default" padding="medium" className={styles.summary}>
        <h2>What&apos;s new in {activeVersion.label}</h2>
        <p className={styles.summary_text}>{activeVersion.summary}</p>
        {activeVersion.metrics.length > 0 ? (
          <div className={styles.metrics_grid}>
            {activeVersion.metrics.map((metric) => (
              <div className={styles.metric_card} key={metric.label}>
                <span className={styles.metric_value}>{metric.value}</span>
                <span className={styles.metric_label}>{metric.label}</span>
              </div>
            ))}
          </div>
        ) : null}
      </Container>

      <Container variant="default" padding="medium" className={styles.tech_diff}>
        <div className={styles.tech_diff_header}>
          <h2>Tech Stack Diff</h2>
          <p>Compare what stayed, shipped, and sunset between releases.</p>
        </div>
        <div className={styles.tech_diff_columns}>
          <div className={styles.tech_column}>
            <h3>Core Focus</h3>
            <ul>
              {activeVersion.techHighlights.focus.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          {activeVersion.techHighlights.added ? (
            <div className={styles.tech_column}>
              <h3>Added</h3>
              <ul>
                {activeVersion.techHighlights.added.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ) : null}
          {activeVersion.techHighlights.sunset ? (
            <div className={styles.tech_column}>
              <h3>Sunset</h3>
              <ul>
                {activeVersion.techHighlights.sunset.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </Container>

      <Container variant="default" padding="medium" className={styles.changelog}>
        <div className={styles.changelog_header}>
          <h2>Release Notes</h2>
          <p>Your favourite part of every launch: the changelog.</p>
        </div>
        <ul className={styles.changelog_list}>
          {activeVersion.changelog.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        {activeVersion.easterEgg ? (
          <p className={styles.easter_egg}>{activeVersion.easterEgg}</p>
        ) : null}
      </Container>
    </div>
  );
}
