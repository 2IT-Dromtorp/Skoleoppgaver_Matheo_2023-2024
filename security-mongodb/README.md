# Blackjack  
## Table of contents
- [Introduction](#introduction)
- [Installations](#installations)
- [Key functions](#key-functions)
- [Licenses](#licenses)

## Introduction

This project is a loaning/borrowing system made for Drømtorp VGS.
It's main function is making students and teachers able to borrow one of the many items in Drømtorp's equipment-room.

Students are only able to send in borrow requests, return borrowed items, and viewing their own profile, as well as changing their password.

Teachers are admins, and are able to do all that students can, and more. They can accept the requests of teachers and students alike.
Adding new items, editing the already existing items, and edit all information about all users, except passwords.

To be able to use any of these packets you first need to [download and install Node.js](https://nodejs.org/en/download/).

All installations is done using the [`npm install` command](https://docs.npmjs.com/getting-started/installing-npm-packages-locally):

```sh
    $ npm install
```

or

```sh
    $ npm i
```

In our examples we will use:
```bash
    npm install
```

## Installations

In this project we use:
|Packet|Link|
|---|---|
|JsonWebToken|(https://www.npmjs.com/package/jsonwebtoken)|
|MongoDB|(https://www.npmjs.com/package/mongodb)|
|React-Router-Dom|(https://www.npmjs.com/package/react-router-dom)|

## Scripts

### Frontend
```js
    "start": "react-scripts start",
    "build": "react-scripts build",
```

`npm run start` or `npm start` is used to start the react project
`npm run build` is used to create a build folder, with the react site made static

## Backend
```js
    "dev": "nodemon index.js"
```


## Key functions



## Licenses 

### MIT LICENSE  
