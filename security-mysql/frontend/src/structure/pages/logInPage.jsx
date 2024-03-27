import { useState } from "react";


export default function LogInPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

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
            })
            
            console.log(response.body)
        } catch(error){
            console.error(error)
        }
        
    }

    return (
      <form onSubmit={handleLogin}>
        <input required={true} autoComplete="email" type="email" onChange={(e)=>setEmail(e.target.value)}/>
        <input required={true} autoComplete="password" type="password" onChange={(e)=>setPassword(e.target.value)}/>
        <button type="submit">Log inn</button>
      </form>
    );
}