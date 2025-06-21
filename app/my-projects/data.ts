interface Project {
  type: 'projects' | 'hackathons' | 'ideas';
  title: string;
  imgUrl: string;
  description: string;
  technologies: string;
  checkItOutUrl?: string;
}

export const projectsData: Project[] = [
  {
    type: 'projects',
    title: 'TuOcio',
    imgUrl: '/images/projects/TuOcioPorfolio.png',
    description:
      'A platform for event organizers to manage their events, attendees, and promotions. It includes features like ticket sales, attendee management, and marketing tools.',
    technologies: 'PHP, Yii2, MySQL, jQuery, Bootstrap',
    checkItOutUrl: 'http://www.tuocio.org',
  },
  {
    type: 'hackathons',
    title: 'Event Buddy',
    imgUrl: '/images/projects/eventBuddyLogo.jpg',
    description:
      'A mobile app to help people find events happening around them. It was built during a 24-hour hackathon and won 2nd place.',
    technologies: 'Node.js, Express, MongoDB, React Native',
  },
  {
    type: 'ideas',
    title: 'Dream Maker Factory',
    imgUrl: '/images/projects/dreammakerfactory.jpg',
    description:
      'A platform to connect people with ideas to people with skills. The goal is to help people build their dreams by forming teams and collaborating on projects.',
    technologies: 'Next.js, TypeScript, Firebase, Vercel',
    checkItOutUrl: 'http://www.dreammakerfactory.com',
  },
]; 