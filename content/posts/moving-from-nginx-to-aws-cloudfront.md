---
title: "Moving from Nginx to AWS CloudFront"
description: "One of my first initiatives within Moneyfarm was migrating to AWS CloudFront to reduce the operational costs on our Frontend ecosystem."
date: "2020-04-22"
author: "eduardo aparicio cardenes"
tags: ["DevOps", "AWS", "CloudFront", "Frontend"]
image: "https://cdn-images-1.medium.com/max/800/0*xn_6LqYpp_7x4hKN"
---

### Frontend Optimization: Nginx to AWS CloudFront

![Frontend Optimization: Nginx to AWS CloudFront](https://cdn-images-1.medium.com/max/800/0*xn_6LqYpp_7x4hKN)

One of my first initiatives within Moneyfarm was migrating to AWS CloudFront to reduce the operational costs on our Frontend ecosystem, allowing us to scale efficiently with a fraction of the cost.

In this article, I will cover the reasons why this initiative was successful, including:

- Why having CDN works better for Moneyfarm than multiple Nginx containers.
- Benefits for Moneyfarm of using CloudFront
- Architecture is built to solve those problems.

During this article, I will focus on the React ecosystem within Moneyfarm. For more context, check my previous article, [Moneyfarm web app, a brief evolution story](https://drive.google.com/a/moneyfarm.com/open?id=1LsCsgg4GJ0eG3S267_y5t5nCxxWVJBM5JXkuwRMaoPU), to understand better how Moneyfarm was organized on the Frontend side.

#### Background

When I joined, the React Frontend ecosystem in Moneyfarm was heading into Micro-frontend architecture to have a set of more manageable applications capable of being deployed independently, allowing developers to release their features without affecting others.

![Micro-frontend architecture](https://cdn-images-1.medium.com/max/800/0*xn_6LqYpp_7x4hKN)

As you can see in the image above, each application ran independently of the others, being the “FE router” orchestrating each app by static routing. Each app was built into a docker image with the Nginx web server responsible for serving the index.html and static assets required.

After some analysis and keeping in mind that the company wasn’t planning on doing server-side rendering. This approach of running these instances for uniquely serving static files revealed some inefficiencies:

- **Longer deployment times:** requires to build docker images and deploy them in a docker swarm.
- **Larger store required:** we are storing images on ECR plus the codebase.
- **Nginx setup required**: Since we are running an instance, we need to configure the OS to be able to serve the application assets.
- **Not Cost-efficient**: The FE router must handle each proxy request for assets in every request to our Web App containers; we are talking around 2.2M requests last month with almost 100GB of data being transferred.

#### Benefits of using CloudFront in Moneyfarm

For Moneyfarm, this change brought tremendous value to three different areas:

**Customer experience:**
- Faster fetch of assets due to CDN
- Cache improvements

**Costs:**
- Reduce the load on the FE router so that a smaller number of instances
- A lower number of docker containers is required to run the FE ecosystem
- Cheaper to scale up for each new active customer

**Developer experience:**
- Reduce pipeline and architecture complexity
- Faster deployment times
- Easier to create new apps by reducing the initial setup

Besides, the use of CDN by itself (Content Delivery Network) presents a few advantages not mentioned above. I will refer you to a couple of interesting articles about it if you want to know more.

- [Akamai—What are the benefits of a CDN?](https://www.akamai.com/uk/en/cdn/what-are-the-benefits-of-a-cdn.jsp)
- [Hackernoon—Why Use a CDN? …](https://hackernoon.com/why-use-a-cdn-here-are-10-data-driven-reasons-ee0a02672988)

This change makes it more straightforward to manage our frontend ecosystem, allowing us to deliver new features more efficiently, help us to achieve better scaling, and keep a great customer experience with our growing amount of active customers.

#### What does the transition look like?

The solution required us to make a progressive change in the right direction without radically changing our frontend architecture. Therefore, we continued using the FE router as the orchestrator of all the routes. Still, this time, we point to each application folder within the S3 bucket to fetch the “index.html”, configured to use our CDN network to retrieve all our static assets instead of going to the docker containers.

![Transition to CDN](https://cdn-images-1.medium.com/max/800/0*MwCVH2P59HowaK8e)

As you can see in the image above, we have reduced a significant portion of the traffic to our FE router, considerably reducing the load needed in our orchestrator to sustain the growth of our customers.

![Simplified frontend ecosystem](https://cdn-images-1.medium.com/max/800/0*kSdsCYQpdTsqxMyS)

Through this change, we could observe that we simplified our frontend ecosystem by removing the multiple containers with folders in s3, bringing the benefits mentioned in the previous section and making it more maintainable with less effort and specialized knowledge required to support it.

#### How did we accomplish this transition?

The process is relatively straightforward and consists of the following steps:

1. Create a new S3 bucket in Amazon.
2. Create a new CDN using AWS CloudFront and connect with the S3 bucket.
3. Configure a suitable S3 and CDN policies to prevent security issues from accessing the files.
4. Create a new pipeline that uploads the content to S3, making it available to the FE router.

I will skip the three first steps since Amazon provides excellent [documentation](https://docs.aws.amazon.com/index.html?nc2=h_ql_doc_do_v). You can learn how to set up them or any equivalent store provider you pick. Therefore, I would focus only on creating the new pipeline flow.

#### New pipeline structure

![Pipeline structure](https://cdn-images-1.medium.com/max/800/0*mvf63O0Ohq-y6wlU)

This pipeline follows the [continuous delivery](https://www.atlassian.com/continuous-delivery/pipeline) principle; this means that on top of having automated testing, you also have automated your release process, and you can deploy your application at any point in time by clicking on a button.

Consequently, we can define two parts:

- The initial deployment staging gets triggered the moment we merge our code into the master branch of the application repository, which is responsible for pushing the new changes into the staging environment.
- Our production deployment is responsible for pushing the same changes into the production environment making them available to our customers.

We need this separation since manual confirmation (product green light) is required before pushing changes to production.

**Deploy to staging**

This part is responsible for ensuring the new version of the application is rigorously tested to ensure that it meets all desired system qualities. If everything goes well, the pipeline will build the FE application, generating the assets that compose our application.

When we reach the publish step, it’s time to upload the assets by creating a new subfolder, using the version generated as naming, within the application folder in the S3 bucket, which will act as a template for the staging and production deployments. Why do we need this step? You will have a different configuration for each environment, and this step will allow you to keep the parameters.

Finally, we proceed to deploy into staging by injecting into our “index.html” template the environment configuration for staging and uploading it to update to make the new application version available.

**Deploy to Production**

This section aims to deploy the assets into the production environment only after verifying that they are available and injecting the configuration for production.

#### Conclusion

This change greatly benefited Moneyfarm and enabled us to grow more efficiently. As a frontend engineer, I learned that knowing DevOps provides you with great tools to make an impact.

I faced some challenges in delivering this new approach, so if you have a question, please don’t hesitate to comment in the comment section below.

Stay tuned for more. 