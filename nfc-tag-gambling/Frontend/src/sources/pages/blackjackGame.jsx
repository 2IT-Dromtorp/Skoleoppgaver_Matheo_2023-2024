import '../../css/blackjackGame.css'

import { socket } from "../../App";
import BlackjackPlayerProfile from './blackjackComponents/blackjackPlayerProfile';

import { useEffect, useState } from 'react';

export default function BlackjackGame() {
    const [players, setPlayers] = useState([]);
  
    useEffect(()=>{
        socket.emit("gameStarted")

        socket.on("gameStartedGivePlayerInfo", (playerArray)=>setPlayers(playerArray));
        
        return() => {
            socket.off("gameStartedGivePlayerInfo",setPlayers)
        }
    },[])

    return (
        <div className="blackjackgame-main">
            <div className='blackjackgame-table'>
                <div className='blackjackgame-table-top'>

                </div>
                <div className='blackjackgame-table-player-section'>
                    {players.map((player, index)=><BlackjackPlayerProfile moneyBet={player.moneyBet} key={index} index={index} name={player.name} money={player.money} cards={player.cards}/>)}
                </div>
            </div>
        </div>
    );
};