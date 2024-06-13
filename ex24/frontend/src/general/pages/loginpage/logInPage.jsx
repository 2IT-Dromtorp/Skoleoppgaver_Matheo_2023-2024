import { useState } from "react";
import { useNavigate, Link } from 'react-router-dom';

import './logInPage.css'

export default function LogInPage() {
    const navigate = useNavigate();

    const [emailloc, setemailloc] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        
        const response = await fetch("/api/login",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                email:emailloc,
                password:password
            })
        });

        const resData = await response.json();

        if(!response.ok) return alert(resData);

        localStorage.setItem("accessToken",resData);
        navigate("/my-page");
    }

    return (
        <div className="login-main">
            <div className="login-login">
                 <p className="login-log-in-header">Logg inn</p>

                <form onSubmit={handleLogin} className="login-form">
                    <input className="login-input-field" required={true} autoComplete="email" type="email" onChange={(e)=>setemailloc(e.target.value)} value={emailloc} placeholder="Email*"/>
                    <input className="login-input-field" required={true} autoComplete="password" type="password" onChange={(e)=>setPassword(e.target.value)} value={password} placeholder="Passord*"/>
                    <button type="submit" className="mainsite-link-to-tour login-login-button login-login-button-padding">Logg inn</button>
                </form>

                <h2>Har du ikke en bruker?</h2>
                <Link to={"/register"} className='mainsite-link-to-tour'>Registrer deg her</Link>
            </div>
        </div>
      
    );
}