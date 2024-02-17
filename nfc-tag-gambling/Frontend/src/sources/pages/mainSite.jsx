import '../../css/mainSite.css'
import { socket } from "../../App";
import { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { RoomIdContext } from "../../context";

import logo from '../../images/blackjack.png'

export default function MainSite() {
  const navigate = useNavigate()
  const { setRoomId} = useContext(RoomIdContext)
  const [nameOfNewRoom, setNameOfNewRoom] = useState("")

  function joinedRoom(name){
    if(!name) return;
    console.log(name)
    setRoomId(name);
    navigate("/lobby");
  }

  useEffect(() => {
    socket.emit("connection")

    socket.on('joinedRoom', (roomName)=> joinedRoom(roomName))
    socket.on('roomAlreadyExist', ()=>alert("A room of that name already exists"))

    return () => {
      socket.off('joinedRoom', alert);
    };
  }, []);

  const createRoom = (e) =>{
    e.preventDefault();
    console.log(nameOfNewRoom)
    socket.emit("createRoom", nameOfNewRoom);
  }

  return (
    <div className='mainSite-main'>
        <img src={logo} alt=''/>
        <form onSubmit={createRoom}>
            <input type='text' value={nameOfNewRoom} onInput={(e)=>setNameOfNewRoom(e.target.value)}/>
            <button type='submit'>Create new room</button>
        </form>
    </div>
  );
};