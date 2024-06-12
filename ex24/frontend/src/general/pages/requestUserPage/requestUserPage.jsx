import './index.css';

import { useParams, Link } from "react-router-dom";
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

    async function handlesubmit() {
        console.log("A")
        const userData = {
            sport:sport
        }

        const response = await fetch("/api/send-request",{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                "authorization":`Bearer ${localStorage.getItem("accessToken")}`
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
                <h2>Ansvarlig for laget:</h2>
                <Leader name={sportInfo.leader.name} phone={sportInfo.leader.phone} email={sportInfo.leader.email}/>
            </div>
            <div className='request-user-page-create-user'>
                <p className='request-user-page-create-user-p'>{sportInfo.fullName}</p>
                {localStorage.getItem("accessToken")?                
                    <button className="login-login-button request-user-page-form-submit" onClick={()=>handlesubmit()}>Meld deg på {sportInfo.fullName.toLowerCase()}</button>
                :<>
                    <p className='request-user-page-create-user-p-register-info'>For å melde seg på en aktivitet må man først registrere seg på siden vår</p>
                    <Link to={"/register"} className='mainsite-link-to-tour'>Registrer deg</Link>
                </>}
            </div>
        </div>:"Loading..."}</>
    )
}