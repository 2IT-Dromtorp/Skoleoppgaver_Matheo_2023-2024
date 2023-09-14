import './App.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function App() {
  const navigate = useNavigate();
  return (
    <div className="App">
      <header className="App-header">
        <button button onClick={() => navigate(`./classList`)}>Klasseliste</button>
        <button button onClick={() => navigate(`./classMap`)}>Klassekart</button>

      </header>
    </div>
  );
}

export default App;
