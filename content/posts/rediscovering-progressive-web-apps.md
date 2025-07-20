---
title: "Rediscovering progressive web apps"
description: "Today, I’m writing you about progressive web apps. Since I went to Fullstack 2016 in London, I started to feel passion about this and spend some time researching on my own but it wasn’t until I attended Google’s Building Progressive Web Apps (Beta) course that I recognised that my understanding of this concept was focus mainly on bringing native capabilities from native apps to mobile including offline elements like service workers, push notifications, cache, etc."
date: "2016-09-15"
author: "eduardo aparicio cardenes"
tags: ["Progressive Web Apps", "Web Development", "Performance", "UX"]
image: "/images/blog/rediscovering-progressive-web-apps-frontmatter.jpg"
---

### Rediscovering progressive web apps

![Rediscovering progressive web apps](/images/blog/rediscovering-progressive-web-apps-frontmatter.jpg)

Today, I’m writing you about progressive web apps. Since i went to Fullstack 2016 in London, I started to feel passion about this and spend some time researching on my own but it wasn’t until I attended “Google’s Building Progressive Web Apps (Beta)” course that i recognise that my understanding of this concept was focus mainly on bringing native capabilities from native apps to mobile including offline elements like service workers, push notifications, cache, etc.

However, I discover through this course that PWA is much more than that it change the way we build in web, introduce new challenges from design point of view that contribute an evolution of UX interaction as well require an extra effort on performance to compete with native apps running on the devices.

Therefore, PWA pull together a several existing concepts and technologies that already exists and bring a new approach that define a new architectural approach for our application, elements like responsive design, fast animation, images compression, etc. combine with new technologies like service workers, push notifications, etc. expand our frontiers even further than ever before.

![PWA concepts](/images/blog/rediscovering-progressive-web-apps-frontmatter.jpg)

How I understand a progressive web app can be summary in three parts (as we can see above), design, connectivity and performance.

Definitely I see **design **as** **one of the main components for any web.** **We want to create a “Wuou!” every time you enter in the site that make you feel the need to share with everyone saying, “Did you see this website? it’s just amazing”.

Consequently, our standards become important, it’s not enough anymore deliver an average experience because **we target native app in terms of performance** **but keeping the distance in our design** because **we don’t have all of native capabilities** **and that can upset our users**.

Currently, the PWA’s requirements still evolving and it’s hard for me to predict what it will be all the requirements right now, but we know some of the existing requirements that definitely are a must in our development to be consider our web app as one.

- **Responsive web design** (“mobile friendly”: must have a great experience for each device)
- **Fluid animations** (60fps).
- **High quality UI/UX** that make the experience, interesting article of ‘*[Designing Great UIs for Progressive Web App*s](http://medium.com/@owencm/designing-great-uis-for-progressive-web-apps-dd38c1d20f7)’.
- **Appropriately communication of offline state**, users should be able to understand what actions they can take while offline
- Provide what customer need, no what you have (**personalised content, optional**)
- … (probably much more are present but i need to research in more detail)

On the top of that we want to provide a incredible user experience providing what they need with a few clicks, example, you could do all your shopping with one click without manually introduce every item.

Second concept I extracted from this course is **connectivity**, our users should be able to use our web at any anytime, anywhere is not more *“No connection screen”, “Waiting to download your catalogue” (for dozens of minutes), etc*, **we should be capable to remove the boundaries between online and offline**, you will be able to see what you really need focus in the data (with data driven models) know what our users want and helping them to get it.

I know what you are about to say “remove boundaries between offline and online, it’s not always possible”, but it’s our time to challenge ourselves, there are many tools in this area we have elements like “service workers”, “local Storage”, “indexedDB”, and access to a mostly all the feature of our device/computer. How far can we go? I imagine myself that there are some synchronisation point but everything else it can be online.

Finally we need **performance **at all levels, we need to care a lot about what we are putting in our customer hands because a few milliseconds in our checkout process can have a massive impact if they buy the product or no or what if you need to click to see the product details and that require some seconds, how many customer will you lose on the process?, etc. you probably know hundred of examples that you experiment on Internet.

In this area, I’m not an expert but [Paul Lewis](https://twitter.com/aerotwist) was extraordinary in the course giving a masterclass about this, there are several elements about performance some of them are:

- [Instant loading](https://www.youtube.com/watch?v=TVolBgyaiTQ), we much data from the cache as possible before go to the network, it’s a great video about this subject [“Instant-loading Offline-first (Progressive Web App Summit 2016)”](https://www.youtube.com/watch?v=qDJAz3IIq18).
- **Progressive web load**, having everything in cache reduce remove network problem but we still need to reduce rendering time of the page because rendering will become our next bottleneck, here is a great video call [“A Rendering Performance Guide from Paul Lewis”](https://www.youtube.com/watch?v=9xjpmpX4NJE).
- **Backend response matters**, it’s not only front end job to improve web performance, it’s teamwork.
- **Accessibility can help performance **(just a though if your web can work with no-js then you can preload your web really quickly and defer js load later on)
- **Images metadata** (you can save a lot of size removing unnecessary metadata), there is a really nice article from [Inian Parameshwaran](https://blog.dexecure.com/impact-of-metadata-on-image-performance/) about this

I suggest as a first contact point check [Web fundamentals: performance](https://developers.google.com/web/fundamentals/performance), there are a lot of resources that will help to build your PWA’s sadly, I couldn’t see well define this concept right now, we speak about elements like **animations, fast load or data **as specific of this kind of app but these elements in my opinion are not specific of progressive web apps.

Thanks, you manage to get to the bottom of this article, if you still remember something or you found interesting please drop me a comment or feel free to contact me in twitter [@byeaduardoac](https://twitter.com/byeduardoac). The rest I have to say it’s deeply grateful to [Sarah Clark](https://twitter.com/a_bowl_of_stars) for invite me and all her team that put an amazing course such as small lapse of time.

Finally special mention about a great article from Alex Russell call [What, Exactly, Makes Something A Progressive Web App?](http://bit.ly/2czUfak), that made me to revisit this article even before I published. 