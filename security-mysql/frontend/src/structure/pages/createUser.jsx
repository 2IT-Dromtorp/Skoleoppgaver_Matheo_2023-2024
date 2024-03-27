import { useState } from "react";
import { useNavigate } from 'react-router-dom';

export default function CreateUser() {
    const [givenName, setGivenName] = useState("")
    const [surname, setSurname] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("");
    const [passwordCheck, setPasswordCheck] = useState("");
    const [schoolclass, setSchoolclass] = useState("")

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        if(password!==passwordCheck) return alert("The password does not match")
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
                if(response.status===403) setEmail("");
                const responseData = await response.json();
                setPassword("");
                setPasswordCheck("");
                alert(responseData.message);
                return;
            }
            
            const responseData = await response.json();
            alert(responseData.message);
            navigate("/lending");
        } catch(error){
            console.error("Error during fetch:", error.message);
        }
    }

    return (
      <form onSubmit={handleLogin}>
        <input required={true} type="text" onChange={(e)=>setGivenName(e.target.value)} value={givenName} placeholder="Firstname"/>
        <input required={true} type="text" onChange={(e)=>setSurname(e.target.value)} value={surname} placeholder="Lastname"/>
        <input required={true} autoComplete="email" type="email" onChange={(e)=>setEmail(e.target.value)} value={email} placeholder="Email"/>
        <input required={true} autoComplete="password" type="password" onChange={(e)=>setPassword(e.target.value)} value={password} placeholder="Password" minLength={8}/>
        <input required={true} autoComplete="password" type="password" onChange={(e)=>setPasswordCheck(e.target.value)} value={passwordCheck} placeholder="Repeat your password" minLength={8}/>
        <select required={true} onChange={(e)=>setSchoolclass(e.target.value)} value={schoolclass} placeholder="Your class">
            <option value="None"></option>
            <option value="2ITA">2ITA</option>
            <option value="2ITB">2ITB</option>
            <option value="2MPA">2MPA</option>
            <option value="1IMX">1IMX</option>
            <option value="LEARER">Lærer</option>
        </select>
        <button type="submit">Log in</button>
      </form>
    );
}