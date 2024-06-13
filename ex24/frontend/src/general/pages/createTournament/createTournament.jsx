import { useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom';


export default function CreateTournament(){
    const navigate = useNavigate();
    const [sports, setSports] = useState([]);

    const [sportName, setSportName] = useState("");
    const [name, setName] = useState("");
    const [place, setPlace] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");

    useEffect(()=>{
        async function fetchdata(){
            const response = await fetch("/api/get-sports");
            const resData = await response.json();
            if(!response.ok) alert(resData);
            setSports(resData);
        }
        fetchdata();
    },[])

    const handlesubmit = async(e) => {
        e.preventDefault();

        const sportFullName = sports.find((a) => a.name === sportName).fullName
        const responsible = sports.find((a) => a.name === sportName).leader

        const objectData = {
            name,
            sport:sportName,
            sportFullName,
            date,
            time,
            place,
            responsible
        }

        const response = await fetch("/api/create-tournament", {
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                "authorization":`Bearer ${localStorage.getItem("accessToken")}`
            },
            body:JSON.stringify(objectData)
        });
        const resData = await response.json();
        alert(resData);
        if(response.ok) navigate("/tournaments");
    }

    return(
        <div className="register-main">
            <h1>Lage en turnering</h1>
            <form className='request-user-page-form' onSubmit={(e)=>handlesubmit(e)}>
                <select className="login-input-field" required={true} onChange={(e)=>setSportName(e.target.value)}>
                    <option value={""}>Velg en sport</option>
                    {sports&&sports.length?sports.map((sport, index) => 
                        <option key={index} value={sport.name}>{sport.fullName}</option>
                    ):""}
                </select>
                
                <input className="login-input-field" required={true} type="text" value={name} onChange={(e)=>setName(e.target.value)} placeholder={`Navnet på turneringen*`}/>
                <input className="login-input-field" required={true} type="text" onChange={(e)=>setPlace(e.target.value)} value={place} placeholder="Hvor turneringen foregår*"/>
                
                <p>Tidspunkt for turneringen</p>
                <input className="login-input-field" required={true} type="time" onChange={(e)=>setTime(e.target.value)} value={time} placeholder="Tidspunkt*"/>
                
                <p>Dato for turneringen</p>
                <input className="login-input-field" required={true} type="date" onChange={(e)=>setDate(e.target.value)} value={date} placeholder="Dato for turneringen*"/>
            
                <button type="submit" className="login-login-button request-user-page-form-submit">Lag turneringen</button>
            </form>
        </div>
    )
}