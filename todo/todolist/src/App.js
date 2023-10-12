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

  //Det API-en gjør her er å "logge ut" av alle brukere hvis du gjennom søkebaren går tilbake til forsiden
  //Av en eller annen grunn må jeg i kun denne API-en definere hvilken port jeg caller til, mens proxy fungerer på alle andre
//Jeg jobber videre med utvikling av delen under, men vil dokumentere frst
  // useEffect(() => {
  //   fetch(`http://localhost:8080/api/login?user=${null}`, { method: "GET" })
  //     .then((res) => res.json())
  // }, []);

  //Denne samler inn dataen fra inloggingen, og sletter alt som står i input-baren 
  const handleSubmit = (e) => {
    e.preventDefault();
    const submittedValue = e.target.elements.inputField.value;
    const submittedPass = e.target.elements.inputPass.value;
    setPassword(submittedPass)
    setPerson(submittedValue);
    e.target.elements.inputField.value=''
    e.target.elements.inputPass.value=''

  };

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

  //Hvis det som returneres, som helst er et navn, er noe, sendes man til input-siden, og får med parameteret, som er navnet på brukeren 
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