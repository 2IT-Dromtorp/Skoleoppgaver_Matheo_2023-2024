const { Server } = require("socket.io");
const express = require("express");
const {MongoClient} = require("mongodb");

const app = express();
app.use(express.static("build"));
app.use(express.json());

const url = "mongodb+srv://mathoepan:Skole123@matheodb.kuczdkk.mongodb.net/"

const http = require("http");
const { constrainedMemory } = require("process");
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
                players:[],
                playersTurn:null,
                whatTurn:null,
                dealersHand:[]
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
                cards:[], 
                moneyBet:0
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
            const forGettingPlayers = await blackjack.findOne({"boardName":curRoom});
            if(!forGettingPlayers) return;
            await blackjack.updateOne(
                {"boardName":curRoom},
                {$set:{playersTurn:forGettingPlayers.players[0].name, whatTurn:"bet"}}
            );
            const findDocumentOfSameName = await blackjack.findOne({"boardName":curRoom});
            if(!findDocumentOfSameName) return;
            io.to(curRoom).emit("gameStartedGivePlayerInfo", findDocumentOfSameName)
        })

        app.get("/betMoney", async(req, res)=>{
            const q = req.query;
            if(!q) return res.status(440).send("Nuhuh");
            const action = req.query.action;
            const name = req.query.username;
            const roomName = req.query.room;
            if(!name||!roomName||!action) return;

            const whatPlayersTurn = await blackjack.findOne({"boardName":roomName});
            if(name!==whatPlayersTurn.playersTurn) return res.status(403).send("Not your turn");
            if(whatPlayersTurn.whatTurn!=="bet") return res.status(403).send("It's not betting time");

            const checkIfLastPlayerTurn = (element) => element.name === name;

            const indexOfName = whatPlayersTurn.players.findIndex(checkIfLastPlayerTurn);

            if(action==="submit"&&indexOfName!==whatPlayersTurn.players.length-1){
                await blackjack.updateOne(
                    {boardName:roomName},
                    {$set:{playersTurn:whatPlayersTurn.players[indexOfName+1].name}}
                );
            } else if(action==="submit"&&indexOfName===whatPlayersTurn.players.length-1){
                await blackjack.updateOne(
                    {boardName:roomName},
                    {$set:{playersTurn:whatPlayersTurn.players[0].name,whatTurn:"play"}}
                );
                const findDocumentOfSameName = await blackjack.findOne({"boardName":roomName});
                if(!findDocumentOfSameName) return res.status(440).send("Game doesnt exist");

                io.to(roomName).emit("gameStartedGivePlayerInfo", findDocumentOfSameName)
                io.to(roomName).emit("startGivingCards")
                return res.status(200).send("Submitted");
            }else{
                const moneyParsed = parseInt(action)
                if(!moneyParsed) return res.status(440).send("You cant bet a string");

                for(let i = 0; i<whatPlayersTurn.players.length; i++){
                    if(name===whatPlayersTurn.players[i].name){
                        const totalBet = whatPlayersTurn.players[i].moneyBet + moneyParsed
                        if(totalBet>whatPlayersTurn.players[i].money) return res.status(403).send("You dont have enough money to bet that");
                        break;
                    }
                }

                await blackjack.updateOne(
                    {boardName:roomName, "players.name":name},
                    {$inc:{"players.$.moneyBet":moneyParsed}}
                );
            }
            const findDocumentOfSameName = await blackjack.findOne({"boardName":roomName});
            if(!findDocumentOfSameName) return res.status(440).send("Game doesnt exist");

            io.to(roomName).emit("gameStartedGivePlayerInfo", findDocumentOfSameName)
            return res.status(200).send("Added");
        })
    })
})