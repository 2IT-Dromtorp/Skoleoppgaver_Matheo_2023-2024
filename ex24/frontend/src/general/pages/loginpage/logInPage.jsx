import { useState } from "react";

import './logInPage.css'

export default function LogInPage() {
    const [emailloc, setemailloc] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        
    }

    return (
        <div className="login-main">
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