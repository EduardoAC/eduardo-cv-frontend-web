interface Experience {
  startDate: string;
  endDate: string;
  company: string;
  position: string;
  description: string;
  logo?: string;
  articles?: { title: string; slug: string }[];
  technologies?: string[];
}

export const experienceList: Experience[] = [
    {
        startDate: 'March 2025',
        endDate: 'Present',
        company: 'Happening',
        position: 'Senior Frontend Engineer',
        logo: '',
        description: `<ul>
<li>Engineering excellence with initiatives in continuous deployment, testing strategy, web performance, and contract-driven development.</li>
<li>Upskilled the team and provided technical direction.</li>
<li>Mentored and sponsored technical initiatives.</li>
</ul>`,
        articles: [
            { title: 'React Higher-Order Components vs Vue.js Slots: A Dynamic Components Comparison', slug: 'react-higher-order-components-vs-vue-js-slots-a-dynamic-components-comparison' },
        ],
        technologies: ['VueJS', 'TypeScript', 'Pinia', 'Vite'],
    },
    {
        startDate: 'Oct 2023',
        endDate: 'Present',
        company: 'The Mentoring Club & ADPList.org',
        position: 'Certified Mentor',
        logo: '/images/companies/adplist-logo-light.png',
        description: `<ul>
<li>Fostered collaboration and knowledge-sharing among team members.</li>
<li>Leveraged technical expertise to assist in problem-solving.</li>
<li>Contributed to the overall success and growth of each team member in a motivating career environment.</li>
</ul>`,
        articles: [
            { title: 'Strategic Mentorship: Maximising Impact with New Joiners', slug: 'strategic-mentorship-maximising-impact-with-new-joiners' },
        ],
        technologies: [],
    },
    {
        startDate: 'June 2024',
        endDate: 'December 2024',
        company: 'OakNorth',
        position: 'Staff Frontend Engineer',
        logo: '',
        description: `<ul>
<li>Led the Design System transformation to increase adoption and time to market.</li>
<li>Provided specialised expertise to solve unsolvable problems from the existing engineering team.</li>
<li>Mentored and sponsored technical initiatives.</li>
</ul>`,
        articles: [
            { title: 'Form Fields the Never-ending Debate Inner vs Outer Spacing', slug: 'form-fields-the-never-ending-debate-inner-vs-outer-spacing' },
            { title: 'Guide for URL Query vs Path Parameters in Protected Web Apps', slug: 'guide-for-url-query-vs-path-parameters-in-protected-web-apps' },
            { title: 'Leveraging Metrics to Communicate Business Value', slug: 'leveraging-metrics-to-communicate-business-value' },
        ],
        technologies: ['React', 'React Native', 'TypeScript', 'TanStack', 'Vite', 'Cypress', 'TanStack Query', 'NextJS'],
    },
    {
        startDate: 'November 2020',
        endDate: 'June 2024',
        company: 'Skimlinks',
        position: 'Principal Software Engineer',
        logo: '',
        description: `<ul>
<li>Led the frontend team through a transition period, providing guidance, support, and mentorship to ensure continuity and efficiency in project delivery.</li>
<li>Collaborated closely with cross-functional teams, including product management and stakeholders, to define and prioritise the quarterly roadmap, aligning technical efforts with business objectives.</li>
<li>Championed continuous improvement initiatives in Frontend development processes, tools, and technologies, driving innovation and efficiency across the team.</li>
<li>Delegated tasks and responsibilities effectively, empowering team members to take ownership of specific work areas while fostering a collaborative and supportive work environment.</li>
<li>Re-architected a critical Chrome extension, transitioning from Redux to an event-driven model to enhance performance and scalability, and implemented a bloom filter to reduce payload size and requests, improving user experience.</li>
<li>Supported the company's geographical expansion by introducing internationalisation, timezone, and currency support across all platforms.</li>
<li>Led the successful incorporation of TypeScript across five projects, impacting hundreds of components.</li>
<li>Developed and maintained an affiliation script with over 100 million monthly clicks, ensuring cross-browser compatibility, including legacy support for IE8 across multiple regions.</li>
</ul>`,
        articles: [
            { title: 'Managing Concurrency in Chrome Extensions', slug: 'managing-concurrency-in-chrome-extensions' },
            { title: 'Optimising Chrome Extensions: Beyond Redux, Post-Manifest v3', slug: 'optimising-chrome-extensions-part-1-beyond-redux-post-manifest-v3' },
            { title: 'Optimising Chrome Extensions: Part 2- Managing your state and communication in React', slug: 'optimizing-chrome-extensions-state-and-communication-in-react' },
            { title: 'Using React-i18next within Chrome extension', slug: 'using-react-i18next-within-chrome-extension-manifest-v3' },
            { title: 'Real-time Language Sync Between Web Applications and Browser Extensions', slug: 'real-time-language-sync-between-web-applications-and-browser-extensions' },
        ],
        technologies: ['Vanilla JS', 'React', 'Redux', 'Chrome extension', 'TypeScript', 'Jest', 'Cypress', 'TanStack Query', 'NextJS'],
    },
    {
        startDate: 'May 2020',
        endDate: 'Oct 2020',
        company: 'Beacon',
        position: 'Senior Software Engineer',
        logo: '',
        description: `<ul>
<li>Developed Beacon's payment solution, overseeing frontend implementation and managing a remote team in India.</li>
<li>Collaborated with stakeholders to align technical efforts with business objectives.</li>
<li>Achieved successful delivery, driving revenue growth and user satisfaction.</li>
</ul>`,
        articles: [],
        technologies: ['React', 'Redux', 'TypeScript', 'React Testing Library', 'Cypress'],
    },
    {
        startDate: 'Nov 2018',
        endDate: 'Apr 2020',
        company: 'Moneyfarm',
        position: 'Senior Frontend Engineer',
        logo: '',
        description: `<ul>
<li>Led Frontend Architecture with a team of seven engineers</li>
<li>Migrated legacy Groovy pages into React</li>
<li>Moved from Nginx to AWS CloudFront</li>
<li>Optimised developer experience through improving tooling and processes</li>
<li>Moved from Microfrontend into Monorepositories</li>
<li>Board member and contributor of API gateway to enable third-party integrations.</li>
<li>Implemented effective JWT token expiration management</li>
<li>Delivered best practices for API design</li>
<li>Built and mentored in contract testing through swagger contracts</li>
</ul>`,
        articles: [
            { title: 'Moving from Nginx to AWS CloudFront', slug: 'moving-from-nginx-to-aws-cloudfront' },
            { title: 'Managing JWT Token Expiration', slug: 'managing-jwt-token-expiration' },
        ],
        technologies: ['React', 'Redux', 'TypeScript', 'Angular 1', 'Angular 2', 'Jest', 'Cypress'],
    },
    {
        startDate: 'Nov 2016',
        endDate: 'Nov 2018',
        company: 'Zalando',
        position: 'Frontend Developer',
        logo: '',
        description: `<ul>
<li>Responsible for a team of five engineers for the career.zalando.com</li>
<li>Zonar - Led Frontend project to support internal 30K evaluations every cycle, creating a platform with end-to-end responsibility from feedback collection cycles to outcome memo decisions from the PRC committee, including development tools that will help towards personal and professional growth</li>
<li>CEP - Led the development of the first UI platform for CEP (Courier, Express and Parcel Services) to enable straightforward setup of warehouses, carriers and management of steering cases</li>
<li>Built CI/CD on Jenkins using Groovy, equivalent today to Jenkins X</li>
</ul>`,
        articles: [],
        technologies: ['React', 'Redux', 'TypeScript', 'Ant Design', 'Material UI', 'Groovy'],
    },
    {
        startDate: 'Mar 2016',
        endDate: 'Oct 2016',
        company: 'Ocado',
        position: 'Senior Web Developer',
        logo: '',
        description: '',
    },
    {
        startDate: 'Oct 2014',
        endDate: 'Mar 2016',
        company: 'Ocado',
        position: 'Contractor',
        logo: '',
        description: '',
    },
    {
        'startDate':   'August, 2014',
        'endDate':     'October, 2015',
        'company':     'Time Inc UK',
        'position':    'Web developer. ',
        'logo':        '/images/companies/time-inc-uk.png',
        'description': "<p>During my time in Time Inc UK (Previously Time & Warner). "
        + "I will be able to participate in project as housetohome.co.uk and theroomedit.com. </p>"
        + "<p>As web developer role I had the opportunity to focus more in "
        + "Frontend in this period of my career than Backend developmet in a "
        + "proporciton 75% and 25%. I got the opportunity to improve my SEO "
        + "skills and test how impact and improve a website as housetohome "
        + "with over 15 million pageviews a month. I've been responsible "
        + "to do most of the new redesign on this website.</p>"
        + "<p>Adittionally, I've been involve in the creation of a new "
        + "product for this company call theroomedit.com which is responsive "
        + "site across all range of device where I played a full stack role "
        + "where a large range of tasks from develop templates and view to "
        + "parsethe model skeleton to parse the response from our Drupal API "
        + "to our Laravel frontend models.</p>",
    },
    {
        'startDate':   'February, 2012',
        'endDate':     'April ,2014',
        'company':     'GlobalIncubator',
        'position':    'Web developer',
        'logo':        '/images/companies/global-incubator.png',
        'description': '<p>I was responsible to develop new technologies to '
        + 'give support to our virtual incubation as well to provide a platform '
        + 'that allows them to collect data for business intelligence called Q-apps.</p>'
        + '<p>Therefore I was mainly oriented to develop backend structure '
        + 'using technologies as Threads, APC, Memcache, Semaphore, etc. I put '
        + 'in place a solution that currently still working today based in PHP '
        + 'language. </p><p> However, as you can realise a good backend '
        + 'platform needs also a optimize frontend client. Therefore I had the '
        + 'opportunity to develop parts of the frontend of Q-apps applications '
        + 'that is a complex system that allow to collect, process and view '
        + 'results in real-time. In order to do such requirement, one of tasks '
        + 'were to implement a results view that I create a complex filter '
        + 'system in JavaScript that allow to the user change dynamically '
        + 'what filters they want to see. Basically high configurable filter '
        + 'system based in the questions, types and data that you have in your '
        + 'Q-app.</p>',
    },
    {
        'startDate':   'October, 2011',
        'endDate':     'July ,2012',
        'company':     'Rey Juan Carlos University',
        'position':    'Master in Computer graphics, games and virtual reality',
        'logo':        '/images/companies/rey-juan-carlos-university.png',
        'description':
         '<p>The overall objective of University / Master in Computer Graphics, '
        + 'Games and Virtual Reality is currently providing training and quality '
        + 'in video games, animation, physics simulation and virtual reality, '
        + 'both technological and methodological aspects of implementation.</p>',
    },
    {
        'startDate':   'September, 2011',
        'endDate':     'December, 2011',
        'company':     'Canarias 7 Digital',
        'position':    'Junior Web developer',
        'logo':        '/images/companies/canarias-7-digital.png',
        'description': '<p>Contract to develop '
        + '<a href="http://monicavieira.com/" rel="nofollow" target="_blank">Monica Vieira</a>. '
        + 'my second contract for Canarias 7 digital to develop a new website. '
        + 'I created this one using Symfony 1.4 based in a new design provided from Canarias 7 Digital. '
        + 'As my previous contract with them, I implemented a full website using '
        + 'HTML, CSS, JAVASCRIPT and PHP technologies including javascript '
        + 'and symfony plugins to allow with a backend management that '
        + 'allow a basic CMS. The support I provided was 6 months for changes.</p>',
    },
    {
        'startDate':   'May, 2011',
        'endDate':     'September, 2011',
        'company':     'Canarias 7 Digital',
        'position':    'Junior Web developer',
        'logo':        '/images/companies/canarias-7-digital.png',
        'description': '<p>Contract to develop '
        + '<a href="http://www.gestaltcanarias.es/" rel="nofollow" target="_blank">Gelstalt Canarias Website</a>. '
        + 'I started my professional career as a web developer '
        + 'creating full sites in symphony 1.0 and 1.4 where I was responsible to '
        + 'deliver a full website based on a design provide for the company. '
        + 'For this task, I got involved with HTML, CSS, JAVASCRIPT and PHP '
        + 'technologies including javascript and symfony plugins to allow '
        + 'a really basic CMS that they still using today The support I '
        + 'provided was 6 months for changes.</p>',
    },
    {
        'startDate':   'June, 2009',
        'endDate':     'April ,2011',
        'company':     'University of Las Palmas de Gran Canaria',
        'position':    '<a href="http://berlioz.dis.ulpgc.es/roc-siani/publicaciones-principal/pdfs/memoria-pfc-eduardo-aparicio-cardenes-jul-2011.pdf" rel="nofollow" target="_blank">'
        + 'Odometry error reduction in a mobile robot using scan '
        + 'matching algorithms based in laser sensor range</a>',
        'logo':        '/images/companies/ulpgc.png',
        'description': '<p>The MbICP is a variant of the ICP algorithm (Iterative '
        + 'Closest Point). This method has aim to correct the error caused by '
        + 'external odometry errors are not reflected Robot in codifcadores '
        + 'such as: landslides on wheels, rounding errors, etc. For It employs '
        + 'measurements of range sensor (laser) whose measurements have high '
        + 'accuracy within its operating range giving a negligible level of '
        + 'noise, which favors dimension of the problem.</p>',
    },
    {
        'startDate':   'August, 2008',
        'endDate':     'May ,2009',
        'company':     'Mirada PLC',
        'position':    'Junior Software developer',
        'logo':        '/images/companies/mirada-plc.png',
        'description': '<p>I started my professional career in my last year '
        + 'of university as a Junior Developer in C++ under Eclipse IDE. </p>'
        + '<p>My role were developing next graphic interface for the new platform '
        + 'of ONO capturing the data from the stream for the satellite using '
        + 'them API and render this subsequence of data in a Grid view where '
        + 'the client can see the television schedule for all the channels.</p>'
        + '<p>We compiled using Cross compiling in Code Warrior for decoder '
        + 'devices provided from ONO, project that still currently in our homes '
        + 'today when we contract our paid television.</p>',
    },
    {
        'startDate':   'October ,2003',
        'endDate':     'July, 2008',
        'company':     'University of Las Palmas de Gran Canaria',
        'position':    'Software Engineer',
        'logo':        '/images/companies/ulpgc.png',
        'description': '<p>I developed as a Software Engineer with knowledge in '
        + 'artificial intelligence, robotics, programming and a long list of '
        + 'skills to be ready to become a Software architect. From the beginning,'
        + 'I studied every signature with a big passion to be ready for a good '
        + 'professional career. If you want to know more about what did I study'
        + 'here please enter in the <a href="http://www.eii.ulpgc.es/tb_university_ex/?q=ingenier%C3%ADa-inform%C3%A1tica-ii" rel="nofollow" target="_blank">'
        + 'ULPGC university plan</a></p>',
    },
]; 