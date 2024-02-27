import '../../css/blackjackGame.css'

import { socket } from "../../App";
import BlackjackPlayerProfile from './blackjackComponents/blackjackPlayerProfile';
import BlackjackDealerComponent from './blackjackComponents/blackjackDealerComponent';

import { useEffect, useState } from 'react';
import { useRef } from 'react';

export default function BlackjackGame() {
    const [nameOfCurrentPlayer, setNameOfCurrentPlayer] = useState('');
    const [dealerHand, setDealerHand] = useState([]);
    const [players, setPlayers] = useState([]);
    const [gameOver, setGameOver] = useState(false);
    
    const timerRef = useRef(undefined)
  
    useEffect(() => {
        function setPlayerValues(playerArray){
            clearTimeout(timerRef.current);
            if(playerArray === "GameOver") return setGameOver(true);
            setNameOfCurrentPlayer(playerArray.playersTurn);
            setPlayers(playerArray.players);
            setDealerHand(playerArray.dealersHand);  
        }

        socket.emit("gameStarted");
    
        socket.on("gameStartedGivePlayerInfo", (playerArray) => setPlayerValues(playerArray));
        socket.on("startGivingCards", ()=> socket.emit("giveCardsToPlayers"))

        return () => {
            socket.off("gameStartedGivePlayerInfo", setPlayerValues);
            socket.off("startGivingCards", socket.emit)
        };
    }, []);

    useEffect(()=>{
        function timeOutFunction(){
            const timeOut = setTimeout(()=>{
                socket.emit("timerOutNewPlayerTurn", nameOfCurrentPlayer);
            },1000*15);
            timerRef.current=timeOut
        }

        if(dealerHand.length>2) return;

        timeOutFunction();
    },[dealerHand, nameOfCurrentPlayer])
    
    return (
        <div className="blackjackgame-main">
            <div className='blackjackgame-table'>
            {gameOver?<h1 className='blackjackgame-game-over-message'>There are no more players able to play left in the game</h1>:
                <>
                <div className='blackjackgame-table-top'>
                    <div className='blackjackgame-table-whose-turn'></div>
                    <div className='blackjackgame-table-dealer-hand'>
                        {dealerHand.map((card, index) =>(
                            <BlackjackDealerComponent key={index} url={card.image} index={index} length={nameOfCurrentPlayer} />
                        ))}
                    </div>
                    <div className='blackjackgame-table-whose-turn'>
                        {players[0]&&players[0].roundResult===""?(
                            <>
                                <h2>The next turn is:</h2>
                                <p>{nameOfCurrentPlayer}</p>
                            </>
                        ):(
                            <button className="buttonDesign" onClick={()=>socket.emit("gameStarted")}>Start the next round</button>
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