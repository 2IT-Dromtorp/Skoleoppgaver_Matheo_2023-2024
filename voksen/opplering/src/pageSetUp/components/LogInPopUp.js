import { useEffect, useContext, useState } from 'react'; 
import '../../css/login.css'
import { ShowPopUpContext } from '../../context.js';
import { useNavigate } from 'react-router-dom';


function LogInPopUp() {
    const navigate = useNavigate()

    const handleClickedEntireDiv = (event) => {
        event.stopPropagation();
    };

    const handleClick = () => {
        setShowPopUp(false)
        navigate(`/sign-up`)
    };

    const { showPopUp, setShowPopUp } = useContext(ShowPopUpContext);


    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    function submitInfo(){
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
                setShowPopUp(false)
            }
        })
        .catch((error) => console.error(error));
    }

    return ( 
       <div className="login-main" onClick={handleClickedEntireDiv}>
            <input type='text' value={username} onInput={e => setUsername(e.target.value)}/>  
            <input type='password' value={password} onInput={e => setPassword(e.target.value)}/>  
            <button onClick={() => submitInfo()}>Trykk for submit</button>
            <button onClick={handleClick}>Lag en ny bruker</button>
       </div>
    )
}

export default LogInPopUp;