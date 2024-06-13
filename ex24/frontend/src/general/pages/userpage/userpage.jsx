import './index.css';

import { useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom';
import {LogOut} from 'lucide-react';

export default function Userpage(){
    const navigate = useNavigate();

    const [userInfo, setUserInfo] = useState({});

    useEffect(()=>{
        async function fetchdata(){
            const response = await fetch("/api/user-info",{
                method:"GET",
                headers:{
                    "authorization":`Bearer ${localStorage.getItem("accessToken")}`
                }
            });
            const resData = await response.json();
            if(response.status===401) return navigate("/login");
            if(!response.ok) return alert(resData);
            setUserInfo(resData);
        }
        fetchdata();
    },[])

    function logOut(){
        localStorage.removeItem("accessToken");
        navigate("/login");
    }

    return(
        <>{userInfo.firstName?<div className="user-page-main">
            <div className='user-page-info-container'>
                <h1>Hallo, {userInfo.firstName} {userInfo.lastname}</h1>
                <p className='user-address user-info-box'>Epost: {userInfo.email}</p>
                <p className='user-address user-info-box'>Telefon: {userInfo.phone}</p>
                <p className='user-address user-info-box'>Adresse: {userInfo.address}, {userInfo.city}</p>
                <p className='user-address user-info-box'>Fødselsdato: {userInfo.yearBorn}</p>
                <p className='user-address user-info-box'>
                    Er medlem av:
                    {userInfo.sports&&userInfo.sports.length?userInfo.sports.map((sport, index) => 
                        <p>{sport[0].toUpperCase()+sport.substring(1)}</p>
                    ):""}
                </p>
                
            </div>

            <button className='user-logout-button' onClick={()=>logOut()}>Logg ut<LogOut /></button>
        </div>:"Loading..."}</>
    )
}