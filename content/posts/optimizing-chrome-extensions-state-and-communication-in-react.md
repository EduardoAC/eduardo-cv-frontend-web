---
title: "Optimizing Chrome Extensions: State and Communication in React"
description: "Master Chrome Extension State Management and Communication with React for Performance and Data Flow Optimization."
date: "2023-11-05"
author: "eduardo aparicio cardenes"
tags: ["Chrome Extensions", "React", "State Management", "Web Development"]
image: "https://cdn-images-1.medium.com/max/800/1*LiHgtarKOmrMd1tMixJz7Q.jpeg"
---

### Optimising Chrome Extensions: Part 2- Managing your state and communication in React

![Managing your state and communication in a React Chrome Extension](https://cdn-images-1.medium.com/max/800/1*LiHgtarKOmrMd1tMixJz7Q.jpeg)

In the previous article, we discussed the limitations of using Redux and the need to adapt our approach to Chrome extension development due to the changes introduced by Manifest v3.

However, it’s essential to understand the role that Redux played in our extensions and how to replace it with the new architectural strategy using only React. In this article, we’ll focus on managing the state in your Chrome extension using React in content scripts, briefly caching data in the background script, and facilitating effective communication between these components to ensure data synchronisation.

#### Understanding State in Content Scripts

When we talk about “state,” it can be a somewhat ambiguous term. The state could refer to a state machine that controls the user interface, or it could be about how we persist data in our React application. In this article, we’ll focus on the latter, referring to how you persist data within your React application, as the nature of your project and the user experience you aim to provide will determine the specific state requirements for data persistence. If you’re interested in discussing user experience, feel free to leave a comment (spoiler: I firmly believe a browser extension should NOT use react-router).

Now, let’s dive into the concept of state, which remains a crucial part of our Chrome extension, even as we move away from Redux. We can split the state into two categories:

- **Shared/Global State**: This category encompasses data shared across all content scripts, such as user data, settings, and feature flags. Any changes made to this data should prompt an update in both the background script and all content scripts simultaneously.
- **Local/Pseudo-Global State**: This category covers specific data sets required for a particular content script at a given time. While it may be shared indirectly with other content scripts, it doesn’t necessitate active notification to other scripts.

Let’s take as an example a multilanguage browser extension that displays a toolbar with the reviews for a site based on Google or Trustpilot reviews, illustrated by the image below.

![Multi-language review browser extension example](https://cdn-images-1.medium.com/max/800/0*OE33XEge8oC8cwUZ)

In this scenario, the **selected language** is considered a shared/global state. The **review** itself and the **language options** for the dropdown can be classified as local/pseudo-global state, even if they are present in multiple tabs since their visualisation doesn’t directly affect other content scripts.

However, if we decide to replace the review display with a user rating input, allowing the user to provide their rating on the page, then the rating changes become a shared state. This is because other tabs may be displaying the same page, and they need to reflect the user’s review.

#### Why Does This Distinction Matter?

Distinguishing between shared and local states is essential because elements belonging to the shared state require different treatment than local ones. When shared state values change, the background script must broadcast these changes to all relevant tabs that need the information to be updated.

#### Managing Communication Between Content Scripts and Service Workers

We’ve discussed the various natures of data in content scripts and touched on how shared/global state information flows. Now, let’s explore the most common data flows in browser extensions based on the nature of the data, assuming you’re dealing with client-side rendering content scripts.

#### Fetching Information with Messages

![Retrieving review from background script](https://cdn-images-1.medium.com/max/800/0*82GfZ5QrTBUZWL3m)

The most straightforward method of communication is through messages, allowing the content script to request data from the background script. For example, when the content script needs information to display a review, it sends a message to the background script, as illustrated in the image above.

Then, the review handler is responsible for handling the message and making an attempt to retrieve the information from the cache or memory in order to minimise constant network traffic. However, if it doesn’t find the data, it triggers an API request to obtain the necessary information and then stores it in the cache. Simultaneously, the response is sent back to the content script that initiated the request, as shown above.

#### Broadcasting by the Background Script

Sometimes, there is a need to inform all content scripts about changes initiated externally, such as a user’s language change through a shared cookie with your main website. When such a scenario arises, it becomes essential for all content scripts to update their internal state accordingly. To achieve this, the background script broadcasts the change to all content scripts.

![Broadcasting language cookie changes to relevant scripts](https://cdn-images-1.medium.com/max/800/0*clXFf_darib8qD8J)

For example, as illustrated in the image above, we actively listen for language cookie changes. When the language cookie is updated, this triggers an update of the background script’s state, as well as all tabs that are running our content script. These tabs will require updating to align their language preferences in their internal state.

#### Combined Flow: Update/Fetching and Broadcast

In specific scenarios, you may encounter a situation where a change in the extension’s state requires sending a message. This message, in turn, initiates a broadcast to all content scripts. Let’s consider a practical example to illustrate this mixed flow.

![Propagating language updates from tab to all relevant scripts](https://cdn-images-1.medium.com/max/800/0*KCnqLlueobCuKUOa)

For instance, going back to our example about the language selection change, if one of the toolbar elements in a tab experiences a language change, it will be required to notify the background script, triggering internal updates within the background script and external systems like the language API and cookies, as well as ensuring alignment across all other content scripts, as shown in the image above. Notably, you can exclude the message sender from the broadcast, thanks to the tab ID available in “senderTab.”

#### Illustrating State and Flows with Code Fragments

Now that we have a clear understanding of the concepts and the defined flow. Let’s dive into some code fragments to illustrate the implementation of each concept. Keep in mind that these are not fully optimised implementations but rather fragments designed to solidify the knowledge you’ve gained with practical examples. A complete implementation of the review example will be provided in the next article, so stay tuned.

#### Sending Messages from Content Scripts

```gist:EduardoAC/000b1e39a6ec10a892e7c6cd93730a53```

As you can see in the code above, using promises simplifies integration with the rest of your code. We’ve also introduced a two-level message identifier (type, subtype) to categorise handlers based on their purposes. Feel free to adapt this approach to your specific needs.

#### Receiving Messages from Background and Content Scripts

The good news is that both content and background scripts can listen for messages through the same chrome.runtime API, which includes the **onMessage** listener. Here’s how you listen for communication between scripts:

```gist:EduardoAC/4da531a11dbd432e3935a2b5b2605868```

When listening to messages, there are several important aspects to consider:

- **Sender Tab**: Utilizing the sender tab can provide valuable information about the tab, such as its page URL. This can be particularly useful in various use cases, but some might not require this information. Consult the documentation for more details.
- **Message Definitions**: Standardizing message definitions can help maintain consistent and homogenous logic for handling messages.
- **Returning a boolean**: The return boolean plays a critical role in determining whether the “sendResponse” should be treated as a synchronous (false) or asynchronous (true) response. If you don’t provide a return, it will expect a synchronous call to “sendResponse.”

While this article doesn’t cover connecting this listener to the React state, I’ve provided a gist illustration of how you can integrate React Context with the listener.

```gist:EduardoAC/5551f5228af5285d2dfca43092d02728```

#### Broadcasting a Message to All Content Scripts

The final step in implementing this flow involves sending a message to all relevant content scripts, instructing them to update the data within their local state. To achieve this, you can track each tab’s status to determine whether it is actively available and loaded within the browser memory, ensuring that messages are sent to all tabs that require updates.

In this article, I will present a simplified implementation of this strategy using the filtering capabilities provided by Chrome, acknowledging that some tabs may receive messages that are irrelevant to their context and will be ignored. Alternatively, you could consider tracking each time the content script is loaded on a page and only notify those tabs that are relevant to the update. I will cover this more in-depth in my following article, so make sure to follow for updates.

```gist:EduardoAC/789d05a169259c67aab722b571b7dae5```

Within the script, you’ll notice two crucial checks that require explanation:

- **“Discarded as false”** indicates that the tab has been unloaded from memory but remains visible in the tab strip.
- **“Status as ‘unloaded’”** serves a similar purpose, although it’s worth noting that there is no documentation available about this particular status.

#### Conclusion

In this article, we’ve explored the critical aspects of managing state and communication in Chrome extensions using React. We discussed the limitations of using Redux and the need to adapt our approach due to changes introduced by Manifest V3.

Understanding the role of Redux in our extensions and replacing it with a React-centric architecture is essential for modern Chrome extension development. We delved into the complexities of state management within content scripts, including the distinctions between shared/global state and local/pseudo-global state. Using a multilanguage browser extension as an example, we illustrated the importance of categorising your data appropriately.

By distinguishing between shared and local states, you can efficiently handle changes in your extension. Shared states necessitate broadcasting updates to all relevant tabs, ensuring data synchronisation.

Our exploration of communication flows in Chrome extensions included fetching information with messages, broadcasting updates from the background script, and combining flows demonstrating message-triggered broadcasts.

To help solidify your understanding, we provided code fragments illustrating implementations for each concept. These practical examples are not fully optimised but serve as valuable knowledge-building tools. Stay tuned for our next article, where we’ll provide a complete implementation of the review example, connecting all the dots and further enhancing your Chrome extension development skills. 