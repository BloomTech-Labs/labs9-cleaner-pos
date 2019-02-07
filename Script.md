# Introducing Lodgel – the property management application that streamlines the rental process.
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
managers can keep turnover assistants up to date with your guests needs by adding items to property checklists. Since your 
guests' needs may change over the course of their stay, managers can add to-do items during guests' stay as well,
which will help ensure they have the best possible experience. 

When your guest is ready to check out, you can generate an invoice for them, and can also process their payment through
Stripe. Simply select a subscription plan based on the number of properties you manage, sign up for a Stripe account, and 
you are ready to go!

Are you ready to try Lodgel? Sign up today!

# Tech Stack
When we started planning the tech stack of our project, we had many different elements to consider, including the languages and technologies we would use for our front- and back-ends, database, and scripting. Ultimately, we decided on React.js for our front-end, Node.js for our back-end, Postgres for our database, and TypeScript for scripting.
## React: 
We chose to develop the front-end in React because its highly flexible nature allows for rapid prototyping and simple maintenance. Instead of having to change styling or functionality for each individual component that needs it, a few small adjustments can be made that propogates through the whole application and has the potential to exponentially reduce maintenance time.

## Node.js: 
The justification for using Node.js in the back-end is similar to that of the front-end. The high level of customization that Node.js provides allows for near-total freedom in terms of functionality and performance. There is a tradeoff to this much control: if one endpoint breaks, chances are high that it will greatly affect other areas of functionality. 

## TypeScript: 
We chose to use Typescript for two main reasons: type-checking and communication. Stronger typing allows us to avoid common mistakes that are hard to debug, such as misinterpreting the shape of the data and accessing non-existent properties or mapping over data which are not arrays.

In addition, it also serves as communication between developers. Type declarations can be read by other developers, which gives them insight how they should approach their code if they're dealing with the same type of data. Deep TypeScript integration in VS Code allows us to even have Intellisense on functions we wrote ourselves.

## PostgreSQL
PostgreSQL is an open source SQL-style databse, which makes relational database development simpler in earlier stages, but becomes more time-consuming as scale increases. Designing queries is much easier to create and maintain than other database systems, which makes query design simple, effective, and reusable.

## Travis CI:
To ensure consistently high build qualities and prevent regressions we implemented Travis as our CI tool.
It automatically runs test on branches and PRs and maintains high confidence when merging.