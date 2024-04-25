# Borrow from Drømtorp  
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
- [checkValues](#checkValues)
- [authenticateToken](#authenticateToken)

### checkValues
checkValues is used for error-handling. It's not perfect, and could do more, but it works and spares me from doing a lot of code/error handling
It gets the variable to be checked, what type it should be, and more info

`cantBeFalse` means that the value is a data where empty means false, and that should not be false.
Some examples of such false values are `""` or `0`. `[]` or `{}` are however not false values

`isArrayWhichCantBeEmpty` means that the value is an array, and should not be empty. It's making up for one of the values missed by the `cantBeFalse` value, the `[]` - empty array

```js
function checkValues(data, datatype, cantBeFalse, isArrayWhichCantBeEmpty) {
    if (typeof (data) !== datatype) return false;
    if (cantBeFalse && !data) return false;
    if (isArrayWhichCantBeEmpty & !data.length) return false;
    return true;
}
```

### authenticateToken
authenticateToken is used to do exactly what it says, authenticate a token.
It checks the headers for a token, and checks if it's valid

```js
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(" ")[1]; //It splits the autorization header at the space, and saves the token, which is the second part
    if (token == null) return res.sendStatus(401); //If there is no token, return

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => { //It then uses jsonwebtokens .vertify function to check if the token is still valid. Based on that result, it decides what to do after
        if (err) return res.sendStatus(401);
        req.jwtUser = user; //If the token was valid, a jwtUser key with the value of the token gets added to the req, which gets sent to the express api
        next();
    })
}
```

It's known as middleware, and is put in between the `"/api/someApiToCall"` and `(req,res)`
You can get the tokens body out from the req.jwtUser in the express api

```js
    app.delete("/api/delete-item", authenticateToken, (req, res) => {
        const jwtUser = req.jwtUser;
    })
```

## Licenses 

### MIT LICENSE  
