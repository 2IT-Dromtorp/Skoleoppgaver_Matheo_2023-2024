import './tournaments.css';

import { useState, useEffect } from "react";

import TournamentComponent from "../../components/tournamentComponent/tournamentComponent";

export default function Tournaments(){
    const [tournamentData, setTournamentData] = useState([]);
     
    useEffect(()=>{
    async function fetchdata(){
        const response = await fetch("/api/tournaments");
        if(!response.ok) return;
        const responseData = await response.json();
        setTournamentData(responseData);
    }
    fetchdata()
    },[])
     
    return(
        <>{tournamentData.length?
        <div className='tournament-main'>      
            <h1 className='tournament-main-header'>Turneringer</h1>  
            <div className="tournament-container">
                {tournamentData.map((tournament, index) =>
                    <TournamentComponent key={index} name={tournament.name} place={tournament.place} date={tournament.date} sport={tournament.sportFullName} responsible={tournament.responsible}/>
                )}
            </div>
        </div>

        :"Loading..."}</>
        
    )
}