import '../../css/blackjackGame.css'

import { socket } from "../../App";
import BlackjackPlayerProfile from './blackjackComponents/blackjackPlayerProfile';

import { useEffect, useState } from 'react';

export default function BlackjackGame() {
    const [game, setGame] = useState('');
    const [players, setPlayers] = useState([]);
  
    useEffect(() => {
        socket.emit("gameStarted");
    
        socket.on("gameStartedGivePlayerInfo", (playerArray) => testing(playerArray));
        
        return () => {
            socket.off("gameStartedGivePlayerInfo", testing);
        };
    }, []);

    function testing(playerArray){
        setGame(playerArray.playersTurn);
        setPlayers(playerArray.players);
    }
    
    return (
        <div className="blackjackgame-main">
            <div className='blackjackgame-table'>
                <div className='blackjackgame-table-top'>
                    {game && <h1>{game}</h1>}
                </div>
                <div className='blackjackgame-table-player-section'>
                    {players.map((player, index) => (
                        <BlackjackPlayerProfile moneyBet={player.moneyBet} key={index} index={index} name={player.name} money={player.money} cards={player.cards}/>
                    ))}
                </div>
            </div>
        </div>
    );
};
