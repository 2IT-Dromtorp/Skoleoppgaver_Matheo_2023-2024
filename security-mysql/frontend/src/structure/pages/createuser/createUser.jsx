import '../loginpage/logInPage.css'
import './createuser.css'

import { useState } from "react";
import { useNavigate, Link } from 'react-router-dom';

export default function CreateUser() {
    const [givenName, setGivenName] = useState("")
    const [surname, setSurname] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("");
    const [passwordCheck, setPasswordCheck] = useState("");
    const [schoolclass, setSchoolclass] = useState("None")

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        if(password!==passwordCheck) return alert("The password does not match");
        if(schoolclass==="None") return alert("You have to choose a class");
        try{
            const response = await fetch("/api/createuser",{
                method:"POST",
                headers: {
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({
                    email:email,
                    password:password,
                    givenname:givenName,
                    surname:surname,
                    schoolclass:schoolclass
                })
            })

            if (!response.ok){
                if(response.status===412) setEmail("");
                const responseData = await response.json();
                setPassword("");
                setPasswordCheck("");
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
                    <input className="createuser-input-field" required={true} type="text" onChange={(e)=>setGivenName(e.target.value)} value={givenName} placeholder="Firstname"/>
                    <input className="createuser-input-field" required={true} type="text" onChange={(e)=>setSurname(e.target.value)} value={surname} placeholder="Lastname"/>
                    <input className="createuser-input-field" required={true} autoComplete="email" type="email" onChange={(e)=>setEmail(e.target.value)} value={email} placeholder="Email"/>
                    <input className="createuser-input-field" required={true} autoComplete="password" type="password" onChange={(e)=>setPassword(e.target.value)} value={password} placeholder="Password" minLength={8}/>
                    <input className="createuser-input-field" required={true} autoComplete="password" type="password" onChange={(e)=>setPasswordCheck(e.target.value)} value={passwordCheck} placeholder="Repeat your password" minLength={8}/>
                    <select required={true} onChange={(e)=>setSchoolclass(e.target.value)} value={schoolclass} placeholder="Your class" className='createuser-input-field'>
                        <option value="None"></option>
                        <option value="2ITA">2ITA</option>
                        <option value="2ITB">2ITB</option>
                        <option value="2MPA">2MPA</option>
                        <option value="1IMX">1IMX</option>
                        <option value="LAERER">Lærer</option>
                    </select>
                    <button type="submit" className="login-login-button">Create User</button>
                </form>
                <Link to="/log-in" className="login-create-user-link">Already have a user? Log in</Link>
            </div>
        </div>
    );
}