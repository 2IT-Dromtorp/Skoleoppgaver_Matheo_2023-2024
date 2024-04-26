# Borrow from Drømtorp  
## Table of contents
- [Introduction](#introduction)
- [Installations](#installations)
- [Key functions](#key-functions)
- [Description of Endpoints](#Description-of-Endpoints)
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
- [Backend Functions](#Backend-Functions)
- [Frontend Functions](#Frontend-Functions)

### Backend Functions
- [checkValues](#checkValues)
- [authenticateToken](#authenticateToken)
- [createAccessToken](#createAccessToken)
- [validateEmail](#validateEmail)
- [getCurrentTimeEuroFormat](#getCurrentTimeEuroFormat)

#### checkValues
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

#### authenticateToken
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

        //To check if the user is a teacher or not:
        if (jwtUser.class !== "LAERER") return res.sendStatus(403);
        //To check if the user has the correct email address
        if (jwtUser.email !== emailVariable) return res.sendStatus(403);
    })
```
#### createAccessToken
createAccessToken is used to create an access token with a body which consists of a users email and class/role
The enviroment variable `ACCESS_TOKEN_SECRET` is a randomly generated string which is in the .ENV file
The token expires after 30 minutes

```js
function createAccessToken(email, schoolClass) {
    return jwt.sign({ email: email, class: schoolClass }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30m' });
}
```

#### validateEmail
validateEmail checks if the email is of a correct format
First, it checks if the emai includes *@* and *.*
Then it checks if the *@* is before the *.*
Then it confirms that *@* is not the first character, and *.* not the last
Lastly it confirms that the email is a valid *@viken.no* address

```js
function validateEmail(email) {
    if (!email.includes("@") || !email.includes(".")) return false;
    if (email.indexOf("@") > email.indexOf(".")) return false;
    if (email.indexOf("@") === 0 || email.indexOf(".") === email.length - 1) return false;
    if (email.split("@")[1] !== "viken.no") return false;
    return true;
}
```

#### getCurrentTimeEuroFormat
getCurrentTimeEuroFormat simply finds the time in `DD/MM/YYYY-HH:MM` format, and returns that
```js 
function getCurrentTimeEuroFormat() {
    let date_time = new Date();
    let day = ("0" + date_time.getDate()).slice(-2);
    let month = ("0" + (date_time.getMonth() + 1)).slice(-2);
    let year = date_time.getFullYear();
    let hours = date_time.getHours();
    let minutes = date_time.getMinutes();
    return `${day}.${month}.${year} ${hours}:${minutes}`;
}
```

### Frontend Functions
- [Routing i App.js](#Routing-i-App.js)
- [The GetFetch Function](#GetFetch)

#### Routing i App.js
This project uses something that is called *Outlet-routing*
That basically means that all router are "inside" the main route - with the path `/`
That path leads to `<Layout/>`, which displays the `<Outlet/>`
The `<Outlet/>` is the Route you're currently on. The `index` means that that is the path that will fill the ground path - `/`
If you want to add a new route you simply have to create a new `<Route/>`, import the site you want to link to, and set that as the `element={}`
You also have to define the path you want it to be on, in the `path=""` field

Check [React-Router-Dom](https://www.npmjs.com/package/react-router-dom) for more info about routing

```jsx
<BrowserRouter>
      <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<LendingSite />} />
            <Route path="log-in" element={<LogInPage />} />
            <Route path="create-user" element={<CreateUser />} />
            <Route path="item/:serialnumber" element={<ItemPage />} />
            <Route path="requests" element={<RequestPage />} />
            <Route path="users" element={<Users />} />
            <Route path="profile/:emaila" element={<ProfilePage />} />
            <Route path="create-new-item" element={<CreateNewItem />} />
            <Route path="edit-item/:serialnumber" element={<EditItem />} />
            <Route path="edit-user/:email" element={<EditUser/>} />
          </Route>
      </Routes>
    </BrowserRouter>
```

```jsx
<div className='layout-outlet'>
    <Outlet/>
</div>
```

#### GetFetch
The GetFetch function is used when you want to send in a `Get-fetch-request` to an endpoint which requires an jwt-access-token
Its parameters are the url it should fetch to, and `navigate`. The reason it requires `navigate` is so that the function can automatically re-route you if the response says something is wrong about your access-token

```jsx
export async function GetFetch(url, navigate){
    const accessToken = localStorage.getItem("accessToken");
    const response = await fetch(url,{
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });

    if(response.status===401&&navigate) return navigate("/log-in");
    if(response.status===403&&navigate) return navigate("/");
    return response;
}
```

## Description of Endpoints
All endpoints work in similar ways. They start with error handling, and in most cases then proceeds to do some MongoDb commands. 
All endpoint are pretty self-explanatory, if there are anything you don't understand it's most likely something about MongoDb, so check their documentato\ion

## Licenses 

### MIT LICENSE  
