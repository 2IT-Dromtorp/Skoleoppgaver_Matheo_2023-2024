const { Server } = require("socket.io");
const express = require("express");
const {MongoClient} = require("mongodb");
const http = require("http");
const path = require("node:path")

const app = express();
app.use(express.static("build"));
app.use(express.json());

const url = "mongodb+srv://mathoepan:Skole123@matheodb.kuczdkk.mongodb.net/"

const server = http.createServer(app);
const io = new Server(server);

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
            if(findDocumentOfSameName) return client.emit("roomAlreadyExist");
            client.join(roomName);
            fetch("https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6")
                .then(response=>response.json())
                .then(async data=>{
                    await blackjack.insertOne({
                        boardName:roomName,
                        players:[],
                        playersTurn:null,
                        whatTurn:null,
                        dealersHand:[],
                        deckId:data.deck_id
                    })
                    io.to(roomName).emit("joinedRoom", roomName);
                })
        })

        client.on("gameStarted",async ()=>{
            const curRoom = getRoom();
            const forGettingPlayers = await blackjack.findOne({"boardName":curRoom});
            if(!forGettingPlayers) return;
            const nextPlayersTurn = findNextPlayerThatIsYetToLose(forGettingPlayers.players, -1)
            if(!nextPlayersTurn) return io.to(curRoom).emit("gameStartedGivePlayerInfo", "GameOver");
            
            await blackjack.updateOne(
                {"boardName":curRoom},
                {$set:{playersTurn:nextPlayersTurn.name, whatTurn:"bet", "players.$[].cards":[], dealersHand:[], "players.$[].roundResult":""}}
            );
            const findDocumentOfSameName = await blackjack.findOne({"boardName":curRoom});
            if(!findDocumentOfSameName) return;
            io.to(curRoom).emit("gameStartedGivePlayerInfo", findDocumentOfSameName)
        })

        client.on("giveCardsToPlayers",async()=>{
            const curRoom = getRoom();
            const allPlayerData = await blackjack.findOne({"boardName":curRoom});
            if(!allPlayerData) return;
            
            const deckId = allPlayerData.deckId;
            if(!deckId) return;

            for(let i = 0; i<allPlayerData.players.length;i++){
                if(!allPlayerData.players[i].moneyBet) continue;
                await fetch(`https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=${2}`)
                    .then(response=>response.json())
                    .then(async data=>{
                        if(!data)return;
                        await blackjack.updateOne(
                            {boardName:curRoom, "players.name":allPlayerData.players[i].name},
                            {$set: {"players.$.cards": data.cards}}
                        );
                    })
            }   
            await fetch(`https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=${2}`)
                    .then(response=>response.json())
                    .then(async data=>{
                        if(!data)return;
                        await blackjack.updateOne(
                            {boardName:curRoom},
                            {$set: {dealersHand: data.cards}}
                        );
                    })

            const findDocumentOfSameName = await blackjack.findOne({"boardName":curRoom});
            if(!findDocumentOfSameName) return;
            io.to(curRoom).emit("gameStartedGivePlayerInfo", findDocumentOfSameName)
        })


    })

    app.get("/joinGame", async(req,res)=>{
        const name = req.query.username;
        const roomName = req.query.room
        if(!name||!roomName) return;
        const newPlayerObject = {
            name:name,
            money:1500,
            cards:[], 
            moneyBet:0,
            roundResult:""
        };
        const everything = await blackjack.findOne({"boardName":roomName});
        if(!everything) return res.status(404).send("Game does not exist");
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

    app.get("/betMoney", async(req, res)=>{
        const q = req.query;
        if(!q) return res.status(440).send("Nuhuh");
        const action = req.query.action;
        const name = req.query.username;
        const roomName = req.query.room;
        if(!name||!roomName||!action) return;

        const whatPlayersTurn = await blackjack.findOne({"boardName":roomName});
        if(whatPlayersTurn.whatTurn!=="bet") return res.status(403).send("It's not betting time");
        if(name!==whatPlayersTurn.playersTurn) return res.status(403).send("Not your turn");
        if(action==="0") return res.status(403).send("You cant bet 0")

        const checkIfLastPlayerTurn = (element) => element.name === name;

        const indexOfName = whatPlayersTurn.players.findIndex(checkIfLastPlayerTurn);

        if(action==="submit"){
            const nextPlayerObject = findNextPlayerThatIsYetToLose(whatPlayersTurn.players, indexOfName)
            const nameOfNext = nextPlayerObject.name
            const shouldRestart = nextPlayerObject.nextLevel
            if(shouldRestart){
                await blackjack.updateOne(
                    {boardName:roomName},
                    {$set:{playersTurn:nameOfNext, whatTurn:"play"}}
                )
            } else{
                await blackjack.updateOne(
                    {boardName:roomName},
                    {$set:{playersTurn:nameOfNext}}
                )
            }
        }
        else{
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

        io.to(roomName).emit("gameStartedGivePlayerInfo", findDocumentOfSameName);
        if(findDocumentOfSameName.whatTurn==="play") io.to(roomName).emit("startGivingCards");
        return res.status(200).send("Added");
    })

    app.get("/cardTurn", async(req, res)=>{
        const q = req.query;
        if(!q) return res.status(440).send("Nuhuh");
        const action = req.query.action;
        const name = req.query.username;
        const roomName = req.query.room;
        if(!name||!roomName||!action) return;

        const whatPlayersTurn = await blackjack.findOne({"boardName":roomName});
        const deckId = whatPlayersTurn.deckId
        if(whatPlayersTurn.whatTurn!=="play") return res.status(403).send("It's not playing time");
        if(name!==whatPlayersTurn.playersTurn||!deckId) return res.status(403).send("Not your turn");

        const indexOfName = whatPlayersTurn.players.findIndex((element) => element.name === name);

        if(action==="hit"){
            await fetch(`https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
                .then(res=>res.json())
                .then(async data=>{
                    if(!data.success)return;
                    await blackjack.updateOne(
                        {boardName:roomName, "players.name":name},
                        {$push:{"players.$.cards":data.cards[0]}}
                    )
                })
        }
            
        if(action==="stand"){
            const nextPlayerObject = findNextPlayerThatIsYetToLose(whatPlayersTurn.players, indexOfName)
            const nameOfNext = nextPlayerObject.name
            const shouldRestart = nextPlayerObject.nextLevel
            if(shouldRestart){
                await blackjack.updateOne(
                    {boardName:roomName},
                    {$set:{playersTurn:"", whatTurn:""}}
                );
            } else{
                await blackjack.updateOne(
                    {boardName:roomName},
                    {$set:{playersTurn:nameOfNext}}
                )
            }
        }

        const document = await blackjack.findOne({"boardName":roomName});
        if(!document) return res.status(440).send("Game doesnt exist");

        if(addCardsTogether(document.players[indexOfName]) > 21){
            const nextPlayerObject = findNextPlayerThatIsYetToLose(document.players, indexOfName)
            const nameOfNext = nextPlayerObject.name
            const shouldRestart = nextPlayerObject.nextLevel
            if(shouldRestart){
                await blackjack.updateOne(
                    {boardName:roomName},
                    {$set:{playersTurn:"", whatTurn:""}}
                )
            } else{
                await blackjack.updateOne(
                    {boardName:roomName},
                    {$set:{playersTurn:nameOfNext}}
                )
            }
            const checkUp = await blackjack.findOne({"boardName":roomName});
            if(!checkUp) return res.status(440).send("Game doesnt exist");
            io.to(roomName).emit("gameStartedGivePlayerInfo", checkUp);
        } 
        else{
            io.to(roomName).emit("gameStartedGivePlayerInfo", document);
        }

        const afterAllChangesDocument = await blackjack.findOne({"boardName":roomName});
        if(!afterAllChangesDocument) return res.status(440).send("Game doesnt exist");

        if(afterAllChangesDocument.whatTurn==="") dealersTurn(roomName, afterAllChangesDocument.dealersHand, deckId);
        return res.status(200).send("Added");
    })

    function addCardsTogether(player){
        let playersHandarray = []
        let playersHandAddedTogether = 0
        for(let j = 0; j<player.cards.length; j++){
            playersHandarray.push(findValueOfCard(player.cards[j]));
            playersHandAddedTogether += findValueOfCard(player.cards[j])
        }

        while(true){
            if(playersHandAddedTogether>21&&playersHandarray.includes(11)){
                playersHandarray[playersHandarray.findIndex(x => x === 11)] = 1
                playersHandAddedTogether -= 10
            } else {
                break; 
            }
        }
        return playersHandAddedTogether;
    }

    function findNextPlayerThatIsYetToLose(players, thisPlayersIndex){
        for(let i = thisPlayersIndex+1; i<players.length; i++){
            if(players[i].money>0) return {nextLevel:false, name:players[i].name}
        }
        for(let i = 0; i<players.length; i++){
            if(players[i].money>0) return {nextLevel:true, name:players[i].name}
        }
    }

    
    
    async function dealersTurn(roomName, dealersHandBeforeInsert, deckId){
        let dealerHandArray = [];
        for(let i = 0; i<dealersHandBeforeInsert.length; i++){
            dealerHandArray.push(findValueOfCard(dealersHandBeforeInsert[i]));
        }
        let handValueAddedTogether = 0;
        for(let i=0; i<dealerHandArray.length; i++){
            handValueAddedTogether+=dealerHandArray[i];
        }
        while(handValueAddedTogether<17){
            await fetch(`https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
            .then(res=>res.json())
            .then(async data=>{
                if(!data.success)return;
                await blackjack.updateOne(
                    {boardName:roomName},
                    {$push:{dealersHand:data.cards[0]}}
                )
                dealerHandArray.push(findValueOfCard(data.cards[0]));

                handValueAddedTogether = 0;
                for(let i=0; i<dealerHandArray.length; i++){
                    handValueAddedTogether+=dealerHandArray[i];
                }
                if(handValueAddedTogether>21&&dealerHandArray.includes(11)){
                    dealerHandArray[dealerHandArray.findIndex(x => x === 11)] = 1
                    handValueAddedTogether -= 10
                }
            })
        }
        
        const dealerHandAfterInsert = await blackjack.findOne({"boardName":roomName});
        if(!dealerHandAfterInsert) return;

        for(let i = 0; i<dealerHandAfterInsert.players.length; i++){
            const player = dealerHandAfterInsert.players[i]
            const playersName = player.name

            let playersHandarray = []
            let playersHandAddedTogether = 0
            for(let j = 0; j<player.cards.length; j++){
                playersHandarray.push(findValueOfCard(player.cards[j]));
                playersHandAddedTogether += findValueOfCard(player.cards[j])
            }

            while(true){
                if(playersHandAddedTogether>21&&playersHandarray.includes(11)){
                    playersHandarray[playersHandarray.findIndex(x => x === 11)] = 1
                    playersHandAddedTogether -= 10
                } else {
                    break; 
                }
            }

            if(playersHandAddedTogether>handValueAddedTogether&&playersHandAddedTogether<22||playersHandAddedTogether<22&&handValueAddedTogether>21){
                await blackjack.updateOne(
                    {boardName:roomName, "players.name":playersName},
                    {$inc:{"players.$.money":player.moneyBet}, $set:{"players.$.roundResult":"won", "players.$.moneyBet":0}}
                )
            } else if(playersHandAddedTogether<handValueAddedTogether&&handValueAddedTogether<22||handValueAddedTogether<22&&playersHandAddedTogether>21){
                await blackjack.updateOne(
                    {boardName:roomName, "players.name":playersName},
                    {$inc:{"players.$.money":~player.moneyBet+1}, $set:{"players.$.roundResult":"loss", "players.$.moneyBet":0}}
                )
            } else{
                await blackjack.updateOne(
                    {boardName:roomName, "players.name":playersName},
                    {$set:{"players.$.roundResult":"draw", "players.$.moneyBet":0}}
                )
            }
        }

        const finishedCardsToSendIn = await blackjack.findOne({"boardName":roomName});
        if(!finishedCardsToSendIn) return;

        io.to(roomName).emit("gameStartedGivePlayerInfo", finishedCardsToSendIn);
        return;
    }

    function findValueOfCard(cardInHand){
        const arrayOfTypesNotNumbers = ["QUEEN", "KING", "JACK"]
        if(arrayOfTypesNotNumbers.includes(cardInHand.value)) return 10;
        else if(cardInHand.value === "ACE") return 11;
        const valueIntParsed = parseInt(cardInHand.value);
        if (!valueIntParsed) return;
        return valueIntParsed;
    }

    app.get("*", (req, res) => {
        res.sendFile(path.resolve("./build/index.html"))
    })
})