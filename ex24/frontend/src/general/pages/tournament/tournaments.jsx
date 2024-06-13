import './tournaments.css';

import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

import TournamentComponent from "../../components/tournamentComponent/tournamentComponent";

export default function Tournaments(){
    const [tournamentData, setTournamentData] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);
     
    useEffect(()=>{
    async function fetchdata(){
        const response = await fetch("/api/tournaments");
        if(!response.ok) return;
        const responseData = await response.json();
        setTournamentData(responseData);

        const checkIfAdmin = await fetch("/api/check-if-admin",{
            method:"GET",
            headers:{
                "Authorization":`Bearer ${localStorage.getItem("accessToken")}`
            }
        });
        setIsAdmin(checkIfAdmin.ok);
        
    }
    fetchdata()
    },[])
     
    return(
        <>{tournamentData.length?
        <div className='tournament-main'>      
            <h1 className='tournament-main-header'>Turneringer</h1>  
            {isAdmin?<Link className='mainsite-link-to-tour' to={"/create/tournament"}>Legg til ny turnering</Link>:""}
            <div className="tournament-container">
                {tournamentData.map((tournament, index) =>
                    <TournamentComponent key={index} name={tournament.name} place={tournament.place} date={tournament.date} sport={tournament.sportFullName} responsible={tournament.responsible}/>
                )}
            </div>
        </div>

        :"Loading..."}</>
        
    )
}