import { socket } from '../../App';
import '../../css/game.css'
import { useContext, useEffect, useState } from "react";

import { SocketIdContext } from '../../context';

export default function GameButton({ id, name, fullGameInfo }) {
    const { socketId } = useContext(SocketIdContext);

    const [gameState, setGameState] = useState(true)

    useEffect(()=>{
        socket.on('weHaveWinner', () => setGameState(false));

        return () => {
            socket.off("weHaveWinner", setGameState);
        };
    },[])
  
    function buttonClicked() {
        if (fullGameInfo.playersTurn !== socketId || name===fullGameInfo.players[0] || name===fullGameInfo.players[1]|| !gameState) return;
        let a = fullGameInfo
        a.board[id] = socketId
        socket.emit("gameBoxClicked", a)    
    }

    function whatToDisplay(){
        for(let i = 0; i<fullGameInfo.players.length; i++){
            if (fullGameInfo.players[i]===name && i === 0) {
                return "x";
            }
            else{
                return "o";
            }
        }  
    }
  
    return (
      <button className="game-board-box" onClick={() => buttonClicked()}>
        {name !== null ? <h1>{whatToDisplay()}</h1> : false}
      </button>
    );
  }
  
