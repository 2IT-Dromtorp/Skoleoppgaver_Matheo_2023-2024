import { socket } from "../../App";
import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { RoomIdContext } from "../../context";

export default function MainSite() {
  const navigate = useNavigate()
  const { setRoomId} = useContext(RoomIdContext)

  function joinedRoom(name){
    if(!name) return;
    setRoomId(name)
    navigate("/lobby")
  }

  useEffect(() => {
    socket.emit("connection")

    socket.on('hei', (hei) => console.log(hei));
    socket.on('joinedRoom', (roomName)=> joinedRoom(roomName))

    return () => {
      socket.off('hei', console.log);
      socket.off('joinedRoom', joinedRoom);
    };
  }, []);

  function createRoom(){
    const roomName = prompt("What do you want the new room to be called");
    socket.emit("createRoom", (roomName));
  }

  return (
    <>
        <button onClick={()=>createRoom()}>CreateNewRoom</button>
    </>
  );
};