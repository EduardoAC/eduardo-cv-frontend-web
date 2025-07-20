---
title: "Moneyfarm web app a brief evolution story"
description: "I joined Moneyfarm at the end of 2018. I soon realized that it was a company with talented people that faced the challenge of delivering new products and services while paying back the technical debt it had incurred in its start-up phase."
date: "2020-03-31"
author: "eduardo aparicio cardenes"
tags: ["Frontend Architecture", "Technical Debt", "Web Development", "React"]
image: "/images/blog/moneyfarm-web-app-a-brief-evolution-story-frontmatter.jpg"
---

I joined Moneyfarm at the end of 2018. I soon realized that a company with talented people faced the challenge of delivering new products and services while paying back the technical debt it had incurred in its start-up phase. The task at hand is challenging, but we’ve made significant progress in the past 16 months and it’s this story that I want to share with you.

When I look back, we have come a long way in the development and maturity of our frontend architecture but we still have a long way to go. We are moving forward with clear objectives in mind:

- continuously improve our developer experience
- create a dynamic and responsive web app;
- Customer experience

![Moneyfarm at the end of 2018](/images/blog/moneyfarm-web-app-a-brief-evolution-story-markdown.png)

In order to understand our journey let’s start explaining how things were back then. We were 5 frontend developers: 3 contractors, 1 permanent developer and 1 recently joined, spread across 3 squads; onboarding, investment management, and investment creation.

Our Frontend infrastructure was composed of three major tech stacks and an orchestrator, I will start describing them on chronological order from the day they have been built

Firstly, we have **Groovy legacy App,** the heart of the company for almost a decade. A large monolith application built on **Groovy **and powered by** Grails**. Using a user interface (UI) majorly server-side rendering through Groovy Server Pages (GSP) handling events through Jquery although a few years ago AngularJS was introduced to certain pages.

Secondly, we have an **AngularJS legacy app, **a project created as a proof of concept to extract the angular app from the **Groovy legacy App **as a standalone application. Although, quickly became the replacement to develop new features for our customers. Written on **client-side **using** AngularJS **and** Jquery**; on the **server-side **using** Koa **and** NodeJS.**

Finally, developers decided to start the migration to **ReactJS** at some point in early 2018. React Ecosystem (our current stack) was composed of three independent applications using **ReactJS **and** Redux,** serving bundle and assets by an Nginx reverse proxy.

These three separate apps, one per squad, were capable of deploying and running independently, still sharing part of the functionality through set common libraries, containing from the Routes to the Authentication flow. Indeed an architecture Inspired on the micro-frontends pattern using the FE router as the orchestrator of applications and API calls.

#### The challenges

Moneyfarm incurred in this technical debt over the years due to different approaches brought at different points of time which those transitions had never managed to completion.

The technical debt presented a major challenge for the following reasons:

- **Lack of specialized knowledge:** Not many frontends developers were capable of developing features on the **Groovy legacy app.**
- **Unmaintained dependencies:** some of the libraries used to build projects were deprecated and no longer maintained by the creators**.**
- **High maintenance cost**: inconsistencies and different patterns caused made hard for developers adding new features or fixing bugs that they may present

Additionally, the new React ecosystem has a set of its own challenges, especially for an organization like ours which needs to be fast and agile:

- **Performance issues** were caused by the lack of bundle splitting; navigation between each application required re-fetch the same data; wrong separation of concerns in terms of customer navigation through the site and other smaller problems

Consequently, this brought us the opportunity to push for a change in order to reduce our technical debt and improve developer experience on the application. Crystallizing into our first two frontend focus OKRs in Q1 of 2019 to improve our frontend ecosystem (First-time frontend focus OKRs in Moneyfarm) supported by tech management and product.

- **Reduce Groovy legacy app from the critical path** by migrating all customer face pages into the new React ecosystem
- **Improve Frontend customer experience** by implementing an architecture which provides the customer with the experience of having only loaded application once

This aligned with what the company had in mind and I must say that I enjoyed being supported on my passion to accomplish this huge task.

#### Moneyfarm at the end of 2019

On our efforts last year we have achieved amazing milestones for the frontend ecosystem. A few of those accomplishments:

- **Vastly reduced technical debt**, we have migrated 99% (~20 pages) of the Groovy legacy app pages and over 60% of AngularJS legacy app
- **All the applications run under a SPA**, developing in separate repositories but they are bundled together to allow us improvement to the performance like bundle splitting.
- **Static assets served by CDN **instead of Nginx, allow us to scale with a fraction of the cost, reduce complexity on our deployment pipelines, and most importantly improving customer experience

Please stay tuned to this blog, we will be sharing with you a series of posts about our journey to this date. The problems we encountered, the solutions we had put in place, and what lessons we’ve learned. In the upcoming months we will be blogging about:

- [Migration from Nginx to AWS cloud front](https://medium.com/@byeduardoac/moving-from-nginx-to-aws-cloudfront-a62cedc9c882)
- Concourse and Frontend pipelines: the big mystery
- Challenges of migrating between codebases and technologies
- From Services to SPA, from 3 repositories to 1, what could go wrong? 