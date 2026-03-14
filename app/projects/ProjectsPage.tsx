import Image from 'next/image';
import Link from 'next/link';
import Container from '@/components/layout/Container';
import Card from '@/components/content/Card';
import Tag from '@/components/content/Tag';
import {
  aboutProjectsLink,
  archivedProjects,
  getProjectsBySection,
  projectSections,
  projectsPageActions,
  type ProjectActionLink,
  type ProjectEntry,
  type ProjectStatus,
  writingLinks,
} from './data';
import styles from './ProjectsPage.module.scss';

const PROJECT_MEDIA_SIZES =
  '(min-width: 1400px) 360px, (min-width: 1200px) 30vw, (min-width: 768px) 44vw, 100vw';

const getStatusClassName = (status: ProjectStatus): string => {
  switch (status) {
    case 'Live':
      return styles.statusTagLive;
    case 'OSS':
      return styles.statusTagOss;
    case 'In Progress':
      return styles.statusTagInProgress;
    case 'Historic':
      return styles.statusTagHistoric;
    default:
      return '';
  }
};

function ActionLink({
  link,
  className,
  primary = false,
}: Readonly<{
  link: ProjectActionLink;
  className?: string;
  primary?: boolean;
}>) {
  const combinedClassName = [
    'snap-btn',
    primary ? 'snap-btn-primary' : '',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ');

  if (link.external) {
    return (
      <a className={combinedClassName} href={link.href} target="_blank" rel="noopener noreferrer">
        {link.label}
      </a>
    );
  }

  return (
    <Link className={combinedClassName} href={link.href}>
      {link.label}
    </Link>
  );
}

function ProjectCard({
  project,
  compact = false,
}: Readonly<{
  project: ProjectEntry;
  compact?: boolean;
}>) {
  const cardClassName = [styles.projectCard, compact ? styles.compactCard : ''].filter(Boolean).join(' ');

  return (
    <Card id={project.slug} className={cardClassName} data-tier={project.tier}>
      <div className={styles.cardMeta}>
        <Tag className={styles.typeTag}>{project.typeLabel}</Tag>
        <Tag className={getStatusClassName(project.status)}>{project.status}</Tag>
      </div>

      <div className={styles.mediaFrame} aria-hidden={project.image ? undefined : true}>
        {project.image ? (
          <Image
            src={project.image.src}
            alt={project.image.alt}
            width={1280}
            height={720}
            sizes={PROJECT_MEDIA_SIZES}
            className={styles.cardImage}
          />
        ) : (
          <div className={styles.placeholderMedia}>
            <div className={styles.placeholderInner}>
              <span className={styles.placeholderLabel}>{project.typeLabel}</span>
              <span className={styles.placeholderTitle}>{project.title}</span>
            </div>
          </div>
        )}
      </div>

      <div className={styles.cardBody}>
        <h3 className={styles.cardTitle}>{project.title}</h3>
        <p className={styles.cardSummary}>{project.summary}</p>
        <div className={styles.techList} aria-label={`${project.title} technologies`}>
          {project.techTags.map((tag) => (
            <Tag key={`${project.slug}-${tag}`} className={styles.techTag}>
              {tag}
            </Tag>
          ))}
        </div>
      </div>

      <div className={styles.actions}>
        <ActionLink link={project.primaryCta} className={styles.linkButton} primary />
        {project.secondaryCta ? (
          <ActionLink link={project.secondaryCta} className={`${styles.linkButton} ${styles.cardActionSecondary}`} />
        ) : null}
      </div>

      {project.relatedLinks?.length ? (
        <div className={styles.relatedLinks}>
          {project.relatedLinks.map((link) => {
            if (link.external) {
              return (
                <a
                  key={`${project.slug}-${link.label}`}
                  className={styles.relatedLink}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.label}
                </a>
              );
            }

            return (
              <Link key={`${project.slug}-${link.label}`} className={styles.relatedLink} href={link.href}>
                {link.label}
              </Link>
            );
          })}
        </div>
      ) : null}
    </Card>
  );
}

export default function ProjectsPage() {
  const heroActions = projectsPageActions.hero;
  const finalActions = projectsPageActions.final;

  return (
    <main className={styles.page}>
      <section className={styles.heroSection} aria-labelledby="projects-title">
        <Container variant="default" padding="large">
          <div className={styles.heroShell}>
            <div className={styles.heroContent}>
              <p className={styles.eyebrow}>Curated engineering work</p>
              <h1 id="projects-title" className={styles.title}>
                Projects, Open Source and Hackathons
              </h1>
              <p className={styles.subtitle}>
                A curated collection of the products, tools, experiments, and ventures that shaped my journey as a
                frontend engineer, platform builder, and creator.
              </p>
              <p className={styles.lead}>
                From contract-driven API generation to browser tooling, technical content platforms, and hackathon
                products, this page brings together the work that best represents how I think, build, and ship.
              </p>
              <p className={styles.supportingStory}>
                This page brings together the projects that best represent my journey as a frontend engineer, platform
                builder, open-source creator, and product-minded technologist. It includes current flagship work,
                developer tooling, earlier ventures, and selected hackathon projects that shaped how I build today. For
                the wider career story behind them, you can also visit the <Link href={aboutProjectsLink}>about page</Link>.
              </p>

              <div className={styles.heroActions}>
                {heroActions.map((action, index) => (
                  <ActionLink
                    key={action.label}
                    link={action}
                    className={`${styles.linkButton} ${index === 0 ? '' : styles.heroActionSecondary}`}
                    primary={index === 0}
                  />
                ))}
              </div>
            </div>

            <nav className={styles.jumpNav} aria-label="Projects section navigation">
              <ul className={styles.jumpNavList}>
                {projectSections.map((section) => (
                  <li key={section.id}>
                    <a className={styles.jumpNavLink} href={`#${section.id}`}>
                      {section.navLabel}
                    </a>
                  </li>
                ))}
                <li>
                  <a className={styles.jumpNavLink} href="#writing-and-talks">
                    Writing and Talks
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </Container>
      </section>

      {projectSections.map((section) => {
        const projects = getProjectsBySection(section.id);
        const gridClassName =
          section.id === 'featured'
            ? styles.featuredGrid
            : section.id === 'open-source'
              ? styles.supportingGrid
              : section.id === 'hackathons'
                ? styles.hackathonGrid
                : styles.venturesGrid;
        const isCompactSection = section.id !== 'featured';

        return (
          <section key={section.id} id={section.id} className={styles.section} aria-labelledby={`${section.id}-title`}>
            <Container variant="default" padding="large">
              <div className={styles.sectionHeader}>
                <h2 id={`${section.id}-title`} className={styles.sectionTitle}>
                  {section.title}
                </h2>
                <p className={styles.sectionIntro}>{section.intro}</p>
              </div>

              <ul className={`${styles.grid} ${gridClassName}`}>
                {projects.map((project) => (
                  <li key={project.slug}>
                    <ProjectCard project={project} compact={isCompactSection} />
                  </li>
                ))}
              </ul>

              {section.id === 'ventures' ? (
                <aside className={styles.archivedStrip} aria-labelledby="archived-projects-title">
                  <h3 id="archived-projects-title" className={styles.archivedTitle}>
                    Selected experiments and workshops
                  </h3>
                  <p className={styles.archivedBody}>
                    Selected experiments, workshops, and architecture explorations across frontend, tooling, browser
                    extensions, and developer experience.
                  </p>
                  <ul className={styles.archivedList}>
                    {archivedProjects.map((project) => (
                      <li key={project.slug}>
                        <Tag className={styles.archivedTag}>{project.title}</Tag>
                      </li>
                    ))}
                  </ul>
                  <div className={styles.archivedActions}>
                    <ActionLink link={projectsPageActions.archived} className={styles.linkButton} primary />
                  </div>
                </aside>
              ) : null}
            </Container>
          </section>
        );
      })}

      <section id="writing-and-talks" className={styles.section} aria-labelledby="writing-and-talks-title">
        <Container variant="default" padding="large">
          <div className={styles.sectionHeader}>
            <h2 id="writing-and-talks-title" className={styles.sectionTitle}>
              Writing and talks
            </h2>
            <p className={styles.sectionIntro}>
              Many of these projects connect directly to my technical writing, talks, and broader thinking around
              frontend architecture, testing strategy, API generation, and platform design.
            </p>
          </div>

          <ul className={`${styles.grid} ${styles.writingGrid}`}>
            {writingLinks.map((link) => (
              <li key={link.href}>
                <Card className={styles.writingCard}>
                  <Link className={styles.writingLink} href={link.href}>
                    {link.title}
                  </Link>
                  <p className={styles.writingDescription}>{link.description}</p>
                </Card>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className={styles.ctaSection} aria-labelledby="projects-cta-title">
        <Container variant="default" padding="large">
          <div className={styles.ctaCard}>
            <h2 id="projects-cta-title" className={styles.ctaTitle}>
              Interested in collaborating?
            </h2>
            <p className={styles.ctaBody}>
              If any of these projects resonate with your team, product, or community, feel free to get in touch. I am
              always happy to discuss engineering, architecture, talks, mentoring, and open-source ideas.
            </p>
            <div className={styles.finalActions}>
              {finalActions.map((action, index) => (
                <ActionLink
                  key={action.label}
                  link={action}
                  className={`${styles.ctaButton} ${index === 0 ? '' : styles.ctaSecondary}`}
                  primary={index === 0}
                />
              ))}
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
