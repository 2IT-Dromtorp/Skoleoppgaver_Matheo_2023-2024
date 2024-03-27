const express = require("express");
const http = require("http");
const {HashString, Compare} = require('./hash')
const {MongoClient} = require("mongodb");

const app = express();
app.use(express.static("build"));
app.use(express.json());
const server = http.createServer(app);
const port = process.env.PORT || 8080;
const url = "mongodb+srv://mathoepan:Skole123@matheodb.kuczdkk.mongodb.net/"

server.listen(port, () => {

const mongodb = new MongoClient(url);
    const database = mongodb.db("Gambling")
    const blackjack = database.collection("Blackjack")
})

// console.log(HashString("a",12));
// console.log(Compare("$mhj$mu@v[p7G=zsC^Am$RoNOQXbQ=81.h6Sa2?44N[sf2?/>Oj:fS4?<>XFi7LL?zXFUS.7>F.m0VIm.k`zSOjVK1.?G0VaV`YVQ", "a"))