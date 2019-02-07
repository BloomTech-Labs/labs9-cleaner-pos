## Introducing Lodgel – the property management application that streamlines the rental process.
Lodgel is designed to take the hassle out of out of your property management experience.
You can quickly delegate tasks to your turnover assistants, conveniently schedule guests and securely capture 
their payments at the click of a button, all while enjoying the support of our great team.

Users register for an account, and right away, they can start adding properties to their list.
To ensure each guest is taken care of, checklists can be made that detail tasks that need to be taken care of
before, during, and after each visit. 

Turnover assistants are an essential element of every property management business. Each property has 
a turnover assistant assigned to take care of it by default, but they can be moved around if necessary. 
Each turnover assistant has a map attached to their profile, which conveniently shows their location relative to 
the property they maintain. You can also assign them to properties if needed, which saves you time 
and effort in finding someone to cover another turnover assistant in the event they are unavailable.

You can also keep tabs on your guest throughout their entire rental experience. After putting in a reservation,
you can keep your turnover assistants up to date with your guests needs by adding items to their checklists. Since your 
guests' needs may change over the course of their stay, you can add to-do items during your guests' stay as well,
which will help ensure they have the best possible experience. 

When your guest is ready to check out, you can generate an invoice for them, and can also process their payment through
Stripe. Simply select a subscription plan based on the number of properties you manage, sign up for a Stripe account, and 
you are ready to go!

Are you ready to try Lodgel? Sign up today!

# Technical Justification
## React: 
We chose to develop the front-end in React because its highly flexible nature allows for rapid prototyping and simple maintenance. Instead of having to change styling or functionality for each individual component that needs it, a few small adjustments can be made that propogates through the whole application and has the potential to exponentially reduce maintenance time.

## Node.js: 
The justification for using Node.js in the back-end is similar to that of the front-end. The high level of customization that Node.js provides allows for near-total freedom in terms of functionality and performance. There is a tradeoff to this much control: if one endpoint breaks, chances are high that it will greatly affect other areas of functionality. 

## TypeScript: 
We chose to use Typescript for two main reasons: type-checking and communication. Stronger typing allows us to avoid common mistakes that are hard to debug, such as misinterpreting the shape of the data and accessing non-existent properties or mapping over data which are not arrays.

In addition, it also serves as communication between developers. Type declarations can be read by other developers, which gives them insight how they should approach their code if they're dealing with the same type of data. Deep TypeScript integration in VS Code allows us to even have Intellisense on functions we wrote ourselves.

## Travis CI:
Travis CI is meant to prevent regressions from being merged into the live application. We configured Travis to run all of our tests before each commit, and also create a mock Pull Request to ensure the build would render properly. 