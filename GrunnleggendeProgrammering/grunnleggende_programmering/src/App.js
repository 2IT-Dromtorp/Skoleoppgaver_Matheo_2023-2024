import './App.css';
import Oppgave1 from './oppgave1';
import Oppgave2 from './oppgave2';
import Oppgave3 from './oppgave3';
import Oppgave4 from './oppgave4';
import Oppgave5 from './oppgave5';
import React, { useState } from 'react';

function App() {
  const [content, setContent] = useState(null);
  function findContent(task){
      if(task==1){
        setContent(<Oppgave1/>)
      }
      else if(task===2){
        setContent(<Oppgave2/>)
      }
      else if(task===3){
        setContent(<Oppgave3/>)
      }
      else if(task===4){
        setContent(<Oppgave3/>)
      }
      else if(task===5){
        setContent(<Oppgave5/>)
      }
      else{
        setContent(null);
      }
    }
  return (
    <div className="App">
      <header className="App-header">
        <button onClick={() => findContent(1)}>Oppgave 1</button>
        <button onClick={() =>findContent(2)}>Oppgave 2</button>
        <button onClick={() =>findContent(3)}>Oppgave 3</button>
        <button onClick={() =>findContent(5)}>Oppgave 5</button>
        {content}
      </header>
    </div>
  );
}

export default App;
