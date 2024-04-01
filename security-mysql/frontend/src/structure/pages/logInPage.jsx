import { useState } from "react";
import { useNavigate } from 'react-router-dom';

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
            alert(responseData.accessToken); //gjøre no med token idk hva yet
            navigate("/");
        } catch(error){
            console.error("Error during fetch:", error.message);
        }        
    }

    return (
      <form onSubmit={handleLogin}>
        <input required={true} autoComplete="email" type="email" onChange={(e)=>setEmail(e.target.value)} value={email}/>
        <input required={true} autoComplete="password" type="password" onChange={(e)=>setPassword(e.target.value)} value={password}/>
        <button type="submit">Log inn</button>
      </form>
    );
}