---
title: "Optimising Chrome Extensions: Part 1—Beyond Redux, Post-Manifest v3"
description: "Explore Chrome extension evolution, moving beyond Redux in Post-Manifest v3. Discover efficient alternatives for optimized development."
date: "2023-10-01"
author: "eduardo aparicio cardenes"
tags: ["Chrome Extensions", "Redux", "Web Development", "Manifest V3"]
image: "/images/blog/optimising-chrome-extensions-part-1-beyond-redux-post-manifest-v3-frontmatter.png"
---

The landscape of Chrome extension development underwent a significant shift with the introduction of Manifest v3. In this article, we’ll explore the journey of why we decided to part ways with the Redux ecosystem in our Chrome extension after adopting Manifest v3. We aim to provide insights and guidance for fellow extension developers facing similar decisions in selecting their tech stack.

Our initial foray into Chrome extension development was rooted in manifest v2, where we employed a robust React-Redux stack. This setup, bolstered by the [webext-redux](https://github.com/tshaddix/webext-redux) package by Tyler Shaddix, facilitated seamless state management across background scripts and content scripts. The Chrome runtime connect mechanism allowed real-time synchronisation using the subscription pattern, enabling easy usage of Redux across all our scripts.

#### Challenges Encountered

However, no architecture is without its challenges. One notable drawback was the duplication of the store in memory across every tab where our extension ran. As our application grew in complexity, this led to potential inefficiencies, particularly considering today’s systems that might run many tabs simultaneously.

Additionally, the changes introduced in manifest v3, where the background script no longer persisted in memory, presented a hurdle. Connections reset unless explicitly persisted in the cache, aligning with the new architecture’s goal of handling incoming messages efficiently.

![Redux architecture and challenges](https://cdn-images-1.medium.com/max/800/0*NQTZEyuAXa-H54MC)

While Redux had served us well, its drawbacks in the context of Chrome extension development became apparent:

- **Duplication of Store:** Storing the same data in memory across multiple tabs posed scalability challenges.
- **Service Worker Synchronization:** Maintaining synchronisation between reloads and shutdowns of the service worker became a requirement, introducing complexities like caching and restoring the store and making changes to enable broadcasting state as runtime connect is lost between SW executions.
- **Increased Message Overhead:** Numerous messages between content and background scripts, especially during data loading from the network, added overhead that could be mitigated.
- **Redux as a Cache:** In some scenarios, using Redux as a glorified cache became counterproductive as there are better approaches, particularly on extension, to overcome these difficulties.

#### Alternative Paths for Redux Enthusiasts

While our journey led us to part ways with Redux in our Chrome extension, we understand that some developers may still be keen on persisting with this familiar tool. Fear not, for alternatives exist in the post-manifest v3 era, offering compatibility and viable solutions:

- **Npm package [@eduardoac-skimlinks/webext-redux](https://www.npmjs.com/package/@eduardoac-skimlinks/webext-redux):** For developers determined to stick with Redux using webext-redux, I’ve introduced a series of changes to support manifest v3. This new package implements the suggested alterations for manifest v3 compatibility, addressing specific challenges highlighted in [PR-282 within Webext-redux](https://github.com/tshaddix/webext-redux/pull/282). By embracing this alternative, you can seamlessly continue leveraging Redux while ensuring alignment with the requirements of manifest v3.
- **Npm package [reduxed-chrome-storage](https://github.com/hindmost/reduxed-chrome-storage):** This standalone provider offers a dedicated solution for storing the Redux store in the Chrome storage cache. While it may require a shift in your approach, this alternative ensures persistence and efficient data handling within the Chrome ecosystem.

Choosing the right path post-manifest v3 depends on your specific needs, preferences, and the intricacies of your extension. As you embark on this alternative journey, consider the nuances of each solution to find the best fit for your Redux-powered Chrome extension.

Remember, adaptability is key in the ever-evolving landscape of Chrome extension development.

#### Moving Beyond Redux: Embracing Efficiency

In our journey towards adapting to the changes brought by manifest v3, it became evident that the challenges posed by Redux in the Chrome extension context were becoming more pronounced. We recognised the need for a more efficient and streamlined approach to handle state management without the inherent complexities of Redux.

![Message architecture and cache](https://cdn-images-1.medium.com/max/800/0*8OIq52AmAVXFNvn2)

The imperative to minimise the impact on the end-user experience was at the forefront of our considerations. The duplication of the store in memory across tabs, an inherent characteristic of Redux, emerged as a significant concern. Our quest for alternatives took shape, intending to reduce unnecessary redundancies, ensuring a smoother and more resource-efficient user journey.

#### Exploring efficiency mechanism for caching data on the extension

##### Caching Headers

In our pursuit of efficiency, we considered implementing caching headers in responses. However, a significant challenge emerged regarding URL paths. Using URL matching, the cache risked retrieving items from another user’s session, notably when two users shared the same computer.

This issue was exacerbated by using an authentication header instead of a cookie for these requests (More details in [Section 4.2 of RFC7235](http://greenbytes.de/tech/webdav/rfc7234.html#response.cacheability)). Unfortunately, adapting for caching headers would require substantial changes due to our existing API structure and credential handling.

Furthermore, it’s essential to note that once caching headers are stored, they cannot be purged automatically. Manual user action is required, introducing an additional layer of complexity.

As a result, our proposed solution had to be temporarily shelved. This setback underscores the intricate considerations and limitations in optimising our extension’s efficiency, particularly when faced with challenges that, for now, remain insurmountable.

##### Chrome Storage

Following challenges encountered with the browser cache, we determined that the optimal solution for persisting data between service worker executions was to leverage the Chrome Storage API. This approach enabled asynchronous persistence of the data required for the extension to function. However, our exploration revealed complexities associated with handling concurrency.

For an in-depth understanding of these complexities and how we manage concurrency in Chrome Extensions, please check out our detailed explanation in [Managing Concurrency in Chrome Extensions](https://medium.com/@byeduardoac/managing-concurrency-in-chrome-extensions-86de537c911d). This additional resource delves into the intricacies of ensuring seamless data persistence within the Chrome Storage API.

#### Optimising pub-sub messaging efficiency

Messaging in Redux necessitates a constant back-and-forth to keep all tabs synchronised, given that the store is shared across them. However, upon a thorough analysis of our system, we identified two main flaws contributing to the high message volume.

Firstly, recognising that each tab requires information based on its context, we realised that tabs don’t need to retain all data in the Redux store. For instance, if Tab 1 needs data A to render and Tab 2 needs data B, Tab 1 doesn’t need to keep both A and B in Redux. We pivoted towards a content script-centric approach, where each script requests and retains only the required data, minimising the message volume to essential updates.

Secondly, we revisited how data was requested in Redux, opting for a more holistic approach. Rather than asking for specific sections of the state in the store, we crafted messages with enough abstraction. These messages are designed to be comprehensive, eliminating the need for multiple requests. This approach strikes a middle ground, simplifying the process without the complexity of fetching all data in a single message, akin to GraphQL.

This strategic shift aimed to free us from the constraints of duplicated stores across multiple tabs, seamlessly aligning with our overarching goal of optimising the extension’s performance.

#### Benefits of Moving Beyond Redux

##### Simplified Architecture

The decision to distance ourselves from Redux brought about a significant simplification of our extension’s architecture. Given the evolving landscape driven by manifest v3, this streamlining process proved especially crucial, which nudged us towards adopting more efficient and streamlined development practices.

##### Empowering Content Scripts with Greater Autonomy

Rather than constructing our extension around a centralised state for the entire application, we’ve embraced a paradigm where each content script manages its internal state independently. In this approach, we leverage the service worker as both a cache and a sophisticated data processing system, facilitating efficient persistence of network data.

Despite the advancements in our architecture, synchronisation of shared data remains essential. We achieve this by utilising the service worker to broadcast data across all scripts, a mechanism akin to how webext-redux listened for state changes.

#### Future-Proofing Extension Development

##### Adapting to Manifest v3

Moving beyond Redux was not merely a reaction to challenges but a proactive response to the transformative changes introduced by Manifest v3. Adapting to this evolving architecture was paramount for ensuring our extension’s continued success and relevance in the dynamic Chrome ecosystem.

##### Continuous Quest for Optimization

The ever-evolving nature of Chrome extension development demands a perpetual quest for optimisation. Our exploration of tailored solutions aligned with this principle, ensuring our tech stack stays agile, responsive, and well-prepared to tackle future changes and challenges.

In the dynamic landscape of Chrome extension development, our strategic shift beyond Redux is a testament to our commitment to efficiency, user satisfaction, and the perpetual pursuit of optimisation.

#### Conclusion: Crafting a Tailored Tech Stack

As Chrome extension developers, adapting to evolving architectures is crucial. While Redux has its merits, manifest v3 prompted a reassessment. By addressing the unique needs of our extension and opting for efficient data and state handling, we’ve developed a more tailored and effective approach beyond Redux’s constraints.

Flexibility, adaptability, and an unceasing quest for optimisation are essential in the dynamic realm of Chrome extension development.

“Moving beyond Redux in our Chrome extension post-manifest v3 wasn’t about abandoning a tool but embracing our extension’s evolving needs. By minimising user impact and exploring alternatives aligned with the new architecture, we’ve crafted a tech stack suiting the dynamics of post-manifest v3 Chrome extension development.”

Stay tuned for our upcoming deep dive! Our follow-up post will reveal the practical implementation of our tailored tech stack, maximising extension performance. Expect step-by-step guidance, insightful code snippets, and real-world examples as we guide you through the seamless transition from Redux to our optimised approach. Elevate your Chrome extension development with our hands-on guide, pushing the boundaries of performance. Watch this space for cutting-edge insights and actionable tips! 