import '../../css/blackJackTable.css'

import { socket } from "../../App";
import { useEffect, useState, useContext } from "react";
import { useNavigate } from 'react-router-dom';

import { RoomIdContext } from "../../context";

export default function BlackjackTable() {
  const navigate = useNavigate();
  const [players, setPlayers] = useState([]);

  const { roomId} = useContext(RoomIdContext);


  useEffect(() => {
    socket.on("sendInPlayerThatJoinedGame", (name) => setPlayers(prevPlayers => [...prevPlayers, name]));

    return () => {
      socket.off("sendInPlayerThatJoinedGame", setPlayers);
    };
  }, []);

  function startGame(){
    navigate("/insideGame");
  }

  return (
    <div className='blackjackTable-outDesign'>
      <div className='blackjackTable-main'>
        <div className='blackjackTable-top'>
          <h1>{roomId}</h1>
        </div>
        <div  className='blackjackTable-bottom'>
          <div className='blackjackTable-players'>
            <h2>Players:</h2>
            {players.map((player, index) => <p key={index}>{player}</p>)}
          </div>
          <div className='blackjackTable-start-game-button'>
            <button className="buttonDesign" onClick={()=>startGame()}>Start the game</button>
          </div>
        </div>
      </div>
    </div>
  );
};