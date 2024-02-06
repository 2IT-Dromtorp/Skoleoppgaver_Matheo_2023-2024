const express = require("express")
const mongoClient = require("mongodb").MongoClient
const app = express()

const port = process.env.PORT || 8080
const mongourl = "mongodb+srv://mathoepan:@matheodb.kuczdkk.mongodb.net/";

app.use(express.json())
app.use(express.static("build"))

app.listen(port, async () => {
    console.log("Running on port: ",port)
    const mongodb = await mongoClient.connect(mongourl)
    const db = mongodb.db("Matheodb")
    const allTasks = db.collection("Oppgaver")
})