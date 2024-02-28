# Table of contents
- [Introduction](#introduction)
- [Socket.io](#socket.io)
    - [Installation](#install-socket.io)
- [MongoDB](#mongodb)
    - [Installation](#install-mongodb)
    - [Use](#how-to-use-mongodb)
    - [Connect To MongoDB](#connect-to-mongodb-server)
    - [MongoDB Commands](#mongodb-commands)

## Introduction

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
```sh
    $ npm install
```

## Socket.io
### Install Socket.io

To install `Socket.io` you use:
```sh
    $ npm install socket.io
```

Jeg fortsetter med Socket.io senere

## MongoDB
### Install MongoDB

To install `MongoDB` you use:
```sh
    $ npm install mongodb
```

### How to use MongoDB
#### Connect to MongoDB server
```js
    const {MongoClient} = require("mongodb");
    //You have to import the MongoClient packet from mongobd

    const url = "mongodb+srv://username:<password>@matheodb.kuczdkk.mongodb.net/"
    //The URL is the URL provided to you by MongoDB Atlas, where you replace `<password>` with your password

    const mongodb = new MongoClient(url);
    const database = mongodb.db("database")
    //The name of your database
    const collection = database.collection("collection")
    //The name of your collection
```

#### MongoDB commands

When using MongoDB there is threee commands you need to know:

##### Find

There are two ways to retrieve data from the MongoDB

One is using the `findOne`-command, which will get the first document that matches the filter you set

```js
    const data = await collection.findOne({userId:"aName"});
```

The other is using the `find`-command, which will get all documents that matches the filter you set

```js
    const data = await collection.findOne({userId:"aName"}).toArray();
```
##### Insert
##### Update
