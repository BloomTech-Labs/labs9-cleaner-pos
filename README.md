# Labs 9 - Lodgel


### Contributors:

|   [Kelly Frohwein](https://github.com/kelfro)  |   [Chris Honda](https://github.com/honda0306)   |    [Ronald Libago](https://github.com/Mister-Corn)    |   [Nando Theessen](https://github.com/NandoTheessen)  |   [William VanDolah](https://github.com/wvandolah)  |
|:----------------:|:----------------:|:---------------:|:---------------:|:---------------:| 
| [<img src="./assets/kelly.jpg" width = "200" />](https://github.com/kelfro) | [<img src="./assets/honda.jpg" width = "170" />](https://github.com/honda0306)  | [<img src="./assets/ronald.jpg" width = "250" />](https://github.com/Mister-Corn) | [<img src="./assets/nando.jpg" width = "250" />](https://github.com/NandoTheessen) | [<img src="./assets/william.jpg" width = "250" />](https://github.com/wvandolah) 
| [<img src="https://github.com/favicon.ico" width="15"> ](https://github.com/kelfro)  |  [<img src="https://github.com/favicon.ico" width="15"> ](https://github.com/honda0306) | [<img src="https://github.com/favicon.ico" width="15"> ](https://github.com/Mister-Corn)  | [<img src="https://github.com/favicon.ico" width="15"> ](https://github.com/NandoTheessen) | [<img src="https://github.com/favicon.ico" width="15"> ](https://github.com/wvandolah)  
| [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> ](https://www.linkedin.com/in/kelly-frohwein-30404116a/) | [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> ](https://www.linkedin.com/in/ichirohonda/) | [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> ](https://www.linkedin.com/in/ronald-libago-96487815b/) | [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> ](https://www.linkedin.com/in/nandotheessen/) | [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> ](https://www.linkedin.com/in/william-vandolah-89717477/) | 

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

React Hooks simplify working with React due to use near exclusive use of functional components versus class components. Also, the use of React hooks results in smaller package sizes.

#### Typescript

	* Stricter type-checking will speed up development by reducing time spent on finding bugs and limiting the number of bugs introduced in the first place.
	* Explicit type declarations will communicate to other developers the intent and use of a given piece of code.
  * TypeScript integrates very well with webpack and babel, both of which are essential tools for using modern JS features.

* Deployed to Netlify

### Backend built using:

#### Node.js, Express.js

	* Node.js offers a unified language for both front-end and back-end, giving all team members flexibility to work on either when necessary.
	* Express.js allows us to code and customize the back-end to our liking, and gives us more control on what and how the back-end handles requests.
	* There is very detailed documentation available for each.
	* There also widespread community support for Node and Express.

#### PostgreSQL 

	* Saves the necessary data in an efficient way
	* Allows for easy queries through JOIN support
	* Allows for very easy deployment
	* Has a great community around it and is future proof / very independent of new trends

* Deployed to Heroku

## Authentication

## Testing

### Unit testing

We implemented user testing on all pages using jest. These tests ensure that the app is working correctly and helps us to quickly identify issues.

### Git Hooks

We used Husky to automate unit testing and run Prettier linting on each commit. This ensured that we could continuously deploy to Netlify and Heroku without the risk of breaking our build. 

## Installation Instructions

### Environment Variables

### Using the application

## Documentation
	
See [Backend Documentation](https://cleaner-pos.herokuapp.com/) for details on the backend of our project.
See [Frontend README]() for details on the frontend.

