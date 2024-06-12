import './index.css';

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import Leader from "../../components/leader/leader";

export default function RequestUserPage(){
    const {sport} = useParams();

    const [sportInfo, setSportInfo] = useState({});
    
    const [firstName, setFirstName] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddres] = useState("");
    const [city, setCity] = useState("");
    const [yearBorn, setYearBorn] = useState("");

    useEffect(()=>{
        async function fetchData(){
            const response = await fetch(`/sport-info?sport=${sport}`);
            if(!response.ok) return;
            const resData = await response.json();
            setSportInfo(resData);            
        }

        fetchData();
    },[sport])

    const handlesubmit = async (e) => {
        e.preventDefault();
        const userData = {
            firstName,
            lastname,
            email,
            phone,
            address,
            city,
            yearBorn,
            sport:sport
        }

        const response = await fetch("/api/send-request",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(userData)
        });
        const resData = await response.json();
        alert(resData);
    }

    return(
        <>{sportInfo.name?<div className='request-user-page-main'>
            <div className="request-user-page-info">
                <h1 className='request-user-page-info-header'>{sportInfo.fullName}</h1>
                <p className='request-user-page-info-p'>{sportInfo.desc}</p>
                <h2>Ansvarlig for idretten:</h2>
                <Leader name={sportInfo.leader.name} phone={sportInfo.leader.phone} email={sportInfo.leader.email}/>
            </div>
            <div className='request-user-page-create-user'>
                <p>{sportInfo.fullName}</p>
                <form className='request-user-page-form' onSubmit={(e)=>handlesubmit(e)}>
                    <input className="login-input-field" required={true} type="text" onChange={(e)=>setFirstName(e.target.value)} value={firstName} placeholder="Fornavn*"/>
                    <input className="login-input-field" required={true} type="text" onChange={(e)=>setLastname(e.target.value)} value={lastname} placeholder="Etternavn*"/>
                    <input className="login-input-field" required={true} autoComplete="email" type="email" onChange={(e)=>setEmail(e.target.value)} value={email} placeholder="Email*"/>
                    <input className="login-input-field" required={true} type="tel" pattern="[0-9]{8}" value={phone} onChange={(e)=>setPhone(e.target.value)} placeholder={`Phone number*`}/>
                    <input className="login-input-field" required={true} type="text" onChange={(e)=>setAddres(e.target.value)} value={address} placeholder="Addresse*"/>
                    <input className="login-input-field" required={true} type="text" onChange={(e)=>setCity(e.target.value)} value={city} placeholder="By*"/>
                    <input className="login-input-field" required={true} type="date" onChange={(e)=>setYearBorn(e.target.value)} value={yearBorn} placeholder="Fødselsdato*"/>
                
                    <button type="submit" className="login-login-button request-user-page-form-submit">Meld deg på {sportInfo.fullName.toLowerCase()}</button>
                </form>
            </div>
        </div>:"Loading..."}</>
    )
}