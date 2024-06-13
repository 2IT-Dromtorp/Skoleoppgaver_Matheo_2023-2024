import './index.css';

import { useState } from "react";
import {useNavigate} from 'react-router-dom';


export default function CreateSport(){
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");

    const [leaderName, setLeaderName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");


    const handlesubmit = async(e) => {
        e.preventDefault();

        const sportName = name.toLowerCase().replace("å","a").replace("æ","ea").replace("ø","o");

        const objectData = {
            name:sportName,
            desc,
            fullName:name,
            leader:{
                email,
                phone,
                name:leaderName
            }
        }

        const response = await fetch("/api/create-sport", {
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                "authorization":`Bearer ${localStorage.getItem("accessToken")}`
            },
            body:JSON.stringify(objectData)
        });
        const resData = await response.json();
        alert(resData);
        if(response.ok) navigate("/");
    }

    return(
        <div className="register-main">
            <h1>Opprett lag i en ny sport</h1>
            <form className='request-user-page-form' onSubmit={(e)=>handlesubmit(e)}>                
                <input className="login-input-field" required={true} type="text" value={name} onChange={(e)=>setName(e.target.value)} placeholder={`Navnet på sporten*`}/>
                <textarea className="login-input-field create-sport-text-area" required={true} type="text" onChange={(e)=>setDesc(e.target.value)} value={desc} placeholder="Beskrivelse av laget*"/>
                
                <p>Ansvarlig for laget:</p>
                <input className="login-input-field" required={true} type="text" value={leaderName} onChange={(e)=>setLeaderName(e.target.value)} placeholder={`Navnet til ansvarlig*`}/>
                <input className="login-input-field" required={true} type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder={`Email*`}/>
                <input className="login-input-field" required={true} type="tel" pattern="[0-9]{8}" value={phone} onChange={(e)=>setPhone(e.target.value)} placeholder={`Telefon-nummer*`}/>


                <button type="submit" className="login-login-button request-user-page-form-submit">Lagre</button>
            </form>
        </div>
    )
}