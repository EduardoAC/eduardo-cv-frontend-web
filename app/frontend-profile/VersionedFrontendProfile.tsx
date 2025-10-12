import Link from 'next/link';
import Image from 'next/image';
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
  const orderedVersions = [...versions].sort((a, b) => Number(b.version) - Number(a.version));

  return (
    <div className={styles.page} data-version={activeVersion.id}>
      <section className={styles.hero}>
        <Container variant="wide" padding="large" className={styles.hero_container}>
          <div className={styles.hero_inner}>
            <div className={styles.hero_text}>
              <div className={styles.hero_copy}>
                <span className={styles.version_badge}>Version {activeVersion.version}</span>
                <h1>{activeVersion.title}</h1>
                <p className={styles.hero_tagline}>{activeVersion.heroTagline}</p>
              </div>
              <div className={styles.hero_meta}>
                <p className={styles.hero_release}>{activeVersion.releaseWindow}</p>
                <p className={styles.hero_summary}>{activeVersion.summary}</p>
              </div>
            </div>
            <figure className={styles.hero_card}>
              <Image
                src={activeVersion.brandCardImage}
                alt={`${activeVersion.label} brand card`}
                width={600}
                height={315}
                sizes="(max-width: 900px) 100vw, 600px"
                priority
              />
            </figure>
          </div>
        </Container>
      </section>

      <Container variant="wide" padding="medium" className={styles.layout}>
        <aside className={styles.version_panel}>
          <div className={styles.version_panel_inner}>
            <span className={styles.version_panel_label}>Profile releases</span>
            <nav className={styles.version_switcher} aria-label="Frontend profile versions">
              {orderedVersions.map((version) => {
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
          </div>
        </aside>

        <div className={styles.main}>
          <ProfilePage
            role="frontend"
            title={activeVersion.title}
            description={activeVersion.description}
            openGraphImage={activeVersion.openGraphImage}
            introduction={activeVersion.introduction}
            strengths={activeVersion.strengths}
            linkedInUrl={LINKEDIN_URL}
            wrapperClassName={styles.profile_page}
          />

          <section className={styles.release_overview}>
            <h2>Release Highlights</h2>
            <p className={styles.release_overview_summary}>{activeVersion.summary}</p>
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
            <div className={styles.release_cta}>
              <Link
                href={`/profile/${activeVersion.id}/frontend/release-notes`}
                className={styles.release_notes_link}
              >
                View detailed release notes
              </Link>
              {activeVersion.easterEgg ? (
                <span className={styles.easter_hint}>{activeVersion.easterEgg}</span>
              ) : null}
            </div>
          </section>

          <section className={styles.tech_diff}>
            <div className={styles.tech_diff_header}>
              <h2>Tech Stack</h2>
              <p>Compare the focus, new additions, and sunset tools for this release.</p>
            </div>
            <div className={styles.tech_diff_columns}>
              <div className={styles.tech_column}>
                <h3>Core Focus</h3>
                <ul>
                  {activeVersion.techHighlights.focus.map((item) => (
                    <li key={item.label}>
                      {item.url ? (
                        <a href={item.url} rel={item.rel ?? 'nofollow noopener noreferrer'} target="_blank">
                          {item.label}
                        </a>
                      ) : (
                        <span>{item.label}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
              {activeVersion.techHighlights.added ? (
                <div className={styles.tech_column}>
                  <h3>Added</h3>
                  <ul>
                    {activeVersion.techHighlights.added.map((item) => (
                      <li key={item.label}>
                        {item.url ? (
                          <a href={item.url} rel={item.rel ?? 'nofollow noopener noreferrer'} target="_blank">
                            {item.label}
                          </a>
                        ) : (
                          <span>{item.label}</span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
              {activeVersion.techHighlights.sunset ? (
                <div className={styles.tech_column}>
                  <h3>Sunset</h3>
                  <ul>
                    {activeVersion.techHighlights.sunset.map((item) => (
                      <li key={item.label}>{item.label}</li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          </section>

          {activeVersion.experienceLink ? (
            <section className={styles.experience_bridge}>
              <h2>Experience in Action</h2>
              <p>{activeVersion.experienceLink.description}</p>
              <Link
                href={activeVersion.experienceLink.url}
                className={styles.experience_link}
              >
                {activeVersion.experienceLink.label}
              </Link>
            </section>
          ) : null}

          {activeVersion.relatedArticles.length > 0 ? (
            <section className={styles.related_articles}>
              <h2>Keep Exploring</h2>
              <p className={styles.related_articles_intro}>
                Curated reads from my blog that extend the themes in this release.
              </p>
              <ul>
                {activeVersion.relatedArticles.map((article) => (
                  <li key={article.url}>
                    <Link href={article.url}>
                      {article.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
        </div>
      </Container>
    </div>
  );
}
