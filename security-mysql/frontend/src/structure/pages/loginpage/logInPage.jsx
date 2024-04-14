import { useState } from "react";
import { useNavigate, Link } from 'react-router-dom';

import './logInPage.css'

export default function LogInPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try{
            const response = await fetch("/api/login",{
                method:"POST",
                headers: {
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({
                    email:email,
                    password:password
                })
            });

            if (!response.ok){
                if(response.status===412) setEmail("");
                const responseData = await response.json();
                setPassword("");
                alert(responseData.message);
                return;
            }
            
            const responseData = await response.json();
            localStorage.setItem("accessToken",responseData.accessToken);
            navigate("/");
        } catch(error){
            console.error("Error during fetch:", error.message);
        }        
    }

    return (
        <div className="login-main">
            <div className="login-info">

            </div>
            <div className="login-login">
                <form onSubmit={handleLogin} className="login-form">
                    <input className="login-input-field" required={true} autoComplete="email" type="email" onChange={(e)=>setEmail(e.target.value)} value={email} placeholder="Email"/>
                    <input className="login-input-field" required={true} autoComplete="password" type="password" onChange={(e)=>setPassword(e.target.value)} value={password} placeholder="Password"/>
                    <button type="submit" className="login-login-button">Log in</button>
                </form>
                <Link to="/create-user" className="login-create-user-link">Create a new user</Link>
            </div>
        </div>
      
    );
}