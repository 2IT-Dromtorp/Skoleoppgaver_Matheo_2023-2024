import { useState, useContext, useEffect } from "react";
import { useNavigate, Link } from 'react-router-dom';

import { EmailContext, SchoolclassContext } from "../../../context";

import './logInPage.css'

export default function LogInPage() {
    const [emailloc, setemailloc] = useState("");
    const [password, setPassword] = useState("");

    const {setEmail} = useContext(EmailContext);
    const {setSchoolclass} = useContext(SchoolclassContext);

    const navigate = useNavigate();

    useEffect(()=>{
        setEmail("");
        setSchoolclass("");
        localStorage.setItem("accessToken","");
    },[setSchoolclass, setEmail])

    const handleLogin = async (e) => {
        e.preventDefault();
        try{
            const response = await fetch("/api/login",{
                method:"POST",
                headers: {
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({
                    email:emailloc,
                    password:password
                })
            });

            if (!response.ok){
                if(response.status===412) setemailloc("");
                const responseData = await response.json();
                setPassword("");
                alert(responseData.message);
                return;
            }
            
            const responseData = await response.json();
            localStorage.setItem("accessToken",responseData.accessToken);
            setEmail(emailloc);
            setSchoolclass(responseData.data);
            navigate("/");
        } catch(error){
            console.error("Error during fetch:", error.message);
        }        
    }

    return (
        <div className="login-main">
            {/* <div className="login-info">

            </div> */}
            <div className="login-login">
                 <p className="login-log-in-header">Log in</p>

                <form onSubmit={handleLogin} className="login-form">
                    <input className="login-input-field" required={true} autoComplete="email" type="email" onChange={(e)=>setemailloc(e.target.value)} value={emailloc} placeholder="Email*"/>
                    <input className="login-input-field" required={true} autoComplete="password" type="password" onChange={(e)=>setPassword(e.target.value)} value={password} placeholder="Password*"/>
                    <button type="submit" className="login-login-button">Log in</button>
                </form>
            </div>
        </div>
      
    );
}