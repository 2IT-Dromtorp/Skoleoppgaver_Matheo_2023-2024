import '../../css/blackjackGame.css'

import { socket } from "../../App";
import BlackjackPlayerProfile from './blackjackComponents/blackjackPlayerProfile';
import BlackjackDealerComponent from './blackjackComponents/blackjackDealerComponent';

import { useEffect, useState } from 'react';

export default function BlackjackGame() {
    const [game, setGame] = useState('');
    const [dealerHand, setDealerHand] = useState([]);
    const [players, setPlayers] = useState([]);
    const [gameOver, setGameOver] = useState(false);

  
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
        if(playerArray === "GameOver") return setGameOver(true);
        setGame(playerArray.playersTurn);
        setPlayers(playerArray.players);
        setDealerHand(playerArray.dealersHand);
    }
    
    return (
        <div className="blackjackgame-main">
            <div className='blackjackgame-table'>
            {gameOver?<h1 className='blackjackgame-game-over-message'>There are no more players able to play left in the game</h1>:
                <>
                <div className='blackjackgame-table-top'>
                    <div className='blackjackgame-table-whose-turn'></div>
                    <div className='blackjackgame-table-dealer-hand'>
                        {dealerHand.map((card, index) =>(
                            <BlackjackDealerComponent key={index} url={card.image}/>
                        ))}
                    </div>
                    <div className='blackjackgame-table-whose-turn'>
                        {players[0]&&players[0].roundResult===""?(
                            <>
                                <h2>The next turn is:</h2>
                                <p>{game}</p>
                            </>
                        ):(
                            <button onClick={()=>socket.emit("gameStarted")}>Start the next round</button>
                        )
                        }
                        
                    </div>
                </div>
                <div className='blackjackgame-table-player-section'>
                    {players.map((player, index) => (
                        <BlackjackPlayerProfile moneyBet={player.moneyBet} key={index} index={index} name={player.name} money={player.money} cards={player.cards}/>
                    ))}
                </div>
                </>}
            </div>
        </div>
    );
};