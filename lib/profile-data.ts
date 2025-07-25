import type { Strength } from '@/components/ProfilePage';

export interface ProfileConfig {
  title: string;
  description: string;
  openGraphImage: string;
  introduction: string[];
  strengths: Strength[];
  linkedInUrl?: string;
}

export interface ProfileData {
  frontend: ProfileConfig;
  backend: ProfileConfig;
  'software-architect': ProfileConfig;
}

export const profileData: ProfileData = {
  frontend: {
    title: 'Frontend Developer',
    description: 'Frontend Developer Profile',
    openGraphImage: '/images/profiles/frontend-profile-490px.webp',
    linkedInUrl: 'https://www.linkedin.com/in/eacardenes',
    introduction: [
      'I have been working as a frontend developer for the last five years, more specifically I swapped from HTML4 & CSS2 to HTML5 & CSS3 three years ago. I got strong experience developing complex JS systems using OOP, prototyping and design patterns to maximize performance and user experience.',
      'Additionally, I began working on JSON, SASS and LESS two years ago, mostly in SASS for Styling and JSON for REST communications because it has better capabilities from my point of view.',
      'Consequently, I like to do frontend work because all it\'s about this WWW world that I have passion about it. Therefore I won\'t hesitate to get involved myself when you ask me for. Here is my frontend background so i hope you find useful because it\'s a great complement for a backend developer have comprehension and understanding the language the frontend developers speaks.'
    ],
    strengths: [
      {
        title: 'Languages',
        description: `<p>I have been working in HTML, JS & CSS for the last five years, more specifically I swapped from HTML4 & CSS2 to HTML5 & CSS3 three years ago. I got strong experience developing complex JS systems using OOP, prototyping  and design patterns to maximize performance and user experience</p><p>Additionally, I began working on JSON, SASS and LESS two years ago, mostly in SASS for Styling and JSON for REST communications because it has better capabilities from my point of view.</p>`,
        imgUrl: '/images/frontend/languages.jpg',
      },
      {
        title: 'Frameworks, Libraries & Tools',
        description: `<p>Accross all these five years of development, I got the opportunity to learn multiples frameworks, libraries and tools that helps me to do my job. Mainly, I use in my daily basics Bootstrap and Jquery</p><p>However, I got wide experience with performance and testing elements as Grunt, requireJS, Node, etc. <strong>from creating sprite in compass to define modules that load on demand in requireJS</strong>, going through use templates twig and AJAx requests</p><p>Recently, I started with some experiments SVG plus D3 a few months ago that you can see examples in my GitHub.</p>`,
        imgUrl: '/images/frontend/frameworks-libraries-plugins.jpg',
      },
      {
        title: 'Responsive Web Design & SEO',
        description: `<p>These elements are key in the current developments to be a good frontend developer. I understood the importance from my experience in <a href='http://www.timeincuk.com' rel='nofollow' target='_blank'>Time Inc UK</a> where we tested every change impact in pages views, sales and ad-clicks basing our measures in tools like CrazyEgg, Google Analitycs and Optimizely.</p><p>All these knowledges I acquired in this company, it allows me to put in place changes for this website to render it properly in any screen size device. In addition to use SEO elemets that improves positioning.</p>`,
        imgUrl: '/images/frontend/responsive-web-design.jpg',
      },
      {
        title: 'Performance',
        description: `<p>This is key for the success of your website. I have been working for last four years to find how to improve every single detail in order to get the best performance possible for the system because a one second of delay could cost you a client</p><p>Compress and split your css, images and javascript, Load asynchronous the content, reduce the number of request are some of the considerations to do when you are optimizing your website.</p><p>However, I will study what are your necesities because I won't shoot a mosquito with a cannon, easy solution could work better in some cases</p>`,
        imgUrl: '/images/frontend/performance.jpg',
      },
      {
        title: 'Testing',
        description: `<p>I forgot this one for many years because in most of the cases because it wasn't a priority in the frontend. It was enough using tools as Chrome DevTools, Firebug and Selenium to test our systems.</p><p>However, I started to use Jest with Unit testing around a year ago to verify our JavaScript expected behaviour were working properly and I rediscovered how important is having a testing to avoid small issues when you are in a team or you revisit a file after some time.</p><p>Therefore, I decided to spend some time learning new techniques useful for future projects</p>`,
        imgUrl: '/images/frontend/testing.jpg',
      },
    ],
  },
  backend: {
    title: 'Backend Developer',
    description: 'Backend Developer Profile',
    openGraphImage: '/images/profiles/backend-profile-490px.webp',
    linkedInUrl: 'https://www.linkedin.com/in/eacardenes',
    introduction: [
      'I did backend developments as web developer for many years and I\'m still doing sometimes when it\'s required. It\'s a part of myself to try to achieve the best result possible doing when need to be done. I\'ve involved in this area for the last five years sometimes as a contractor, a employee and others in my personal projects. I understand well how the back end works and how to build it from scratch.',
      'Also, if I currently want to specialize as frontend developer, I can provide experience and vision to develop together a great platform that helps us to achieve our goal together.',
      'Consequently, I like to do backend work as well as frontend because all it\'s about this WWW world that I have passion about it. Therefore I won\'t hesitate to get involved myself when you ask me for. Here is my backend background so i hope you find useful because it\'s a great complement for a frontend developer have comprehesion and understanding the language the backend developers speaks.'
    ],
    strengths: [
      {
        title: 'Languages',
        description: `<p>I have been working with PHP for the last five years, more specifically I swapped from PHP4 to PHP5 three years ago. I got strong experience developing complex PHP systems using OOP, design patterns and MVC architecture to maximize performance and maintainability</p><p>Additionally, I began working with MySQL and other databases two years ago, mostly in MySQL for data storage and JSON for REST communications because it has better capabilities from my point of view.</p>`,
        imgUrl: '/images/backend/languages.jpg',
      },
      {
        title: 'Frameworks & Tools',
        description: `<p>Across all these five years of development, I got the opportunity to learn multiple frameworks and tools that help me to do my job. Mainly, I use in my daily basics Laravel and Symfony</p><p>However, I got wide experience with performance and testing elements as Composer, PHPUnit, etc. <strong>from creating REST APIs to defining modules that load on demand</strong>, going through use templates and AJAX requests</p><p>Recently, I started with some experiments with microservices and Docker a few months ago that you can see examples in my GitHub.</p>`,
        imgUrl: '/images/backend/frameworks.jpg',
      },
      {
        title: 'Database & APIs',
        description: `<p>These elements are key in the current developments to be a good backend developer. I understood the importance from my experience in various companies where we tested every change impact in performance and scalability basing our measures in tools like New Relic, MySQL Workbench and Postman.</p><p>All these knowledges I acquired in these companies, it allows me to put in place changes for backend systems to handle data properly and efficiently. In addition to use REST APIs that improve communication between systems.</p>`,
        imgUrl: '/images/backend/comunications-rest-api.jpg',
      },
      {
        title: 'Performance & Security',
        description: `<p>This is key for the success of your backend system. I have been working for last four years to find how to improve every single detail in order to get the best performance possible for the system because a one second of delay could cost you a client</p><p>Optimize database queries, implement caching strategies, reduce the number of requests are some of the considerations to do when you are optimizing your backend.</p><p>However, I will study what are your necessities because I won't shoot a mosquito with a cannon, easy solution could work better in some cases</p>`,
        imgUrl: '/images/backend/performance.jpg',
      },
      {
        title: 'Testing & Deployment',
        description: `<p>I forgot this one for many years because in most of the cases because it wasn't a priority in the backend. It was enough using tools as New Relic, MySQL Workbench and Selenium to test our systems.</p><p>However, I started to use PHPUnit with Unit testing around a year ago to verify our class expected behaviour were working properly and I rediscovered how important is having a testing to avoid small issues when you are in a team or you revisit a file after some time.</p><p>Therefore, I decided to spend some time learning new techniques useful for future projects</p>`,
        imgUrl: '/images/backend/testing-debuging.jpg',
      },
    ],
  },
  'software-architect': {
    title: 'Software Architect',
    description: 'Software Architect Profile',
    openGraphImage: '/images/profiles/software-architect-profile-490px.webp',
    linkedInUrl: 'https://www.linkedin.com/in/eacardenes',
    introduction: [
      'I have been working on software architecture for the last five years, more specifically I focused on scalable architectures and microservices three years ago. I got strong experience designing complex systems using design patterns, SOLID principles and clean architecture to maximize maintainability and scalability.',
      'Additionally, I began working with cloud platforms and containerization two years ago, mostly in AWS for infrastructure and Docker for deployment because it has better capabilities from my point of view.',
      'Consequently, I like to do software architecture work because all it\'s about this software development world that I have passion about it. Therefore I won\'t hesitate to get involved myself when you ask me for. Here is my software architecture background so i hope you find useful because it\'s a great complement for a developer have comprehension and understanding the language the software architects speaks.'
    ],
    strengths: [
      {
        title: 'System Design',
        description: `<p>I have been working on system design for the last five years, more specifically I focused on scalable architectures and microservices three years ago. I got strong experience designing complex systems using design patterns, SOLID principles and clean architecture to maximize maintainability and scalability</p><p>Additionally, I began working with cloud platforms and containerization two years ago, mostly in AWS for infrastructure and Docker for deployment because it has better capabilities from my point of view.</p>`,
        imgUrl: '/images/software-architect/architect-definition.jpg',
      },
      {
        title: 'Methodologies & Processes',
        description: `<p>Across all these five years of development, I got the opportunity to learn multiple methodologies and processes that help me to deliver high-quality software. Mainly, I use in my daily basics Agile and Scrum methodologies</p><p>However, I got wide experience with DevOps and CI/CD elements as Jenkins, GitLab CI, etc. <strong>from creating automated pipelines to defining deployment strategies</strong>, going through use monitoring and logging tools</p><p>Recently, I started with some experiments with Kubernetes and service mesh a few months ago that you can see examples in my GitHub.</p>`,
        imgUrl: '/images/software-architect/scrum-methodology.jpg',
      },
      {
        title: 'Development Lifecycle',
        description: `<p>These elements are key in the current developments to be a good software architect. I understood the importance from my experience in various companies where we tested every architectural decision impact in performance and maintainability basing our measures in tools like New Relic, Prometheus and Grafana.</p><p>All these knowledges I acquired in these companies, it allows me to put in place architectural decisions for systems to handle growth properly and efficiently. In addition to use best practices that improve code quality and team productivity.</p>`,
        imgUrl: '/images/software-architect/software-architect-development-steps.jpg',
      },
      {
        title: 'Performance & Scalability',
        description: `<p>This is key for the success of your software architecture. I have been working for last four years to find how to improve every single detail in order to get the best performance possible for the system because a one second of delay could cost you a client</p><p>Optimize database design, implement caching strategies, reduce the number of requests are some of the considerations to do when you are optimizing your architecture.</p><p>However, I will study what are your necessities because I won't shoot a mosquito with a cannon, easy solution could work better in some cases</p>`,
        imgUrl: '/images/software-architect/website-technology.jpg',
      },
      {
        title: 'Testing & Quality Assurance',
        description: `<p>I forgot this one for many years because in most of the cases because it wasn't a priority in the architecture. It was enough using tools as New Relic, Prometheus and Grafana to monitor our systems.</p><p>However, I started to use automated testing with Unit testing around a year ago to verify our architectural decisions expected behaviour were working properly and I rediscovered how important is having a testing to avoid small issues when you are in a team or you revisit a file after some time.</p><p>Therefore, I decided to spend some time learning new techniques useful for future projects</p>`,
        imgUrl: '/images/software-architect/architect-definition.jpg',
      },
    ],
  },
};

export function getProfileData(role: keyof ProfileData): ProfileConfig {
  return profileData[role];
}

export function getAllProfileRoles(): (keyof ProfileData)[] {
  return Object.keys(profileData) as (keyof ProfileData)[];
}