import '../../../css/blackjackPlayerProfile.css'
import diamond from '../../../images/diamonds.png'
import clubs from '../../../images/clubs.png'
import favorites from '../../../images/favorites.png'
import spades from '../../../images/spades.png'

export default function BlackjackPlayerProfile({ name, cards, money, index, moneyBet }) {
    const cardSymbols = [diamond, clubs, favorites, spades];
    function findSymbolAccordingToCardApi(stringFromAPI){
        if (stringFromAPI === "DIAMONDS") return diamond;
        if (stringFromAPI === "CLUBS") return clubs;
        if (stringFromAPI === "SPADES") return spades;
        if (stringFromAPI === "HEARTS") return favorites;
    }
    return (
        <div className="blackjackplayerprofile-main">
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
        </div>
    );
}