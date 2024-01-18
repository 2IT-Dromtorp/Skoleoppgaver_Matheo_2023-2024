const { Server } = require("socket.io");

const server = new Server({
    cors: {
      origin: "http://localhost:3000"
    }
  });

server.on("connection", (client)=> {

  function getRoom(){
    if(Array.from(client.rooms).length<=1) return;
    return Array.from(client.rooms)[Array.from(client.rooms).length-1];
  }

    //console.log(`Client connected with id ${client.id}`);

    client.emit("socketId", (client.id))

    client.on("melding", (melding)=>{
        console.log(melding)
        server.emit("melding", ({message: melding, id: client.id}))
    })

    client.on("joinRoom", (joinRoom)=>{ 
      if(server.sockets.adapter.rooms.get(joinRoom) !== undefined && server.sockets.adapter.rooms.get(joinRoom).size>=2) return; 
      
      client.join(joinRoom);
      client.emit("joinRoomResponse", true);
    })

    client.on("joinedLobbyRequest", () =>{
      const currentRoom = getRoom();
      server.to(currentRoom).emit("giveInformation")
    })

    client.on("sendInformation", (info)=>{
      const currentRoom = getRoom();
      server.to(currentRoom).emit("informationSentToClients", info)
    })

    client.on("startGame", ()=>{
      const currentRoom = getRoom();
      server.to(currentRoom).emit("gameIsStarted")
    })

    client.on("joinedGameRequest", () =>{
      const currentRoom = getRoom();

      const roomClientsInSet = server.sockets.adapter.rooms.get(currentRoom)

      if(roomClientsInSet===undefined) return;

      const roomClients = Array.from(roomClientsInSet)

      let gameObject = {players:[], playersTurn: "", board: []};
      for(let i = 0; i<9; i++){
        gameObject.board.push(undefined)
      }
      server.to(currentRoom).emit("firstTurnIsReady", gameObject)
      server.to(currentRoom).emit("giveGameInformation", roomClients)
    })

    client.on("gameBoxClicked", (newData)=>{
      const currentRoom = getRoom();

      if(checkIfWinner(newData.board)){
        server.to(currentRoom).emit("weHaveWinner", checkIfWinner(newData.board)) 
      }

      let changedTurnNewData = newData;
      for (let index = 0; index < changedTurnNewData.players.length; index++) {
        if(changedTurnNewData.players[index] !== client.id){
          changedTurnNewData.playersTurn = changedTurnNewData.players[index];
          break;
        }
      }
      server.to(currentRoom).emit("gameUpdated", changedTurnNewData)
    })

    function checkIfWinner(board){
      const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
      ]

      let isDraw = true
      let winner = ""

      for (let index = 0; index < winningCombinations.length; index++) {
        if(board[winningCombinations[index][0]] && board[winningCombinations[index][0]] === board[winningCombinations[index][1]] && board[winningCombinations[index][0]] === board[winningCombinations[index][2]]){
          winner = client.id
          break;
        } else if(!board[winningCombinations[index][0]] || !board[winningCombinations[index][1]] || !board[winningCombinations[index][2]]){
          isDraw = false
        }
      }

      if(winner){
        return(winner)
      } else{
        return(isDraw)
      }
    }
})
  
server.listen(8080);