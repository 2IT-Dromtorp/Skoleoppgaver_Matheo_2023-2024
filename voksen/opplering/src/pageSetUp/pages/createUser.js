import '../../css/createuser.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function CreateUser() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [number, setNumber] = useState('')

    function submitInfo(){
        const dataToSendIn = { username: username, password: password, email: email, number: number}
        fetch(`/create-user`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dataToSendIn) 
        })
        .then((res) => {
            if(res.status===409 ){
                alert('A user already exists on this email')
            }
            else{
                return res.json()
            }
        })
        .then((data) => {
            if (data !== undefined){
                console.log(data)
                navigate(-1)
            }
        })
        .catch((error) => console.error(error));
    }

    return (
        <div className='create-user-main'>
            <p>Brukernavn</p>
            <input type='text' value={username} onInput={e => setUsername(e.target.value)}/>  
            <p>Passord</p>
            <input type='password' value={password} onInput={e => setPassword(e.target.value)}/>  
            <p>Epost</p>
            <input type='email' value={email} onInput={e => setEmail(e.target.value)}/>  
            <p>Telefon-nummer</p>
            <input type='number' value={number} onInput={e => setNumber(e.target.value)}/>  
            <button onClick={() => submitInfo()}>Trykk for submit</button>
        </div>
    );
}

export default CreateUser;