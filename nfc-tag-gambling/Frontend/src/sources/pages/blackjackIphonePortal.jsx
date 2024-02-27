import '../../css/blackjackIphonePortal.css'

import { useState } from 'react';

export default function BlackjackIphonePortal() {
    const [username, setUsername] = useState("");
    const [room, setRoom] = useState("");
    const [joinedGame, setJoinedGame] = useState(false);

    const moneyBetArray = [100, 200, 500, 1000, 5000, 10000]

    const joinGame = (e) => {
        e.preventDefault();
        if(!room&&!username) return alert("You have to name both a room and a username");
        fetch(`/joinGame?username=${username}&room=${room}`)
        .then(async res=> {
            const data = await res.text();
            if(res.status===200){
                setJoinedGame(true);
            } else{
                alert(data)
            }
        })
    }

    function playCards(action){
        fetch(`/cardTurn?username=${username}&room=${room}&action=${action}`)
        .then(async res=> {
            const data = await res.text();
            if(res.status===200) return;
            alert(data);
        })
    }

    function betMoney(action){
        fetch(`/betMoney?username=${username}&room=${room}&action=${action}`)
        .then(async res=> {
            const data = await res.text();
            if(res.status===200) return;
            alert(data);
        })
    }

    return (
        <div className="blackjackIphonePortal-main">
            {!joinedGame?
                <form onSubmit={joinGame}>
                    <input value={room} type='text' placeholder='Name of the room' onInput={e=>setRoom(e.target.value)}/>
                    <input value={username} type='text' placeholder='Username' onInput={e=>setUsername(e.target.value)}/>
                    <button type='submit'>Join the game</button>
                </form>
            :
                <>
                    <div className='blackjackIphonePortal-top'>
                        <h1>{room}</h1>
                        <h2>{username}</h2>
                    </div>
                    <div className='blackjackIphonePortal-buttons-for-betting-main'>
                        <div className='blackjackIphonePortal-bet-buttons-div'>
                            {moneyBetArray.map((value, index)=>(
                                <button key={index} onClick={()=>betMoney(value)} className='blackjackIphonePortal-betting-button'>{value}</button>
                            ))}
                        </div>
                        <button onClick={()=>betMoney("submit")} className='blackjackIphonePortal-bet-buttons-submit'>Submit</button>
                    </div>
                    <div className='blackjackIphonePortal-play-buttons'>
                        <button onClick={()=>playCards("hit")}>Hit</button>
                        <button onClick={()=>playCards("stand")}>Stand</button>
                    </div>  
                </>
            }
        </div>
    );
};