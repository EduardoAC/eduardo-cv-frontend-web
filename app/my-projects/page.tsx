import type { Metadata } from 'next';
import ProjectCard from '@/components/ProjectCard';
import { projectsData } from './data';
import styles from './MyProjects.module.scss';

export const metadata: Metadata = {
  title: 'My Projects - Eduardo Aparicio Cardenes',
  description:
    'Here you can find my projects here include hackathons, work and personal ideas. This page will be upgrade and change with the new comming projects',
};

export default function MyProjectsPage() {
  const projects = projectsData.filter((p) => p.type === 'projects');
  const hackathons = projectsData.filter((p) => p.type === 'hackathons');
  const ideas = projectsData.filter((p) => p.type === 'ideas');

  return (
    <article className={styles.my_projects}>
      <section className="snap-container introduction">
        <h1>My Projects</h1>
        <p>
          Here you can find my projects here include hackathons, work and
          personal ideas. This page will be upgrade and change with the new
          comming projects
        </p>
      </section>

      <section className="snap-container">
        <h2>Projects</h2>
        <div className={styles.projects_grid}>
          {projects.map((project) => (
            <ProjectCard key={project.title} {...project} />
          ))}
        </div>
      </section>

      <section className="snap-container">
        <h2>Hackathons</h2>
        <div className={styles.projects_grid}>
          {hackathons.map((project) => (
            <ProjectCard key={project.title} {...project} />
          ))}
        </div>
      </section>

      <section className="snap-container">
        <h2>Ideas</h2>
        <div className={styles.projects_grid}>
          {ideas.map((project) => (
            <ProjectCard key={project.title} {...project} />
          ))}
        </div>
      </section>
    </article>
  );
} 