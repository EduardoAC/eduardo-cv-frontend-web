---
title: "Decoding TDD Choices: Scenarios vs. Components Unveiled"
description: "Today I started as any other day, but I came across an interesting challenge, what kind of test should we put in our suit (describe..."
date: "2016-08-23"
author: "Eduardo Aparicio Cárdenes"
tags: ["TDD", "Web Development", "JavaScript"]
image: "/images/blog/decoding-tdd-choices-scenarios-vs-components-unveiled-frontmatter.png"
---

Today I started as any other day, but I came across an interesting challenge, **what kind of test should we put in our suit** (describe - jasmine) **scenarios or components** and **how do we need to express the specs** (it - jasmine) **by cases or features**?

One of my colleges hold that the right thing to do it’s use our suit to describe each scenario where each one contain a set of cases (edge cases, must have, etc). Meanwhile another argue that our suit should reference our component where inside we test each feature to make sure, it does what you expect from it. What is the right approach you may ask? Let’s first put some context behind each approach

* * *

### Scenario and case

This approach consider each of our suit as an scenario, a _hypothetical story to help the tester work through a complex problem or test system,_ where we build for test a specific piece of functionality in our code like a function, feature, component (React component), etc. _from now on i will use feature even can apply to multiples elements.

This help us to understand what it does our new feature before we implement it that process require knowledge to define the most relevant set of potential scenarios that we want to test for that particular feature really useful when we try to build functionally that we fully understand and what cases should pass in order to have the expected behaviour.

However, this approach require a certain amount of understanding the problem that we are trying to solve with this new feature and it’s not always possible but it worth to try if the requirements are critical or you want to reduce the learning curve using the tests as a bridge to help another developers understand.

Let’s write a short example about this with a well know feature like remove address where it’s define by _“action of remove an address for the user profile”_ based on that definition one scenario will be

describe("the user is trying to remove an address that have orders attached",function(){  
    it("the order have been deliver",function(){});  
    it("contains future orders to be deliver",function(){});  
    ...  
});  
describe("the user remove an address that doesn't contain orders",function(){  
    ...  
});

As I understand this approach it have some advantages like

*   Make you think how to define the scenario you want to test
*   Helps for another developers understand you code reading the tests
*   The provide a good coverage of edge case because are specially define for test extensively each scenario
*   Easy to extend adding new scenarios to consider

the inconveniences I see to this approach are

*   Require a good understanding of the context
*   Could potentially consume more time for small features trying to find all the scenarios to test.
*   Need adapt mindset in this approach, _sometimes we tend to test what we see but not all domains are easy to model_

### Component and features

We want to model our component or conceptual piece of logic to achieve our client requirements, **what is component testing?** _Component testing is a method where testing of each component in an application is done separately_.

Therefore we use our suit to describe a block of logic in our application then we test each feature that need to be present to validate our component work correctly.

Using again our sum example our test will look like

describe("remove address component",function(){

    it("display remove address view",function(){});  
    it("warning the user when you have orders", function(){});  
    it("validate address have been removed",function(){});  
    ...  
});

I am assuming all the features belongs to this component for in this example that may be not in a real component, it always depends on you application but if you have one with more than one responsibility it may be worth to split in simpler components.

This approach have some advantages

*   Easier to build test require less knowledge of the potential scenarios
*   Group better the logic when the different feature have the same type of responsibility.
*   Allow to reuse code easier because all features are grouped by the same concept.

However this also contains some inconveniences like

*   Tend to skip some edge cased because you don’t require the whole context to start with.
*   Enable to think in the implementation rather than the problem (easy to think about how you will do it).
*   Rely in good name conventions to understand what the component does
*   Risks of incomplete tests when same feature could have multiples scenarios of application.

![](/images/blog/decoding-tdd-choices-scenarios-vs-components-unveiled-markdown.jpeg)

### Conclusions

Consequently, each approach have some good strengths and it makes sense to combine then in order to get the highest coverage in your tests. However, I recognise this article was more a personal reflexion of two really valid approach on my code review.

In my personal case, I found much easier to use component approach when i try to build logic piece of functionality like products, pop-ups, dropdowns, etc. mostly for a design point of view and I use the scenario when I try to recreate user journey or behaviour when they interact with the application.

What do you find easier? What is your experience? What is your feedback? I would like to hear your personal opinion on this field, it seems really well documented for many years in strong typing languages like C++, Java, ADA, etc. but I hardly find a clear winner for Front end technologies. What do you think?