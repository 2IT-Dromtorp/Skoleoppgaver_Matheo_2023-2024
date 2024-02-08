const { Server } = require("socket.io");
const express = require("express");
const {MongoClient} = require("mongodb");

const app = express();
app.use(express.static("build"));
app.use(express.json());

const url = "mongodb+srv://mathoepan:Skole123@matheodb.kuczdkk.mongodb.net/"

const http = require("http");
const { Console } = require("console");
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000"
    }
});

const port = process.env.PORT || 8080;

server.listen(port, () => {
    console.log("Running on port " + port)

    const mongodb = new MongoClient(url);
    const database = mongodb.db("Gambling")
    const blackjack = database.collection("Blackjack")

    io.on("connection", async (client)=>{
        const data = await blackjack.findOne({});

        client.emit("hei", data); 
        
        app.get("/joinGame", async(req,res)=>{
            const name = req.query.username;
            if(!name) return;
            const newPlayerObject = {
                name:name,
                money:1500,
                cards:[]
            };
            const findOtherUserOfSameName = await blackjack.findOne({"players.name":name});
            if(findOtherUserOfSameName) return res.status(409).send("En bruker finnes allerede med dette navnet");

            await blackjack.updateOne(
                {boardName:"MainBoard"},
                {$push: {players:newPlayerObject}}
            );
            res.status(200).send("You're now in the queue");

            client.emit("sendInOldPlayers")
        })
    })
})