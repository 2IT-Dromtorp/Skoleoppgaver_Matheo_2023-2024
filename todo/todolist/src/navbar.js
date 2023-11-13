import { useState, useEffect } from 'react';
import user from './icons/user.svg'
import { useNavigate } from 'react-router-dom';
import './App.css'

let x = false

export default function NavBar() {
  const navigate = useNavigate();

  const [showLogIn, setShowLogIn] = useState(false);
  const [person, setPerson] = useState('');
  const [password, setPassword] = useState('');

  const [acceptetUser, setAcceptedUser] = useState('');

  //Denne samler inn dataen fra inloggingen, og sletter alt som står i input-baren 
  

  //Grunnet parameteret i [] under calles denne useEffecten hver gang staten "person" oppdateres
  useEffect(() => {
    //for at koden ikke skal calles når du åpner opp førstegangen, for da sender den deg til en bruker selv før du logger inn bruker jeg "x-systemet"
    if(x==false){
      x=true
    } 
    else{
      //Jeg vet ikke hvorfor jeg sier at koden undeer skal skje hvis 1>0, for 1 er alltid større enn null. Men hvis jeg fjerner det fungerer ikke koden min
      if (1 > 0) {
        console.log("POST Request Called");
        fetch("http://localhost:8080/api/user", {
          method: "POST",
          credentials:'include',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({person,password}),
        })
        .then((res) => res.json())
        .then((data) => setAcceptedUser(data.currentUser));
      }
    }    
  }, [person]);

  //Hvis det som returneres, som helst er et navn, er noe, sendes man til input-siden, og får med parameteret, som er navnet på brukeren 
  useEffect(() => {
    if(acceptetUser!=''){
      navigate(`./input/${acceptetUser}`)
    }
  }, [acceptetUser]);
  const handleSubmit = (e) => {
    e.preventDefault();
    const submittedValue = e.target.elements.inputField.value;
    const submittedPass = e.target.elements.inputPass.value;
    setPassword(submittedPass)
    setPerson(submittedValue);
    e.target.elements.inputField.value=''
    e.target.elements.inputPass.value=''
  };
  return(
    <>
        <div className='loginbar'>
        <button className="loginbutton" onClick={() => setShowLogIn(!showLogIn)}><img src={user}/></button>
        </div>
        {showLogIn && (<div className='dropdownLogin'>
            <form onSubmit={handleSubmit}>
                    <input type="text" name="inputField"/>
                    <input type="password" name="inputPass"/>
                    <button type="submit">Submit</button>
                    <button onClick={()=>navigate(`./createUser`)}>Create new user</button>
            </form> 
        </div>)}
    </>
  );
}