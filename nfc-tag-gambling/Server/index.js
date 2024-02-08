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

//Planen min er å prøve å gjøre slik at man kan koble seg opp mot forskjellige games
//Bytte ut der jeg skriver "server" med en "room" greie, sende inn det i requesten

server.listen(port, () => {
    console.log("Running on port " + port)

    const mongodb = new MongoClient(url);
    const database = mongodb.db("Gambling")
    const blackjack = database.collection("Blackjack")

    app.get("/reset", async(req,res)=>{
        await blackjack.updateMany({}, {$set: {
            players: []
        }})
        res.status(200).send("Reset");
    })

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
            const everything = await blackjack.findOne({"boardName":"MainBoard"});
            if(!everything.players) return res.status(500).send("Game does not exist");
            const allPlayers = everything.players
            if(!allPlayers||allPlayers.length>=5) return res.status(412).send("Game is full");
            const findOtherUserOfSameName = await blackjack.findOne({"players.name":name});
            if(findOtherUserOfSameName) return res.status(409).send("En bruker finnes allerede med dette navnet");

            await blackjack.updateOne(
                {boardName:"MainBoard"},
                {$push: {players:newPlayerObject}}
            );
            res.status(200).send("You're now in the queue");

            io.emit("sendInPlayerThatJoinedGame", name);
        })
    })
})