import '../../css/blackjackGame.css'

import { socket } from "../../App";
import BlackjackPlayerProfile from './blackjackComponents/blackjackPlayerProfile';
import BlackjackDealerComponent from './blackjackComponents/blackjackDealerComponent';

import { useEffect, useState } from 'react';

export default function BlackjackGame() {
    const [game, setGame] = useState('');
    const [dealerHand, setDealerHand] = useState([]);
    const [players, setPlayers] = useState([]);
  
    useEffect(() => {
        socket.emit("gameStarted");
    
        socket.on("gameStartedGivePlayerInfo", (playerArray) => setPlayerValues(playerArray));
        socket.on("startGivingCards", ()=> socket.emit("giveCardsToPlayers"))

        return () => {
            socket.off("gameStartedGivePlayerInfo", setPlayerValues);
            socket.off("startGivingCards", socket.emit)
        };
    }, []);

    function setPlayerValues(playerArray){
        setGame(playerArray.playersTurn);
        setPlayers(playerArray.players);
        console.log(playerArray.dealersHand)
        setDealerHand(playerArray.dealersHand)
    }
    
    return (
        <div className="blackjackgame-main">
            <div className='blackjackgame-table'>
                <div className='blackjackgame-table-top'>
                    <div className='blackjackgame-table-whose-turn'></div>
                    <div className='blackjackgame-table-dealer-hand'>
                        {dealerHand.map((card, index) =>(
                            <BlackjackDealerComponent key={index} url={card.image}/>
                        ))}
                    </div>
                    <div className='blackjackgame-table-whose-turn'>
                        <h2>The next turn is:</h2>
                        {game && <p>{game}</p>}
                    </div>
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
