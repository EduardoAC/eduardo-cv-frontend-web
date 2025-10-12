import type { Metadata } from 'next';
import Link from 'next/link';
import Container from '@/components/layout/Container';
import {
  getFrontendProfileVersion,
  getFrontendProfileVersions,
  type FrontendProfileVersionId,
} from '@/app/frontend-profile/data';

interface PageProps {
  params: {
    version: string;
  };
}

export const dynamicParams = false;

export async function generateStaticParams() {
  return getFrontendProfileVersions().map((version) => ({
    version: version.id,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const versionId = params.version as FrontendProfileVersionId;
  const activeVersion = getFrontendProfileVersion(versionId);

  if (!activeVersion) {
    return {
      title: 'Release Notes',
      description: 'Detailed release notes for this profile version.',
    };
  }

  return {
    title: `${activeVersion.title} – Release Notes`,
    description: `Detailed changelog for ${activeVersion.label}.`,
  };
}

export default function FrontendReleaseNotesPage({ params }: PageProps) {
  const versionId = params.version as FrontendProfileVersionId;
  const activeVersion = getFrontendProfileVersion(versionId);

  if (!activeVersion) {
    return (
      <Container variant="default" padding="large">
        <h1>Release Notes</h1>
        <p>We could not find the changelog for this profile version.</p>
        <Link href="/frontend-profile" className="snap-link snap-read-more">
          Back to profile overview
        </Link>
      </Container>
    );
  }

  return (
    <Container variant="default" padding="large" className="release-notes-page">
      <header style={{ marginBottom: '2rem' }}>
        <Link
          href={`/profile/${versionId}/frontend`}
          className="snap-link snap-read-more"
        >
          ← Back to {activeVersion.label}
        </Link>
        <h1 style={{ marginTop: '1rem', marginBottom: '0.5rem' }}>
          {activeVersion.title} — Release Notes
        </h1>
        <p style={{ color: 'var(--color-text-secondary)' }}>
          {activeVersion.heroTagline}
        </p>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem' }}>
          {activeVersion.releaseWindow}
        </p>
      </header>

      <section style={{ marginBottom: '2.5rem' }}>
        <h2>Changelog</h2>
        <ul style={{ paddingLeft: '20px', lineHeight: 1.6 }}>
          {activeVersion.changelog.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

  <section style={{ marginBottom: '2rem' }}>
    <h2>Highlights</h2>
    <p style={{ maxWidth: '760px', color: 'var(--color-text-secondary)' }}>
      {activeVersion.summary}
    </p>
  </section>

  {activeVersion.metrics.length > 0 ? (
    <section style={{ marginBottom: '2.5rem' }}>
      <h2>Release Metrics</h2>
      <div
        style={{
          display: 'grid',
          gap: '16px',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        }}
      >
        {activeVersion.metrics.map((metric) => (
          <div
            key={metric.label}
            style={{
              borderRadius: '16px',
              border: '1px solid rgba(255,255,255,0.1)',
              padding: '16px',
              background: 'rgba(255,255,255,0.04)',
            }}
          >
            <div style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--color-text-primary)' }}>
              {metric.value}
            </div>
            <div style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', marginTop: '6px' }}>
              {metric.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  ) : null}

      <footer>
        <Link
          href={`/profile/${versionId}/frontend`}
          className="snap-link snap-read-more"
        >
          Explore the full profile
        </Link>
      </footer>
    </Container>
  );
}
