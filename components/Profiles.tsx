import ContentBlock from './ContentBlock'
import styles from './Profiles.module.scss'

export default function Profiles() {
  return (
    <section className={styles.profiles}>
      <div className="snap-container">
        <h2>My Background</h2>
        <p className="text">
          Since I started with my engineer in computer science. I'm always been curious about many subjects in specific all of things related as Artificial Intelligence until I discovered the web technologies that allow you to become real any ideas or business.
        </p>
        <p className="text">
          A whole life of passion for software developments (creations, projects, dreams, hobbies, hackathons, ...), It was hard to summarize in a four pages CV as usual is required.
        </p>
        <p className="text">I decided to group it in these three main categories</p>
        <div className="snap-grid">
          <div className="snap-col snap-col-sm-4">
            <ContentBlock
              title="frontend developer"
              imgUrl="/images/frontend-developer.png"
              variant="profile"
              link="/frontend-profile"
            />
          </div>
          <div className="snap-col snap-col-sm-4">
            <ContentBlock
              title="software architect"
              imgUrl="/images/software-architect.png"
              variant="profile"
              link="/software-architect-profile"
            />
          </div>
          <div className="snap-col snap-col-sm-4">
            <ContentBlock
              title="backend developer"
              imgUrl="/images/backend-developer.png"
              variant="profile"
              link="/backend-profile"
            />
          </div>
        </div>
      </div>
    </section>
  )
} 