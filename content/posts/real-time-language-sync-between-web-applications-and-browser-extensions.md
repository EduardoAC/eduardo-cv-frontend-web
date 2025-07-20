---
title: "Real-time Language Sync Between Web Applications and Browser Extensions"
description: "Sync language preferences instantly: a guide to real-time language synchronization between web apps and browser extensions using…"
date: "2024-02-11"
author: "eduardo aparicio cardenes"
tags: ["Web Development", "Internationalization", "Browser Extensions", "React"]
image: "https://cdn-images-1.medium.com/max/1200/1*gvSFrphUYek3QPjKyS8G6A.png"
---

**Real-time Language Sync Between Web Applications and Browser Extensions**

In previous articles, I went into an efficient implementation of internationalisation using [react-i18next](https://medium.com/@byeduardoac/using-react-i18next-within-chrome-extension-manifest-v3-1d6f16a43556) for browser extensions and discussed the usage of [event-driven models using messages](https://medium.com/@byeduardoac/optimizing-chrome-extensions-state-and-communication-in-react-c8dadfd32a45), so I assumed you were already familiar with them. If you still need to read those, I encourage you to do so, as they set the groundwork for the content in this article.

### Introduction

This article explores the implementation of real-time language synchronisation between a web app and a browser extension. The primary objective is to seamlessly share language preferences, with the potential to extend these principles to other information like credentials and user details.

To illustrate these concepts, we’ll examine a web application built with React using client-side rendering, accompanied by a browser extension. The extension implementation relies on an event-driven model built using React and Manifest v3, which will consider aspects like service workers and their lifecycle to support our real-time synchronisation.

![](https://cdn-images-1.medium.com/max/800/1*xWLSuBzTrIIjK7_iVaJyVA.png)

**One-way real-time language synchronisation (Web App -> Browser extension)**

The diagram above highlights our focus on a one-way synchronisation process from the web application towards the extension. Whenever users update their language settings in the web application, it triggers real-time synchronisation within the extension, ensuring both tools remain in sync. I’ve chosen a client-side cookie approach to facilitate this since the background script lacks direct access to the web application’s local storage. This approach offers a significant advantage—the possibility of [push notifications](https://hvalls.dev/posts/polling-long-polling-push) within the extension, minimising browser resource consumption and establishing a single source of truth for user language within the browser.

We are going towards a cookie-less world, but cookies remain a powerful tool to keep a state within the browser. If the requirements and complexity grow in maintaining the language as a cookie, we will explore alternative approaches in the future.

### Cookie Implementation in Web App

Now that the scope of the article is clear let’s dive into implementing the cookie logic within the web application. To facilitate real-time language synchronisation, we start the process by creating a client-side cookie for language updates:

```gist:EduardoAC/29065b731cd7bddd4cc1694b013049c9```

Once the logic to persist language in the cookie is established, the next step is to set up language updates whenever a user changes their language. This change could occur during the login process, where users may have distinct language preferences within the same computer or when they update their language preferences within the web application’s settings panel. Here’s how we handle these scenarios:

```gist:EduardoAC/703da1fe9ed2cfe3e5f019f70db28b7b```

This structured approach ensures that language updates are seamlessly captured and stored in the client-side cookie, setting the foundation for real-time synchronisation between the web application and the browser extension.

**Extension service worker initialisation**

Let’s begin by examining the initialisation process. As you may know, the background script in Manifest V3 utilises service workers for its implementation and is expected to run as long as tasks are performed. It’s crucial to note that information stored in memory is temporary and will be cleared once the worker shuts down. Therefore, during background initialisation, ensure the language is retrieved and set based on the stored cookie.

```gist:EduardoAC/9bef28da89d3a1144d98a312acd6164d```

Once the cookie is set, the subsequent steps align with what we’ve discussed in the react-i18next setup article. If there’s any ambiguity, feel free to seek clarification through comments.

### Real-time Sync with Content Scripts

Now, let’s proceed to handle cookie notifications and event propagation for real-time language synchronisation within the content scripts. To achieve this, let’s set up an event listener to monitor any cookie changes.

```gist:EduardoAC/330d198a146d3d8df9691c47b27866d1```

```gist:EduardoAC/35ba733a64854993483ab543de066aa4```

```gist:EduardoAC/1261f807ee1889c9c3625155fda08ade```

### Message Handling in Content Scripts

We’ve successfully gone through updating the language and propagating it from our web application to our extension background script, sending an event updating the content script active tabs. Now, what’s left is to listen to these events and update the UI accordingly.

```gist:EduardoAC/3e959b65d287528487bf33c20d698433```

In the implementation, I’ve decided to initialise translation when the content script loads within the tab page, creating a new instance with the translation from the language at the time [(Using react-i18next within Chrome extension)](https://medium.com/@byeduardoac/using-react-i18next-within-chrome-extension-manifest-v3-1d6f16a43556). However, we need to monitor language updates to allow real-time language synchronisation. As you can see above, we integrated the listener as part of the React lifecycle to gain more granular control for the onMessage listener.

And that’s it. I hope you find this article useful, and drop me a line if you have any questions.

### Conclusion

Our exploration into real-time language synchronisation between web applications and browser extensions centres on delivering a fluid and efficient user experience. Utilising client-side cookies in the web application enables seamless language preference sharing and lays the foundation for extending these principles to encompass broader user details.

Whether introducing a client-side cookie for language updates or initialising the extension’s background with service workers, our approach ensures a persistent language environment. The one-way sync model effortlessly transmits language updates, providing a harmonious user experience and recognising the enduring potency of cookies in maintaining the browser state.

We’ve successfully bridged the gap between the web application and extension in content scripts, achieving synchronised language updates. A refined message handling system ensures swift UI responses to language changes, enhancing the user experience with real-time multilingual capabilities. Happy coding!

### Annexe: Two ways real-time sync between browser extension and web app

While this article primarily focuses on real-time language synchronisation between a web application and a browser extension using client-side cookies, it’s worth contemplating scenarios where the extension updates the client cookie, prompting language synchronisation within the web application.

![](https://cdn-images-1.medium.com/max/800/1*oPEZZ7V3w8jErg7PO2hqXw.png)

**Two-way real-time language synchronisation (Web App <-> Browser extension)**

One potential approach involves the implementation of a polling mechanism to monitor changes in cookies. The provided code snippet serves as an illustrative example:

```gist:EduardoAC/402c06165f11646a70e3a354e5838d12```

This example provides a basic insight into how polling can work for the web application. For those interested in going deeper into more effective polling mechanisms, check out “Forever Functional: Three Ways Of Polling by Federico Kereki” Work on efficient polling methods offers valuable insights. Feel free to explore these avenues or reach out if you’re keen on a comprehensive example in this subject. 