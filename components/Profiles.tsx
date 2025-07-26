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
    imgUrl: '/images/profiles/frontend-profile-490px.webp',
    link: '/frontend-profile',
  },
  {
    title: 'software architect',
    imgUrl: '/images/profiles/software-architect-profile-490px.webp',
    link: '/software-architect-profile',
  },
  {
    title: 'About myself',
    imgUrl: '/images/profiles/eduardo-aparicio-cardenes-homepage-490px.webp',
    link: '/about',
  },
  {
    title: 'Mentor',
    imgUrl: '/images/profiles/mentor-profile-490px.webp',
    link: '/mentor-profile',
  },
  {
    title: 'backend developer',
    imgUrl: '/images/profiles/backend-profile-490px-mirror.webp',
    link: '/backend-profile',
  },
]

export default function Profiles() {
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
      </Container>
      <Container variant="fluid" padding="none">
        <div className={styles.gridAnimated}>
          {profiles.map((profile, index) => (
            <div
              key={profile.title}
              className={styles.profileItemGrid}
              tabIndex={0}
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
      </Container>
    </section>
  );
}
