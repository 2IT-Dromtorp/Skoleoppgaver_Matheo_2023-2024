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
        const data = await blackjack.findOne({});

        client.emit("hei", data); 

        client.on("createRoom", (roomName)=>{
            if(!roomName) return;
            for(let i = 1; i<Array.from(io.sockets.adapter.rooms).length;i++){
                if(roomName===Array.from(io.sockets.adapter.rooms)[i][0]) return;
            }
            client.join(roomName);
            io.to(roomName).emit("joinedRoom", roomName);
        })
        
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