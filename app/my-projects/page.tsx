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
        <h1>My projects</h1>
        <p>
          I started to have ideas and dream since I was child however it wasn't
          until I joined as a Web Developer for a wonderful company call{' '}
          <a href="http://www.globaincubator.com" target="_blank" rel="nofollow">
            GlobalIncubator
          </a>{' '}
          that I realise all the ideas and opportinities that exist in the world
          to make it better and succesful business. There I met one of the most
          amazing people I could imagine in a atmosphere of innovation and hard
          work with people as Pablo Trianfilo, Luis Gonzalez-Blanch, Jose Sanz
          Polo and many others.
        </p>
        <p>
          During over two years I learned a lot about Innovation, Ideas and how
          to make it happens but more important that you will never achieve
          anything if you don't take action. From there I decided to start to
          write down every single idea and start to develop as a website, paper
          project, giving flying, making questionaries anything that put my on
          track.
        </p>
        <p>
          Therefore, I want to share with you some of my projects, hackathons
          and ideas that can briefly provide you more information about my skill
          set and who knows may be discuss futher or support me with them.
        </p>
      </section>
      <section className={styles.projects_list}>
        <div className="snap-container">
          <h2>Project Types</h2>
          <div className="snap-grid">
            <div className="snap-col snap-col-md-4">
              <h3>Projects</h3>
              {projects.map((project: any) => (
                <ProjectCard key={project.title} {...project} />
              ))}
            </div>
            <div className="snap-col snap-col-md-4">
              <h3>Hackathons</h3>
              {hackathons.map((hackathon: any) => (
                <ProjectCard key={hackathon.title} {...hackathon} />
              ))}
            </div>
            <div className="snap-col snap-col-md-4">
              <h3>Ideas</h3>
              {ideas.map((idea: any) => (
                <ProjectCard key={idea.title} {...idea} />
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="snap-container conclusion">
        <h2>Final Considerations</h2>
        <p>
          All these projects you can see above are only a part of the content.
          Currently, I've been in several hackathons and event accross 3
          countries and two continents. I develop dozens of ideas and
          implemented 5 of them.
        </p>
        <p>
          However, I admit it's take time to put all together after a decade of
          work and dedication from my spare time in a unique place but no
          worries, I will be happy to talk about anytime and I will be adding
          content slowly but constant because I love it.
        </p>
        <p>
          Often I hear about people to tell me that I must start my own business
          and I will but currently I love to help another people to achieve them
          goal learning a lot of things from them. I guess I want to learn from
          you if you give me the chance.
        </p>
      </section>
    </article>
  );
} 