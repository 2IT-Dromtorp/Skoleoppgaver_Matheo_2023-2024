import { socket } from '../../App';
import '../../css/game.css'
import { useContext, useEffect, useState } from "react";

import { SocketIdContext } from '../../context';
import GameButton from './gameButton';

export default function Game() {  
    const [fullGameInfo, setFullGameInfo] = useState({})
    const [socketIdsFromBackend, setSocketIdsFromBackend] = useState([])

    const {socketId} = useContext(SocketIdContext);
    //hver gang noe sendes inn kalles gi info, som gir begge klientene informasjon
    //denne kalles av en funksjon som kalles når noe sendes inn

    //informasjonens struktur er en array, 0-8
    //Man går igjennom arrayen, og map-er informasjonen over på i "knapper" som enten er ingenting, checked, eller 

    useEffect(()=>{
        socket.emit("joinedGameRequest")

        socket.on('firstTurnIsReady', (firstTurnIsReady) => setFullGameInfo(firstTurnIsReady));
        socket.on('giveGameInformation', (b) => setSocketIdsFromBackend(b));
        socket.on('gameUpdated', (newInfo) => setFullGameInfo(newInfo));

        return () => {
            socket.off("firstTurnIsReady", setFullGameInfo);
            socket.off("giveGameInformation", setSocketIdsFromBackend);
            socket.off("gameUpdated", setFullGameInfo);
        };
    },[])

    useEffect(()=>{
        if(socketIdsFromBackend.length===2){
            setFullGameInfo(prev => ({ ...prev, players: [...prev.players, ...socketIdsFromBackend] }));
            setFullGameInfo(prev => ({ ...prev, playersTurn: socketIdsFromBackend[0] }));
        }
    }, [socketIdsFromBackend])

    return (
        <div className='game-full-screen'>
            <div className='game-top-bar'>
                {fullGameInfo.playersTurn?<p>{fullGameInfo.playersTurn}</p>:<p>hvaz</p>}
            </div>
            <div className='game-game-bar'>
                <div className='game-board'>
                    {fullGameInfo.board && fullGameInfo.board.map((name, index) => (
                        <GameButton key={index} id={index} name={name} fullGameInfo={fullGameInfo} setFullGameInfo={setFullGameInfo}/>
                    ))}
                </div>
            </div>
        </div>
    );

}
