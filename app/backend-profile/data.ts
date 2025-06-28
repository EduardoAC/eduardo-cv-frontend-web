interface Strength {
  title: string;
  description: string;
  imgUrl: string;
}

export const strengths: Strength[] = [
  {
    title: 'Languages',
    description: `<p>I started with Java language for assignments in the university. <strong>Java is a language that I know about it however I lack of profesional experience</strong>. This language I usually pick up whenever it's neccesary to develop Android apps for my personals projects and hackathons.</p><p>On the other hand, I got a strong background in <strong>PHP for the last five years</strong>, mainly for website and SaaS developments in differents companies, I specialize on OOP, Complex algorithms and Code optimization. Additionally, <strong>I have five years of MySQL professional experience </strong>capable to design and implement database models that suit with user needs or complex systems</p><p>Finally, I have been using languages as shell and xml for long time to set up UNIX enviroments as well API communications for backend enviroments</p>`,
    imgUrl: '/images/backend/languages.jpg',
  },
  {
    title: 'Frameworks, Libraries & Tools',
    description: `<p>From the beginning of my professional career, I've been using frameworks and tools that helps me to do my job more effective. In specific, I got experience using </p><ul><li>Symfony 1.4 and 2 (4+ years)</li><li> Laravel 4 (1.5 years)</li><li>Yii2 (4+ years)</li></ul><p>In addition, I use  Composer, Bower and Grunt to help to import extensions, libraries and packages improving the modularity of my developments.</p>`,
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
]; 