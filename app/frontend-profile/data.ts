interface Strength {
  title: string;
  description: string;
  imgUrl: string;
}

export const strengths: Strength[] = [
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
    description: `<p>I forgot this one for many years because in most of the cases because it wasn't a priority in the frontend. It was enough using tools as New Relic, Google analitycs and Selenium to test our systems.</p><p>However, I started to use Grunt with Unit testing around a year ago to verify our class expected behaviour were working properly and I rediscovered how important is having a testing to avoid small issues when you are in a team or you revisit a file after some time.</p><p>Therefore, I decided to spend some time learning new technices useful for future projects</p>`,
    imgUrl: '/images/frontend/testing.jpg',
  },
]; 