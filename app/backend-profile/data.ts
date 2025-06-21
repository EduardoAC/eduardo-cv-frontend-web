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
    title: 'Working tools',
    description: `<p>As a developer, you must be capable of use control version systems in order to track your changes, specially when you are collaborating in projects with more people working at the same time. That why <strong>I started to use Git 4 years ago</strong>, however, it wasn't until one and half years ago I added code review and pull requests using github to my developments learned from my Time Inc UK job.</p><p>As a complement, I've been doing web developments in Netbeans and PHPStorm for years. However, I do prefer Eclipse for Java and Android developments.That will make extremely easy to adapt to the IDE you are using in the company</p>`,
    imgUrl: '/images/backend/working-tools.jpg',
  },
  {
    title: 'Performance',
    description: `<p>I'm love to achieve the maximal perfomance in any feature i do, as first iteration i develop my code using <a href='https://en.wikipedia.org/wiki/Big_O_notation' target='_blank' rel='nofollow'> Big O notation for time complexity </a> each time.</p> <p>Once I done this I go for server tools that allow me to reduce the bottleknecks using Memcached, APC and Apache set up to reduce algorithm calculations, databases access and client requests. Adding to this system a update cache system on demand avoid inconsistent data</p><p>Finally, I like to enable monitoring of the system with NewRelic for two reasons. First for debugging and testing porposes, Secondly, it's hard to extract the best performance in one iteration so this allow to analyze the opportunities to improve the system</p>`,
    imgUrl: '/images/backend/performance.jpg',
  },
  {
    title: 'Testing & Debugging',
    description: `<p>I use combine NewRelic, Unit testing, XDebug and Jenkings to test and debug the systems, I work with. These are a good tools that allow us to validate our code or find bugs.</p><p>Therefore each time a person try to deploy we  will be able to run a battery of tests on our feature and the whole system. to helps us to see what will it be the impact of releasing our feature. Preventing us to put on live features that can break our sites. In addtition to that, when we join this to our control version enviroment we can find what need to be fixed and where locate it.</p><p>However, I aware this setup won't avoid all the bugs in live releases but it's a good filter against common bug and issues in a collaborative development enviroment</p>`,
    imgUrl: '/images/backend/testing-debuging.jpg',
  },
]; 