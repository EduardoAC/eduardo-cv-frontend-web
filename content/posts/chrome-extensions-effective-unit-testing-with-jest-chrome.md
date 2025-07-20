---
title: "Chrome Extensions: Effective Unit Testing with jest-chrome"
description: "Learn how to effectively perform unit testing for Chrome extensions using jest-chrome."
date: "2024-06-07"
author: "eduardo aparicio cardenes"
tags: ["Testing", "Chrome Extensions", "JavaScript", "Web Development"]
image: "https://cdn-images-1.medium.com/max/800/1*5pHlUO6cs1jhiWdc2F0WbA.png"
---

When we develop software, we cannot do it without talking about testing. Testing provides a reliable way to validate our changes, provide context on how the code is expected to work and document the projects to a certain extent. We need to understand that the value of the software we deliver is directly proportional to the trust and reliability of our system. Therefore, we need to start our journey by making our extension robust and reliable, which can only be done by understanding the principles behind testing our product.

As there aren’t many articles regarding browser extension testing, I have decided to write about how I do testing, which tools I use at different levels, and what testing strategies I follow for such a technology. Hopefully, by the end of these articles, you will have the basics and required knowledge to apply testing to your extensions.

Nevertheless, if you believe it’s missing something, don’t hesitate to drop a comment. I am glad to support you in your particular case or any concept that might be unclear.

Let’s start by discussing the lower-level testing that can be done, called unit testing. In this type of testing, we want to test functionality, such as functions that involve handling messages, functions depending on the person’s components, etc.

We will use our Chrome extension example, Review Your Favourite Site, for this series of articles. The project consists of a simple top-bar navigation that allows us to rate any website and store the reviews within the Chrome storage cache for simplicity.

Let’s start with the main feature, which is displaying the rating on the page. The rating component has two responsibilities: display the rating and update its value based on the user input.

```gist:EduardoAC/88194dda3d1e107b05c7d56e857835b3```

Rating Component for [Review Your Favourite Site](https://github.com/EduardoAC/site-review-extension)

When we look at the components, we can differentiate the useEffect responsible for retrieving the rate information to display for the particular site, if any. Then, it’s followed by an updateRating callback created to allow the user to submit the site rating. Finally, a simple loop will render the five-star rating alongside the function.

At this point, I assume you are familiar with the [React Testing Library](https://testing-library.com/) and how to test React components. I won’t be covering how to test each part of the logic in this article, as plenty of articles are available on adequate testing within React components. You can find a couple of good articles [here](https://testing-library.com/docs/react-testing-library/example-intro) and [here](https://www.freecodecamp.org/news/write-unit-tests-using-react-testing-library/).

Additionally, I have provided some examples within the following repository for you to use as illustrations. However, I would like to cover the peculiarities of testing the sendMessage function, the backbone for fetching and updating ratings within the content scripts of our extension.

```gist:EduardoAC/000b1e39a6ec10a892e7c6cd93730a53```

The sendMessage function is responsible for sending a message to our background script and waiting for a response, as any API call will do. However, the implementation will wrap the callback functions (the old way of doing asynchronous calls) into a promise for easier handling.

**Disclosure:** [Manifest v3 from Chrome 99+ supports promises](https://developer.chrome.com/docs/extensions/reference/api/runtime#returns_11), so this can be simplified, but we have used a callback to provide a broader range of support for this implementation.

Now that our sendMessage function’s usage and purpose are clear, let’s test it, shall we? First, we will use a [jest-chrome](https://www.npmjs.com/package/jest-chrome) package created by Jack Steam. This package will allow us to mock the Chrome API provided by the browser, allowing us to test the function in isolation, aka unit testing.

This function’s main purpose is to send a message through the Chrome runtime sendMessage API and return its response once received, considering the response’s status code. Consequently, we are required to check three scenarios.

1.  The Chrome API has been called correctly with the intended message
2.  The success response data has been returned correctly back to the consumer of the function
3.  The error message has been returned with a promise rejection and the correct data

We can also consider scenarios like timeouts, retrials, etc., but I won’t cover those here to keep things simple.

```gist:EduardoAC/a93bb566ebdbbb1e67ca02e1dbe39ee8```

Following the message trace, we find ourselves in the background script, which processes our messages. Similar to the content script, a Chrome runtime API is available that we can use to listen to messages from those scripts: “chrome.runtime.onMessage.addListener(messageHandler)”.

To centralise all the different messages, we have created a “messageHandler” that delegates each message to the relevant handler type. For example, a message with the rating type will be sent to our “ratingMessageHandler”, responsible for everything related to ratings. In our project example, the rating can have two subtypes: **get** to retrieve a rating for a specific page or **update** to create or update the rating for the page as indicated by the content script message. Any other message will be treated as an error, and an error response will be sent immediately.

![](https://cdn-images-1.medium.com/max/800/1*5ED-Geg2-Q9h5SdUvSRFcw.png)

Message Handler Delegation Architecture

As the functionality described above has multiple layers, we need to break down the testing cases as follows:

*   **messageHandler** is solely responsible for listening for messages from the content scripts and proxying the message to the correct handler.
*   **ratingMessageHandler** handles all the rating messages and executes the right action over the data.
*   **getRateFromCache** retrieves the rating data from the cache
*   **updateCacheRating** updates the rating value provided by the message in the cache

As we can see in the diagram above, we need to think about testing this logic from the bottom up, starting by creating a series of unit tests for the getRateFromCache and updateCacheRating, making sure the logic is sound.

```gist:EduardoAC/a56f190b99302fde8b6f7e1650b499ab```

We can see that the “getRateFromCache” function is responsible for fetching the rating provided by the user from the cache. It handles scenarios where there is available information, the cache is empty, or an error occurs during data retrieval. If you look closer, you’ll notice that the **jest-chrome** package is used to mock the original Chrome API. This allows us to provide our custom implementation through “mockImplementation”, enabling us to test the logic in isolation, just as we did with sendMessage. Similarly, these use cases also apply to the “updateCacheRating” function, and you can find the tests [here](https://github.com/EduardoAC/site-review-extension/blob/master/src/serviceWorker/events/onMessageHandlers/updateCacheRating.test.ts).

Moving up to the parent function ratingMessageHandler, assuming both the “getRateFromCache” and “updateCacheRating” functions work as intended, our focus shifts to ensuring that each message is directed to the correct handler. I have implemented the tests for this function as an integration test, although it can also be approached as a unit test by mocking each function using “jest.mock”. However, I will cover the integration to provide a broader range of options. I leave the decision on testing methodology to your discretion, offering integration and unit testing perspectives.

```gist:EduardoAC/cc58b1fe8d922ab990a79942853d0cb6```

Lastly, we examine the “messageHandler” function to ensure that each message type is appropriately routed to the correct handler. For this scenario, I opted for providing unit testing, as the specific handler’s response is inconsequential to the “messageHandler” function, provided it delegates the message correctly.

```gist:EduardoAC/eeb457de36941e2e4bc04e807b766a20```

It’s worth mentioning that using integration or unit tests to validate the logic is not mutually exclusive. You can write a unit test to validate the function behaviour and create an integration test for the part of all the different layers to ensure the data flows correctly, as we do for the user journey during our acceptance tests.

### Conclusion

In software development, testing is indispensable for validating changes and ensuring the reliability of our systems. While React component testing is well-documented, browser extension testing remains underexplored. Through this series, we will explore the uniqueness of Chrome extension testing and the tools available for you to use in your projects.

We’ve examined critical functions like sendMessage, which fetches and updates ratings in content scripts. Using jest-chrome for isolation testing, we ensure its functionality across different scenarios.

Similarly, the messageHandler function routes messages to their respective handlers. In comparison, this may seem like an integration test, but given its straightforward behaviour, unit testing suffices.

Additionally, you can employ the same methodology using [Vitest](https://vitest.dev/) by integrating [Vitest-chrome](https://github.com/probil/vitest-chrome), which seamlessly integrates with the provided sample. However, you may need to make minor adjustments to the imports in the setup process.

Finally, the whole repository, including the example and all the tests, is available on [GitHub](https://github.com/EduardoAC/site-review-extension). If you found this article helpful and would like to see more in this series, please consider sharing and giving it a clap. 