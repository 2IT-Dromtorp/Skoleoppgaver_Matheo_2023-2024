import { socket } from '../../App';
import '../../css/game.css'
import { useContext, useEffect, useState } from "react";

import { SocketIdContext, UsernameContext } from '../../context';
import GameButton from './gameButton';

export default function Game() {  
    const [fullGameInfo, setFullGameInfo] = useState({})
    const [gameState, setGameState] = useState(true);
    const [winner, setWinner] = useState(true);
    const [arrayOfNames, setArrayOfNames] = useState([])
    const [oppositeName, setOppositeName] = useState("")


    const {socketId} = useContext(SocketIdContext);
    const {username} = useContext(UsernameContext);

    useEffect(()=>{
        socket.emit("joinedGameRequest")

        function giveInformation() {
            socket.emit("sendInformation", username)
            setArrayOfNames([])
        }

        function informationGained(info) {
            setArrayOfNames(prev => [...prev, info]);
        }

        socket.on('firstTurnIsReady', (firstTurnIsReady) => setFullGameInfo(firstTurnIsReady));
        socket.on('gameUpdated', (newInfo) => setFullGameInfo(newInfo));
        socket.on('weHaveWinner', (weHaveWinner) => winOrDraw(weHaveWinner));
        socket.on('giveInformation', giveInformation);
        socket.on('informationSentToClients', (info) => informationGained(info));

        return () => {
            socket.off("firstTurnIsReady", setFullGameInfo);
            socket.off("gameUpdated", setFullGameInfo);
            socket.off("weHaveWinner", winOrDraw);
            socket.off("giveInformation", giveInformation)
            socket.off("informationSentToClients", informationGained)
        };
    },[])

    function winOrDraw(info){
        setGameState(false)
        setWinner(info)
    }

    useEffect(()=>{
        console.log(fullGameInfo)
    },[fullGameInfo])

    useEffect(()=>{
        for(let i = 0; i<arrayOfNames.length;i++){
            if (arrayOfNames[i]!==username&&!oppositeName) {
                setOppositeName(arrayOfNames[i]);
                break;
            }
        }
    },[arrayOfNames])

    function findNameOfWinner(vinnern){
        if (vinnern === socketId) {
            return username;
        } else{
            return oppositeName;
        }
    }

    return (
        <div className='game-full-screen'>
            <div className='game-top-bar'>
                {gameState ? (
                        oppositeName&&fullGameInfo.playersTurn&&fullGameInfo.playersTurn===socketId ?
                            <h1>It's {username}'s turn</h1>
                        :
                            <h1>It's {oppositeName}'s turn</h1>
                    )
                 : 
                    (
                        typeof(winner) === "string" ? (
                                <h1>{findNameOfWinner(winner)} won</h1>
                            ) 
                        :
                            (
                                <h1>It was a draw</h1>
                            )
                    )
                }
            </div>
            <div className='game-game-bar'>
                {username&&<h2>{username}</h2>}
                <div className='game-board'>
                    {fullGameInfo.board && fullGameInfo.board.map((name, index) => (
                        <GameButton key={index} id={index} name={name} fullGameInfo={fullGameInfo} />
                    ))}
                </div>
                {oppositeName&&<h2>{oppositeName}</h2>}
            </div>
        </div>
    );

}
