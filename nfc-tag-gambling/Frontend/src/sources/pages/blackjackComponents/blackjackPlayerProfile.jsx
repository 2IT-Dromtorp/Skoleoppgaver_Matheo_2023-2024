import '../../../css/blackjackPlayerProfile.css'
import diamond from '../../../images/diamonds.png'
import clubs from '../../../images/clubs.png'
import favorites from '../../../images/favorites.png'
import spades from '../../../images/spades.png'
import { useEffect, useState } from 'react'

export default function BlackjackPlayerProfile({ name, cards, money, index, moneyBet, playerTurn }) {
    const cardSymbols = [diamond, clubs, favorites, spades];
    function findSymbolAccordingToCardApi(stringFromAPI){
        if (stringFromAPI === "DIAMONDS") return diamond;
        if (stringFromAPI === "CLUBS") return clubs;
        if (stringFromAPI === "SPADES") return spades;
        if (stringFromAPI === "HEARTS") return favorites;
    }

    const [playersTurnColor, setPlayersTurnColor] = useState({border: "solid gray 2px"});

    useEffect(()=>{
        if(playerTurn===name){
            setPlayersTurnColor({border: "solid red 6px"});
        } else{
            setPlayersTurnColor({border: "solid gray 3px"});
        }
    },[playerTurn, name])
    return (
        <>
        {playersTurnColor&&
        <div className="blackjackplayerprofile-main" style={playersTurnColor}>
            <div className='blackjackplayerprofile-top-icon'>
                <img src={cardSymbols[index]} alt=''/>
                <h1>{name}</h1>
            </div>
            <div className='blackjackplayerprofile-information'>
                <div className='blackjackplayerprofile-cards'>
                    {cards&&cards.map((card, index) => <p key={index}>{card.value} <img src={findSymbolAccordingToCardApi(card.suit)} alt=''/></p>)}
                </div>
                <div className='blackjackplayerprofile-money'>
                    {moneyBet&&<p>Money bet: {moneyBet}</p>}
                    <p>Money left: {money}</p>
                </div>     
            </div>
            <div className='blackjackplayerprofile-bottom-icon'>
                <img src={cardSymbols[index]} alt=''/>
            </div>
        </div>}
        </>
    );
}
