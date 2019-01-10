# Labs9 Cleaner POS -- Backend

### Contributors:

![](/path/to/kelly.jpg)[Kelly Frohwein](https://github.com/kelfro)  
![](/path/to/chris.jpg)[Chris Honda](https://github.com/honda0306)  
![](/path/to/ronald.jpg)[Ronald Libago](https://github.com/Mister-Corn)  
![](/path/to/nando.jpg)[Nando Theessen](https://github.com/NandoTheessen)  
![](/path/to/william.jpg)[William VanDolah](https://github.com/wvandolah)  

## Project Summary:
This project is the culmination of 5 weeks of combined effort by the contributors above, as well as countless designers, instructors, project managers, and supporters. This application stores the server for the Cleaner Point of Sale (POS) application, and also contains endpoints that handle user requests to databases, provides authentication via Firebase for role-based security, and allows users to navigate between components through routing.

# Technologies
- Node.js and Express.js
- TypeScript
- PostgresQL (Database)
- Webpack

# Getting Started
First, make sure you are in the `backend` sub-directory:

> `cd backend`

Next, ensure that all dependencies are installed locally by running:

    > npm install
         OR
    > yarn install

Lastly, start the development server by running:
    
    > npm dev:server
         OR
    > yarn dev:server

# Other Scripts

    > yarn typecheck
        || Runs the TypeScript compiler

    > yarn build
        || Creates a build of the application

    > yarn start
        || Starts the production server after the build is created

    > yarn test
        || Runs tests in __tests__ directories


# Routes

* > /users
    * > .get || Reads requested records
    * > .post || Updates target resource

* > /users/:id
    * > .get || Reads requested record according to given ID
    * > .put || Creates record with given ID
    * > .delete || Destroys record with given ID
