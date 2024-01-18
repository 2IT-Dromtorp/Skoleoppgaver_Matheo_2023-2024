import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { socket } from '../../App';
import { UsernameContext } from '../../context';

export default function Lobby() {
    const navigate = useNavigate();

    const {username, setUsername} = useContext(UsernameContext);

    const [arrayOfNames, setArrayOfNames] = useState([])


    useEffect(()=>{
        socket.emit("joinedLobbyRequest")
        

        function giveInformation() {
            socket.emit("sendInformation", username)
            setArrayOfNames([])
        }

        function informationGained(info) {
            setArrayOfNames(prev => [...prev, info]);
        }
        function gameIsStarted(){
            navigate('/game')
        }
        

        socket.on('gameIsStarted', gameIsStarted);
        socket.on('giveInformation', giveInformation);
        socket.on('informationSentToClients', (info) => informationGained(info));
    
        return () => {
            socket.off("gameIsStarted", gameIsStarted)
            socket.off("giveInformation", giveInformation)
            socket.off("informationSentToClients", informationGained)
        };
    },[])

    function startGame(){
        if(arrayOfNames.length===2){
            socket.emit("startGame")
        }
    }

    return (
       <>
       <ul>
          {arrayOfNames.map((name, index) => (
            <li key={index}>
              {name}
            </li>
          ))}
        </ul>¨
        {arrayOfNames.length===2&&<button onClick={()=>startGame()}>Start Game?</button>}
       </>
    );
}
