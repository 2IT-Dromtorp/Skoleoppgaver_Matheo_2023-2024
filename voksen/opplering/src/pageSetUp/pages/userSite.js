import { useNavigate } from "react-router-dom";
import '../../css/userSite.css'
import { useEffect, useState } from "react";

function UserSite() {
    const navigate = useNavigate()

    const [editUserName, setEditUserName] = useState(false)
    const [editEmail, setEditEmail] = useState(false)
    const [editNumber, setEditNumber] = useState(false)
    const [editPassword, setEditPassword] = useState(false)

    const [username, setUsername] = useState('Vetle')
    const [password, setPassword] = useState('rotte')
    const [email, setEmail] = useState('vetle@gmail.com')
    const [number, setNumber] = useState('2134')

    useEffect(()=>{
        fetch(`/get-credentials`, {
            method: 'GET',
            credentials: 'include',
        })
        .then(async (res) => {
            const data = await res.json();
            if(data!==undefined){
                const inData = data[0]
                setUsername(inData.userName)
                setPassword(inData.password)
                setEmail(inData.email)
                setNumber(inData.phoneNumber)
            }
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
        });
    },[])

    const handleClick = () => {
        fetch(`/logout`, {
            method: 'GET',
            credentials: 'include',
        })
        .then(async (res) => {
            const data = await res.json();
            console.log(data)
            navigate('/')
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
        });
    }

    function sumbitCred(){
        const dataToSendIn = {password:password, username:username, email:email, number:number}
        fetch(`/edit-credentials`, {
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
                window.location.reload()
            }
        })
        .catch((error) => console.error(error));
    }

    return ( 
       <div className="user-site-main">
            <div className="user-site-side-options">
                <button onClick={handleClick} className="user-site-logout-button">
                    Logg ut
                </button>
            </div>
            <div className="user-site-change-credential">
                    {!editUserName?<h1 className="user-site-user-name-text">{username}</h1>:<input type="text" className="user-site-user-name-input" value={username} autoComplete="username" onInput={e => setUsername(e.target.value)}/>}
                    {!editUserName?<button onClick={() => setEditUserName(!editUserName)}>Edit</button>:<button onClick={() => sumbitCred()}>Submit</button>}

                    {!editEmail?<h1 className="user-site-user-name">{email}</h1>:<input type="email" className="user-site-user-name" value={email} autoComplete="email" onInput={e => setEmail(e.target.value)}/>}
                    {!editEmail?<button onClick={() => setEditEmail(!editEmail)}>Edit</button>:<button onClick={() => sumbitCred()}>Submit</button>}

                    {!editNumber?<h1 className="user-site-user-name">{number}</h1>:<input type='tel'  pattern="[0-9]{8}" className="user-site-user-name" value={number} onInput={e => setNumber(e.target.value)}/>}
                    {!editNumber?<button onClick={() => setEditNumber(!editNumber)}>Edit</button>:<button onClick={() => sumbitCred()}>Submit</button>}

                    {!editPassword?<h1 className="user-site-user-name">*******</h1>:<input type="password" className="user-site-user-name" value={password} autoComplete="current-password" onInput={e => setPassword(e.target.value)}/>}
                    {!editPassword?<button onClick={() => setEditPassword(!editPassword)}>Edit</button>:<button onClick={() => sumbitCred()}>Submit</button>}
            </div>
       </div>
    )
}

export default UserSite;