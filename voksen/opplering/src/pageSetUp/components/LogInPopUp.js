import { useEffect, useContext, useState } from 'react'; 
import '../../css/login.css'
import { ShowPopUpContext } from '../../context.js';
import { useNavigate } from 'react-router-dom';
import Viken from '../../icons/viken.png'


function LogInPopUp() {
    const navigate = useNavigate()

    const handleClick = () => {
        navigate(`/sign-up`)
    };

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const submitInfo = (e) => {
        e.preventDefault();
        const dataToSendIn = { username: username, password: password}
        fetch(`/login`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dataToSendIn) 
        })
        .then((res) => {
            if(res.status===401){
                alert('Your password is not correct')
            }
            else{
                return res.json()
            }
        })
        .then((data) => {
            if (data !== undefined){
                console.log(data)
                navigate('/')
            }
        })
        .catch((error) => console.error(error));
    }

    return ( 
       <div className="login-main">
        <div className='login-smaller-box-content'>
            <img src={Viken}/>
            <p>Logg inn for å kunne melde deg på de mange lærerike kursene vi har å tilby</p>
        </div>
        <div className='login-smaller-box-with-login'>
            <h1>Logg inn</h1>
            <form>
                <input type='email' value={username} onInput={e => setUsername(e.target.value)} autoComplete='email' placeholder='Skriv inn epost-adresse'/>  
                <input type='password' value={password} onInput={e => setPassword(e.target.value)} autoComplete='current-password' placeholder='Skriv inn passord'/>  
                <button type='submit' onClick={submitInfo}>Fortsett</button>
            </form>
            <div className='login-create-user'>
                <button onClick={handleClick}>Hvis du ikke har en bruker, lag en ny her</button>
            </div>
        </div>
       </div>
    )
}

export default LogInPopUp;