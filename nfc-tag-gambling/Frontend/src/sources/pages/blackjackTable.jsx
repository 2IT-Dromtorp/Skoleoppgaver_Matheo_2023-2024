import { socket } from "../../App";
import { useEffect, useState } from "react";

export default function BlackjackTable() {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    socket.emit("connection")

    socket.on('hei', (hei) => console.log(hei));
    socket.on("sendInPlayerThatJoinedGame", (name) => setPlayers(prevPlayers => [...prevPlayers, name]))

    return () => {
      socket.off('hei', console.log);
      socket.off("sendInPlayerThatJoinedGame", setPlayers)
    };
  }, []);

  function startGame(){}

  return (
    <>
        <p>Main Board</p>
        {players.map((player, index) => <p key={index}>{player}</p>)}
        <button onClick={()=>startGame()}>Start the game</button>
    </>
  );
};