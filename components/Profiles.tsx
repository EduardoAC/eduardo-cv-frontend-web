import Container from "./layout/Container";
import ContentBlock from "./ContentBlock";
import styles from "./Profiles.module.scss";

interface ProfileItem {
  title: string
  imgUrl: string
  link: string
}

const profiles: ProfileItem[] = [
  {
    title: 'frontend developer',
    imgUrl: '/images/frontend-developer.png',
    link: '/frontend-profile',
  },
  {
    title: 'software architect',
    imgUrl: '/images/software-architect.png',
    link: '/software-architect-profile',
  },
  {
    title: 'Mentor',
    imgUrl: '/images/backend-developer.png',
    link: '/mentor-profile',
  },
  {
    title: 'backend developer',
    imgUrl: '/images/backend-developer.png',
    link: '/backend-profile',
  },
]

export default function Profiles() {
  const radius = 140
  const centerX = 0
  const centerY = 0
  return (
    <section className={styles.profiles}>
      <Container variant="default" padding="medium">
        <h2>My Background</h2>
        <p>
          Since I started with my engineer in computer science. I'm always been
          curious about many subjects in specific all of things related as
          Artificial Intelligence until I discovered the web technologies that
          allow you to become real any ideas or business.
        </p>
        <p>
          A whole life of passion for software developments (creations,
          projects, dreams, hobbies, hackathons, ...), It was hard to summarize
          in a four pages CV as usual is required.
        </p>
        <p>I decided to group it in these three main categories</p>
        <div className={styles.circle}>
          {profiles.map((profile, index) => (
            <div
              key={profile.title}
              className={styles.profileItem}
              style={{ ['--nth-child' as any]: index + 1 }}
            >
              <ContentBlock
                title={profile.title}
                imgUrl={profile.imgUrl}
                variant="profile"
                link={profile.link}
              />
            </div>
          ))}
        </div>
        {/* <div className="snap-grid">
          <div className="snap-col snap-col-sm-3">
            <ContentBlock
              title="frontend developer"
              imgUrl="/images/frontend-developer.png"
              variant="profile"
              link="/frontend-profile"
            />
          </div>
          <div className="snap-col snap-col-sm-3">
            <ContentBlock
              title="software architect"
              imgUrl="/images/software-architect.png"
              variant="profile"
              link="/software-architect-profile"
            />
          </div>
          <div className="snap-col snap-col-sm-3">
            <ContentBlock
              title="backend developer"
              imgUrl="/images/backend-developer.png"
              variant="profile"
              link="/backend-profile"
            />
          </div>
          <div className="snap-col snap-col-sm-3">
            <ContentBlock
              title="Mentor"
              imgUrl="/images/backend-developer.png"
              variant="profile"
              link="/mentor-profile"
            />
          </div>
        </div> */}
      </Container>
    </section>
  );
}
