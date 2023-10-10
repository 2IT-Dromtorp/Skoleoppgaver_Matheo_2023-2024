import React, { useState, useEffect } from 'react';
import List from './list';
import { useParams } from 'react-router-dom';
import './App.css';


export default function Input() {
  let { brukerNavn } = useParams()

  const [loggedIn, setLog] = useState('');
  const [arr, setArr] = useState('');
  const [description, setDesctiption] = useState('');


  const handleSubmit = (e) => {
    e.preventDefault();
    const submittedValue = e.target.elements.inputField.value;
    const description = e.target.elements.description.value;
    setArr(submittedValue);
    setDesctiption(description);
    e.target.elements.inputField.value=''
    e.target.elements.description.value=''
  };

  useEffect(() => {
    fetch(`/api/login?user=${brukerNavn}`, { method: "GET" })
      .then((res) => res.json())
      .then((data) => setLog(data.isLoggedIn));
  }, []);
  if (loggedIn) {
    return (
    
      <div className="App">
        <header className="App-header">
          <div className='inputBar'>
          <form onSubmit={handleSubmit}>
              <input type="text" name="inputField"/>
              <input type="text" name="description"/>
              <button type="submit">Submit</button>
          </form>
        </div>
        <div className='listBar'>
          <List input={arr} description={description} brukerNavn={brukerNavn}/>
        </div>  
        </header>
      </div>
    );
  }
  else{
    return(
    <div className="App">
        <header className="App-header">
          <h1>{`Du er ikke logget inn som ${brukerNavn}`}</h1>
        </header>
      </div>
  );
}
}