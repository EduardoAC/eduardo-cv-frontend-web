import ProfileBlock from './ProfileBlock'
import styles from './Profiles.module.scss'

export default function Profiles() {
  return (
    <section className={`container clearfix ${styles.profiles}`}>
      <h2>My Background</h2>
      <p className="text">
        Since I started with my engineer in computer science. I'm always been curious about many subjects in specific all of things related as Artificial Intelligence until I discovered the web technologies that allow you to become real any ideas or business.
      </p>
      <p className="text">
        A whole life of passion for software developments (creations, projects, dreams, hobbies, hackathons, ...), It was hard to summarize in a four pages CV as usual is required.
      </p>
      <p className="text">I decided to group it in these three main categories</p>
      <div className="row">
        <div className="frontend-developer col-sm-4">
          <ProfileBlock
            title="frontend developer"
            imgUrl="/images/frontend-developer.png"
            link="/frontend-profile"
          />
        </div>
        <div className="software-architect col-sm-4">
          <ProfileBlock
            title="software architect"
            imgUrl="/images/software-architect.png"
            link="/software-architect-profile"
          />
        </div>
        <div className="backend-developer col-sm-4">
          <ProfileBlock
            title="backend developer"
            imgUrl="/images/backend-developer.png"
            link="/backend-profile"
          />
        </div>
      </div>
    </section>
  )
} 