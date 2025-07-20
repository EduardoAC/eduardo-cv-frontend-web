---
title: "Analysing slowness pre-commit setup"
description: "Recently one of my colleagues flagged the fact that our pre-commit validation was taking a long execution time, causing a bad developer experience. Here’s how we analysed and improved it."
date: "2020-08-15"
author: "eduardo aparicio cardenes"
tags: ["Developer Experience", "Git", "Pre-commit", "Productivity"]
image: "https://cdn-images-1.medium.com/max/800/1*9jdNU3Z-aJKHGU0Mca9SYg.jpeg"
---

### Analysing slowness pre-commit setup

![Analysing slowness pre-commit setup—husky](https://cdn-images-1.medium.com/max/800/1*9jdNU3Z-aJKHGU0Mca9SYg.jpeg)

Recently one of my colleagues flagged the fact that our pre-commit validation was taking a long execution time, causing a bad developer experience. This slowness concern kept me thinking why we spend over 3 minutes in this particular repository to validate a low number of changes made in comparison with our existing setups in other repositories.

I notice after an initial analysis that the current setup was validating all our files in our repository each time independent of the changes introduce at the time of the commit, causing a significant overhead when the tendency is committing often.

Therefore, this article will focus on evaluating the different actions to improve our execution time, hoping that will help you to get better decisions when you plan to set up your static your tools to fail faster.

#### Problem

When we looked into our repository to analyse the root cause of the slowness problem, we observed that our setup was a bit uncommon

```json
{
 …
 “scrips”: {
  …
  “format”:“prettier — write \”**/*.+(js|ts|jsx|tsx|json|css|md)\””,
  “lint”:“eslint — fix — ext .js,.jsx,.ts,.tsx, src”
  “test”:“jest”,
 },
 …
 “husky”: {
  “pre-commit”: “yarn format && yarn lint && yarn test”,
  …
 }
}
```

At first sight, we can see that these checks are running over all our JavaScript and TypeScript files independently of what we have changed. Causing the following problems:

1. Files not related will the extension on the check were executing validation which didn’t have an actual impact, for example, changes on our GitLab pipeline which was under a YML format.
2. Our checks will become slower with the constant inclusion of new features.

Consequently, this approach inefficient and can lead to frustration of engineering with the adoption of [git practices](https://deepsource.io/blog/git-best-practices/) like “Commit early, commit often”.

#### Solution

The solution comes by understanding that we can focus our checks in the changes introduced on the commit maintaining the overall styles one commit at the time. This approach will help us to maintain our practices keeping the execution time low.

In order to improve our developer experience, we have followed the suggestions provided in [Moving fast with confidence](https://www.youtube.com/watch?v=ikn_dBSski8) by Paul Armstrong from minute 7:22 which illustrate the solution and the benefits behind these checks.

```json
{
 …
 “scrips”: {
  …
  “format”: “prettier — write”,
  “lint”: “eslint . — fix”
  “test”: “jest”,
 },
 …
 “husky”: {
  “pre-commit”: “lint-staged”,
  …
 },
 “lint-staged”: {
  “src/**/*.{js,jsx,ts,tsx}”: [
   “yarn lint”,
   “yarn format”,
   “git add”,
   “yarn test — bail — findRelatedTests”
  ]
 }
}
```

#### Analysis: pre-commit performance enchantment

Nevertheless, it was great for us to understand how much improvement to overall execution time each enhancement will bring, so we maximise the execution time. Consequently, we break our analysis in the following dimensions:

- Verifying [staged](https://softwareengineering.stackexchange.com/questions/119782/what-does-stage-mean-in-git/119790#119790) files
- Code guidelines validation: Prettier formatting and ESLint checks
- Tests

Each dimension focus in a different part of the validation process defined above, and we will use a simple scenario to illustrate the reduction in the execution time.

#### Test case: addition of a new

We have defined a simple sample case:

- Add one line to a single file “src/constants/booking.js”

![Test case addition](https://cdn-images-1.medium.com/max/800/0*84J_e_ToulIEUs88)

Currently, we are using the object “locationTypes” to allow us to pick which location to display for a particular data point on our shipment timeline. This specific change will bubble up over two levels affecting our experience for one of our pages, so it’s an excellent example to illustrate the impact on overall execution time by how the addition of a constant.

#### Results

##### Current pre-commit configuration

The average execution time for the current “pre-commit” for ten executions is 2 minutes on average. However, we have seen up to 3.5 minutes in worst-case scenarios.

![Pre-commit execution time](https://cdn-images-1.medium.com/max/800/1*aTH0nN8CXVR1GXPNKtKc8g.png)

The picture above illustrates the worst-case scenario where we have a considerable execution time due mainly to ESLint.

For us to understand how each part affects the execution time, we have run each check separately obtaining the following average results over ten executions:

- Prettier formatting: ~10 seconds (5% overall execution time)
- ESLint check: ~60 seconds (50% overall execution time)
- Tests suites: ~30 seconds (30% overall execution time)
- Console output ~20 seconds (25% overall execution time)

#### Verifying staged files (lint-staged)

Our objective at this point is to understand how much improvement will bring us by using “lint-staged” to analyse only the files that the developer is committing over our current setup.

Therefore, the experiment will be as follows.

1. Run ESLint and Prettier on the [staged](https://softwareengineering.stackexchange.com/questions/119782/what-does-stage-mean-in-git/119790#119790) files
2. Keep running all tests.

```json
{
  …
  “scrips”: {
  …
   “format”: “prettier — write”,
   “lint”: “eslint . — fix”
   “test”: “jest”,
  },
  …
  “husky”: {
   “pre-commit”: “lint-staged && yarn test”,
   …
  }
  “lint-staged”: {
   “src/**/*.{js,jsx,ts,tsx}”: [
   “yarn lint”,
   “yarn format”,
   “git add”,
  ]
 }
}
```

Be aware that the test will keep executing over the whole repository to keep our scope small for each evaluation.

##### Conclusions

As a result, we can see a reduction of time by ⅔ of the previous evaluation even we keep running all the test in the repository.

![Lint-staged improvement](https://cdn-images-1.medium.com/max/800/1*msI5UvU2jVBCyDdMk9eHaQ.png)

Although the test suites have run faster on the image above they only contribute 9% of the overall improvement so we can conclude that the new approach is improving our experience significantly.

These changes will help us maintain our guidelines without affecting the experience.

#### Verifying staged files and related test

Following our analysis, our next experiment is to evaluate the benefits of executing only the test related to the change as part of the “lint-staged” process.

Therefore, let’s define our final experiment by

1. Apply changes for linter and formatter from the previous section
2. Move test execution to “lint-staged.”

```json
{
 …
 “scrips”: {
 …
 “format”: “prettier — write”,
 “lint”: “eslint . — fix”
 “test”: “jest”,
 },
 …
 “husky”: {
 “pre-commit”: “lint-staged”,
 …
 }
 “lint-staged”: {
 “src/**/*.{js,jsx,ts,tsx}”: [
 “yarn lint”,
 “yarn format”,
 “git add”,
 “yarn test — bail — findRelatedTests”
 ]
 }
}
```

##### Conclusions

![Related test improvement](https://cdn-images-1.medium.com/max/800/1*smVZG7fOmPQ5MAvYBYx4CA.png)

We can see a slight reduction in execution time which may not be as significant as previous change. However, we need to account for the extra time to find the related times and the small number of tests currently in our repository which have 45 test suites.

Consequently, it may be true that the worst-case scenario of this new approach may be slower than running all the tests directly. However, narrow the number of test suites to run will help to reduce the overall execution time for most of our most frequent scenario.

#### Final thoughts

My recommendation is following the solution provided in this article.

However, if you are facing complex or slow tests you can go for a set up a bit different that will help you to get code consistent and move the test evaluation to the “pre-push” step so you can be confident that your changes will succeed on the pull/merge request.

```json
{
   ...
   "scrips": {
      ...
      "format": "prettier --write",
      "lint": "eslint . --fix"
      "test": "jest",
  },
  ...
  "husky": {
    "pre-commit": "lint-staged",
    "pre-push": "yarn test",
    ...
  }
  "lint-staged": {
    "src/**/*.{js,jsx,ts,tsx}":  [
     "yarn lint",
     "yarn format",
     "git add",
    ]
  }
}
```

I am still investigating if there is an option that you could run related tests on the commits introduced from the branch that we are pushing to remove at the time of the “pre-push”. If you have some thoughts, please share with me.

Additionally, thanks to the use “lint-staged” configuration will target the validation of the extension files that we want to validate, making changes to files like “.gitlab-ci.yml” straight forward.

Finally, based on these results, we can conclude that with the new changes a significant reduction on execution time, being ⅓ of the original time at the beginning of the analysis. 