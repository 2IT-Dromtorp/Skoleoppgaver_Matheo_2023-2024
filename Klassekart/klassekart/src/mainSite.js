import React, { useState } from 'react';
import Checklist from './checkbox';
import './mainSite.css'
import './App.css';


export default function MainSite({ oppdater }) {
  return (
    <div className="App">
      <header className="App-header">
        <Checklist oppdater={oppdater}/>
      </header>
    </div>
  );
};