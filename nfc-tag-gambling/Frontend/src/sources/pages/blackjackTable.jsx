import { socket } from "../../App";
import { useEffect, useState } from "react";

export default function BlackjackTable() {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    socket.emit("connection")

    socket.on('hei', (hei) => console.log(hei));
    socket.on("sendInOldPlayers", socket.emit(players))

    return () => {
      socket.off('hei', console.log);
      socket.off("sendInOldPlayers", socket.emit)
    };
  }, []);

  return (
    <>
        <p>knrke</p>
    </>
  );
};