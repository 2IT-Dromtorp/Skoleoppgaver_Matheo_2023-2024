# Table of contents
- [Introduction](#introduction)
- [Socket.io](#socket.io)
    - [Installation](#install-socket.io)
- [MongoDB](#mongodb)
    - [Installation](#install-mongodb)
    - [Use](#how-to-use-mongodb)

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
```js
    const url = "mongodb+srv://username:password@matheodb.kuczdkk.mongodb.net/"

    const {MongoClient} = require("mongodb");
    const mongodb = new MongoClient(url);
    const database = mongodb.db("Gambling")
    const blackjack = database.collection("Blackjack")
```