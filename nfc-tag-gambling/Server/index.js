const { Server } = require("socket.io");
const express = require("express");
const {MongoClient} = require("mongodb");

const app = express();
app.use(express.static("build"));
app.use(express.json());

const url = "mongodb+srv://mathoepan:Skole123@matheodb.kuczdkk.mongodb.net/"

const http = require("http");
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000"
    }
});

//Husikm å endre spånn at dewn henter ut riktig fra database og, for per nå henter du alltid fra den samme. alt er lagt opp, m,en du m å tenke litt for å få det på rett spor

const port = process.env.PORT || 8080;

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
        function getRoom(){
            if(Array.from(client.rooms).length<=1) return;
            return Array.from(client.rooms)[Array.from(client.rooms).length-1];
        }

        client.on("createRoom", async (roomName)=>{
            if(!roomName) return;
            const findDocumentOfSameName = await blackjack.findOne({"boardName":roomName});
            if(findDocumentOfSameName) return;
            client.join(roomName);
            blackjack.insertOne({
                boardName:roomName,
                players:[]
            })
            io.to(roomName).emit("joinedRoom", roomName);
        })
        
        app.get("/joinGame", async(req,res)=>{
            const name = req.query.username;
            const roomName = req.query.room
            if(!name||!roomName) return;
            const newPlayerObject = {
                name:name,
                money:1500,
                cards:[], moneyBet:null
            };
            const everything = await blackjack.findOne({"boardName":roomName});
            if(!everything) return res.status(500).send("Game does not exist");
            const allPlayers = everything.players
            if(!allPlayers||allPlayers.length>=4) return res.status(412).send("Game is full");
            const findOtherUserOfSameName = await blackjack.findOne({boardName:roomName,"players.name":name});
            if(findOtherUserOfSameName) return res.status(409).send("En bruker finnes allerede med dette navnet");

            await blackjack.updateOne(
                {boardName:roomName},
                {$push: {players:newPlayerObject}}
            );
            res.status(200).send("You're now in the queue");

            io.to(roomName).emit("sendInPlayerThatJoinedGame", name);
        })

        client.on("gameStarted",async ()=>{
            const curRoom = getRoom();
            const findDocumentOfSameName = await blackjack.findOne({"boardName":curRoom});
            if(!findDocumentOfSameName) return;
            io.to(curRoom).emit("gameStartedGivePlayerInfo", findDocumentOfSameName.players)
        })
    })
})


