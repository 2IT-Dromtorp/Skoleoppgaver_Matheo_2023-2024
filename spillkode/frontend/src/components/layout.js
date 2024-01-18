import '../css/layout.css'
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { socket } from '../App';
import { useEffect } from "react";

export default function Layout() {
  const navigate = useNavigate();
  
  useEffect(()=>{
    if(!socket.connected){
      navigate("/")
    }
  },[])
    

    return (
      <div className='layout-main'>
        <Outlet/>
      </div>
    );
}
