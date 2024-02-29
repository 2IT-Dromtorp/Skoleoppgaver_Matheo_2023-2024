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

To use MongoDB you have to have a MongoDB-database, which you can [here](https://www.mongodb.com/docs/manual/)


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

When using MongoDB there is three commands you need to know:


##### Insert

When inserting a document into a collection you use the `insertOne`

```js
    await collection.insertOne({a:"1", b:"2"});
```

If you want to insert multiple documents you use the `insertMany` command

```js
    await collection.insertMany([
        {a:"1", b:"34"},
        {a:"1", b:"1"}
    ]);
```


##### Update

To update a document you use the `updateOne` method0

```js
    await collection.updateOne(
        {a:"1", b:"2"}, //The first part is the filter, which shows which document you want to edit
        {$set:{b:5}} //The second part is what you want to do with that document
    );
    //We now set the "b" of that document to 5, instead of "2"

    await collection.updateOne(
        {a:"1", b:5},
        {$inc:{b:3}, $set:{a:"0"}} //You can update multiple parts of the document at the same time
    );
    //And here we incremented it with 3, which means it now is 8
    //As well as set "a" to "0"
```


##### Find

There are two ways to retrieve data from the MongoDB

One is using the `findOne`-command, which will get the first document that matches the filter you set

```js
    const data = await collection.findOne({a:"0"});
    //data = {a:"0", b:8}
```

The other is using the `find`-command, which will get all documents that matches the filter you set
When using the `find`method you will also have to use the `toArray()` function at the end

```js
    const data = await collection.find({a:"1"}).toArray();
    //data = [{a:"1", b:"34"},{a:"1", b:"1"}]
```

If the filter is empty the `findOne` method will retrieve the first document in the collection, while the `find` will retrieve all