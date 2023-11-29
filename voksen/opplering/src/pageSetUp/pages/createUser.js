import '../../css/createuser.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Viken from '../../icons/viken.png'
import { Link } from 'react-router-dom'

function CreateUser() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [number, setNumber] = useState('')

    const submitInfo = (e) => {
        e.preventDefault();
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
            console.log(data)
            if (data !== undefined){
                console.log(data)
                navigate('/')
            }
        })
        .catch((error) => console.error(error));
    }

    return (
        <div className='create-user-main'>
            <div className='create-user-smaller-box-content'>
                <img src={Viken} alt=''/>
                <p>Lag en bruker slik at du kan melde deg på de mange lærerike kursene vi har å tilby</p>
            </div>
            <div className='create-user-smaller-box-with-login'>
                <h1>Lag en ny bruker</h1>
                <form name="create-userform" onSubmit={submitInfo}>
                    <p>Epost</p>
                    <input autoComplete='email' required={true} type='email' value={email} onInput={e => setEmail(e.target.value)} placeholder='Skriv inn epost-adresse'/>  
                    <p>Brukernavn</p>
                    <input autoComplete="username" required={true} type='text' value={username} onInput={e => setUsername(e.target.value)} placeholder='Skriv inn brukernavn'/>  
                    <p>Passord</p>
                    <input autoComplete="current-password" required={true} type='password' value={password} onInput={e => setPassword(e.target.value)} placeholder='Skriv inn passord'/>  
                    <p>Telefon-nummer</p>
                    <input required={true} type='tel'  pattern="[0-9]{8}" value={number} onInput={e => setNumber(e.target.value)} placeholder='Skriv inn telefon-nummer'/>  
                    <button type='submit' >Lag en bruker</button>
                </form>
                <div className='create-user-create-user'>
                    <Link to="/log-in" className='create-user-create-user-link'>Hvis du har en bruker, logg inn her</Link>
                </div>
            </div>
       </div>
    );
}

export default CreateUser;