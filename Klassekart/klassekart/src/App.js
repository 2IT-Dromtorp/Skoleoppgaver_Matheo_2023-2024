import './App.css';
import React, { useState } from 'react';
import Profil from './profileSite'
import MainSite from './mainSite'

function App() {
  
  const [content, setContent] = useState(<MainSite oppdater={switchSite}/>);

  function switchSite(navn){
    setContent(<Profil person={navn} oppdater={switchBack}/>)
  }

  function switchBack(){
    setContent(<MainSite/>)
  }

  return (
    <div className="App">
      <header className="App-header">
        {content}
      </header>
    </div>
  );
}

export default App;
