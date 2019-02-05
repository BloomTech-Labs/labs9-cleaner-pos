# Labs 9 - Lodgel

<div style="text-align:center"><img src="./frontend/public/lodgel.png"></div>

### Contributors:

|   [Kelly Frohwein](https://github.com/kelfro)  |   [Chris Honda](https://github.com/honda0306)   |    [Ronald Libago](https://github.com/Mister-Corn)    |   [Nando Theessen](https://github.com/NandoTheessen)  |   [William VanDolah](https://github.com/wvandolah)  |
|:----------------:|:----------------:|:---------------:|:---------------:|:---------------:| 
| [<img src="./assets/kelly.jpg" width = "200" />](https://github.com/kelfro) | [<img src="./assets/honda.jpg" width = "170" />](https://github.com/honda0306)  | [<img src="./assets/ronald.jpg" width = "250" />](https://github.com/Mister-Corn) | [<img src="./assets/nando.jpg" width = "250" />](https://github.com/NandoTheessen) | [<img src="./assets/william.jpg" width = "250" />](https://github.com/wvandolah) 
| [<img src="https://github.com/favicon.ico" width="15"> ](https://github.com/kelfro)  |  [<img src="https://github.com/favicon.ico" width="15"> ](https://github.com/honda0306) | [<img src="https://github.com/favicon.ico" width="15"> ](https://github.com/Mister-Corn)  | [<img src="https://github.com/favicon.ico" width="15"> ](https://github.com/NandoTheessen) | [<img src="https://github.com/favicon.ico" width="15"> ](https://github.com/wvandolah)  
| [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> ](https://www.linkedin.com/in/kelly-frohwein-30404116a/) | [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> ](https://www.linkedin.com/in/ichirohonda/) | [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> ](https://www.linkedin.com/in/ronald-libago-96487815b/) | [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> ](https://www.linkedin.com/in/nandotheessen/) | [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> ](https://www.linkedin.com/in/william-vandolah-89717477/) | 

![MIT](https://img.shields.io/packagist/l/doctrine/orm.svg)
![React](https://img.shield.io/badge/react-v16.7.0--alpha.2-blue.svg)
![Typescript](https://img.shields.io/npm/types/typescript.svg?style=flat)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

## Project Overview

This is a Lambda Labs Capstone Project designed for rental property management. It consolidates key tasks like invoicing and employee management into one central location.  

### Key Features

	* Manage multiple properties and multiple employees
	* Allow employees to track their progress
	* Allow employees to reassign tasks to other employees
	* Automatically generate guest invoices
	* Allow property managers to add new properties, assign properties to employees, and create and edit task checklists for employees
	* Allow guests to view readiness of their assigned rental property and pay their invoice online

## Tech Stack

### Frontend built using:
#### React

With its vast eco-system and modular nature React is a great choice for developing the front-end of our project.

	* The associated documentation, community and 3rd party packages are excellent
	* It allows for reusability of already written components which reduces development time
	* It is a tried and tested framework that will help us avoid sudden shifts in the technology causing major refactors

#### React Hooks

React Hooks simplify working with React due to use near exclusive use of functional components versus class components. Also, because logic can be shared, using React hooks results in smaller package sizes, which maximizes efficiency.

#### Typescript

	* Stricter type-checking will speed up development by reducing time spent on finding bugs and limiting the number of bugs introduced in the first place.
	* Explicit type declarations will communicate to other developers the intent and use of a given piece of code.
  * TypeScript integrates very well with webpack and babel, both of which are essential tools for using modern JS features.

### Frontend deployed to Netlify

### Backend built using:

#### Node.js, Express.js

	* Node.js offers a single free codebase that is fast, easy to learn, and offers multiple modules. Collaborators can quickly get up to speed and easily modify and maintain the code for longterm stability.
	* Express.js allows us to code and customize the back-end to our liking, and gives us more control on what and how the back-end handles requests.
	* There is very detailed documentation available for each.
	* There also widespread community support for Node and Express.

#### PostgreSQL 

	* Saves the necessary data in an efficient way
	* Allows for easy queries through JOIN support
	* Allows for very easy deployment
	* Has a great community around it and is future proof / very independent of new trends

### Backend deployed to Heroku

## Authentication

App users are authenticated using JSON web tokens (JWT).

## Testing

This application was tested at every stage of development by each contributor. We used Husky to automate unit testing and run Prettier linting on each commit. This ensured that we could continuously deploy to Netlify and Heroku without the risk of breaking our build. All pull requests were reviewed by at least one other team member and merged by a third party to ensure that we had as many eyes on the code as possible searching for potential bugs.

## Installation Instructions

To install this app, make sure you have node.js and npm installed. From the root directory, run npm install or yarn to install dependencies for frontend and backend.

Start the development server by running npm dev:server or yarn dev:server.

### Other Scripts

	* yarn typecheck - runs the TypeScript compiler
	* yarn build - creates a build of the application
	* yarn start - starts the production server after a build is created
	* yarn test - runs tests in __tests__ directory

## Stripe

All user payments are processed using Stripe via the react-stripe-elements plugin. Once the user submits their payment information, it is converted to a token that can be safely sent to the server. This eliminates the need for our app to handle sensitive credit card data and minimizes the financial and legal liability of the business.

## Documentation
	
See [Backend Documentation](https://cleaner-pos.herokuapp.com/) for details on the backend of our project.

