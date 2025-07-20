---
title: "Using react-i18next within Chrome extension (manifest v3)"
description: "A guide how to efficiently support internationalisation using react-i18next"
date: "2023-02-09"
author: "eduardo aparicio cardenes"
tags: ["Chrome Extensions", "Internationalization", "React", "i18next"]
image: "/images/blog/using-react-i18next-within-chrome-extension-manifest-v3-frontmatter.jpg"
---

### Using react-i18next within Chrome extension (manifest v3)

![Architecture diagram](/images/blog/using-react-i18next-within-chrome-extension-manifest-v3-frontmatter.jpg)

A few years ago, I found myself driving the creation of Chrome extensions, where I work on displaying large data sets to provide relevant content to its users. Mainly focused on scaling and improving extension resilience.

For context, the extension stack uses mainly **React and Redux** for the time being.

Therefore, I would like to share with you how I approached internationalisation support, the requirements I was looking to fulfil, the available alternatives, and the solution's reason. I have chosen react-i18next to deliver the final implementation.

Consequently, before we discuss some of the different architectures you can use, we need to talk about our internal requirements so you can understand why we decided to build this architecture. We set three main requirements:

- Support on-the-fly translation without developer involvement
- Minimise the number of requests to our translation API
- Minimise security risks (avoid the use of [CORS headers](https://medium.com/@ehayushpathak/security-risks-of-cors-e3f4a25c04d7)).

Therefore, we explored multiple available solutions compatible with our current stack like `react-i18next`, `react-intl` or `fbt`, but I will focus only `react-i18next`. Feel free to comment if you are interested in an article comparing these packages.

#### Architectural alternatives discarded

I want to take some time to briefly explain some architectural alternatives considered before landing in our final architecture so that you could use the trade-offs involved that led us to the final architecture.

#### Chrome.i18n API

As with any architectural choice, we must balance every solution's pros and cons. In our case, we seek on the fly translations without developer involvement. Although Chrome.i18n provides a built-in solution, it will require a new release every time we want to update a copy. Therefore, this solution does not work for us.

#### Setup only react-i18next in content-scripts

For those unfamiliar with content scripts, behave as any other Web app, except for some peculiarities, so we can potentially implement react-i18next. Consequently, It will require just following the library [getting started](https://react.i18next.com/getting-started) steps to be ready to translate your extension.

However, there are some drawbacks that I would like to highlight that make us discard the approach. Firstly, you need to set up CORS headers for any domain in your API request, as the origin will be determined for the user page where the extension runs. If you do so, ensure you have the proper security precautions. Secondly, you need to be aware each new tab or window will initialise your extension content script making separate requests to fetch translations.

#### Final architecture with react-i18next

In order to tackle the drawbacks described in the previous section, our final architecture aims to support on-the-fly translations, minimise the number of network requests and provide a great user experience by rendering the extension in the appropriate language.

For this purpose, we need to understand how the [chrome extension architecture](https://developer.chrome.com/docs/extensions/mv3/architecture-overview/#arch) works, which I will explain along with our setup for supporting `react-i18next` efficiently within our extension.

![Architecture diagram](/images/blog/using-react-i18next-within-chrome-extension-manifest-v3-frontmatter.jpg)

Firstly, we have the extension content script responsible for rendering our user interface whenever a user opens a new tab or window. Then, as we are using React to build our application, it makes sense for us to create a custom hook that will encapsulate the initialisation of our internationalisation.

```gist:EduardoAC/99e7d500291c2242a8a1d1a52c9ce8b2```

As you can see in the code, we proceed to fetch the translations through our background script (extension service worker) and initialise our i18next context, which will feed the translations to the different components in our application.

Secondly, we need to connect the content script with the service worker through the runtime event handler called "onMessage" through a new custom message type that will allow us to identify this request from others when we are communicating between both.

```gist:eduardoacskimlinks/ff3e9aa71ba7fcaef1a72fa50e059026```

As you can see in our code fragment, we use redux, though a fork of [webext-redux](https://github.com/eduardoacskimlinks/webext-redux) with manifest v3 support, to store the language selected from the user or alternatively we could pass the browser language within the request.

Finally, the last piece of the puzzle is fetching the translations from our translation API in our service worker by doing.

```gist:eduardoacskimlinks/11c10c82ba2df0234a90af806ee0f09f```

**Be aware all fetched translations will remain in memory as long as the service worker is active**. This is a conscious decision to allow translation to be picked quickly on the fly but keep the number of requests made to the translation API low. For example, you could alternatively cache using Chrome.storage or Redux state if you want to minimise further the number of API requests. 