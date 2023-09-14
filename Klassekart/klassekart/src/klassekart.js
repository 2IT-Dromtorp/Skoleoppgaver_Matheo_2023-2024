import React, { useState } from 'react';
import Button from './button';
import './App.css';
import './classmap.css'
import { useNavigate } from 'react-router-dom';


export default function ClassMap({ oppdater }) {
  const navigate = useNavigate();

  return (
    <div className="App">
      <header className="App-header">
      <button className='menuButton' button onClick={() => navigate('/')}>Tilbake til menyen</button>
        <div class="grid-container">
            <div><Button person="Andreas"/></div>
            <div><Button person="Ahmad"/></div>
            <div></div>
            <div><Button person="Theodor"/></div>
            <div><Button person="Alva"/></div>
            <div><Button person="Silas"/></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>       
            <div><Button person="Philip"/></div>
            <div><Button person="Mattis"/></div>
            <div></div>
            <div><Button person="Axel"/></div>
            <div><Button person="Vetle"/></div>
            <div><Button person="Kristoffer"/></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div><Button person="Gabriel"/></div>
            <div></div>
            <div></div>
            <div><Button person="Johannes"/></div>
            <div><Button person="Elias"/></div>
            <div><Button person="Matheo"/></div>

        </div>
      </header>
    </div>
  );
};