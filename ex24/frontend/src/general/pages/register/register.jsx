import { useNavigate } from 'react-router-dom';
import './register.css';

import { useState } from "react";

export default function Register(){
    const navigate = useNavigate();

    const [firstName, setFirstName] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddres] = useState("");
    const [city, setCity] = useState("");
    const [yearBorn, setYearBorn] = useState("");

    const [password, setPassword] = useState("");
    const [passwordCheck, setPasswordCheck] = useState("");


    const handlesubmit = async (e) => {
        e.preventDefault();

        if(password!==passwordCheck) return alert("Passordet må gjentas likt");

        const userData = {
            firstName,
            lastname,
            email,
            phone,
            address,
            city,
            yearBorn,
            password
        }

        const response = await fetch("/api/create-user",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(userData)
        });
        const resData = await response.json();
        if(!response.ok) return alert(resData);

        localStorage.setItem("accessToken",resData);
        alert("Brukeren er nå registrert")
        navigate("/my-page");
    }

    return(
        <div className="register-main">
            <h1>Registrering</h1>
            <form className='request-user-page-form' onSubmit={(e)=>handlesubmit(e)}>
                <input className="login-input-field" required={true} autoComplete="email" type="email" onChange={(e)=>setEmail(e.target.value)} value={email} placeholder="Email*"/>
                
                <input className="login-input-field" required={true} autoComplete="password" type="password" onChange={(e)=>setPassword(e.target.value)} value={password} placeholder="Passord*" minLength={8}/>
                <input className="login-input-field" required={true} autoComplete="password" type="password" onChange={(e)=>setPasswordCheck(e.target.value)} value={passwordCheck} placeholder="Gjenta passordet ditt*" minLength={8}/>
               
                <input className="login-input-field" required={true} type="text" onChange={(e)=>setFirstName(e.target.value)} value={firstName} placeholder="Fornavn*"/>
                <input className="login-input-field" required={true} type="text" onChange={(e)=>setLastname(e.target.value)} value={lastname} placeholder="Etternavn*"/>
                
                <input className="login-input-field" required={true} type="tel" pattern="[0-9]{8}" value={phone} onChange={(e)=>setPhone(e.target.value)} placeholder={`Telefon-nummer*`}/>
                <input className="login-input-field" required={true} type="text" onChange={(e)=>setAddres(e.target.value)} value={address} placeholder="Addresse*"/>
                <input className="login-input-field" required={true} type="text" onChange={(e)=>setCity(e.target.value)} value={city} placeholder="By*"/>
                
                <p>Fødselsdato</p>
                <input className="login-input-field" required={true} type="date" onChange={(e)=>setYearBorn(e.target.value)} value={yearBorn} placeholder="Fødselsdato*"/>
            
                <button type="submit" className="login-login-button request-user-page-form-submit">Lag en bruker</button>
            </form>
        </div>
    )
}