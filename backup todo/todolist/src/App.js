import React, { useEffect, useState } from 'react';
import './App.css';
import { useNavigate } from 'react-router-dom';
let x = false
let y = false


//ok, så, måten jeg gjør det på er: når man logger inn sendes man til siden som er relevant for det. jeg tar at man ikke kan lage en bruker med samme navn, i lowercase, som en annen. men sendes sa til .input/${person}, noe som avklares i serveren. jeg tenker at man har en array med alle navnene og passordene, og en egen side for hver av brukerene sin data. så, siden heter det samme som brukeren, og så hentes det ut


function App() {
  const navigate = useNavigate();
  const [person, setPerson] = useState('');
  const [password, setPassword] = useState('');

  const [acceptetUser, setAcceptedUser] = useState('');



  const handleSubmit = (e) => {
    e.preventDefault();
    const submittedValue = e.target.elements.inputField.value;
    const submittedPass = e.target.elements.inputPass.value;
    setPassword(submittedPass)
    setPerson(submittedValue);
    e.target.elements.inputField.value=''
    e.target.elements.inputPass.value=''

  };

  useEffect(() => {
    if(x==false){
      x=true
    } 
    else{
      if (1 > 0) {
        console.log("POST Request Called");
        fetch("/api/user", {
          method: "POST",
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

  useEffect(() => {
    if(acceptetUser!=''){
      navigate(`./input/${acceptetUser}`)
    }
  }, [acceptetUser]);

  return (
    <div className="App">
      <header className="App-header">
        <form onSubmit={handleSubmit}>
              <input type="text" name="inputField"/>
              <input type="text" name="inputPass"/>
              <button type="submit">Submit</button>
          </form>
          <button onClick={()=>navigate(`./createUser`)}>Create new user</button>
      </header>
    </div>
  );
}

export default App;