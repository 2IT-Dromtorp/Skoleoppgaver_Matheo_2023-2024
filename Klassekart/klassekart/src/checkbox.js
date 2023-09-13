import React, { useState } from 'react';
import Button from './button';
import { Pupils } from './pupilsJSON';
import './mainSite.css'

export default function Checklist({ oppdater }) {
  const [inCheck, setIn] = useState("");
  const [find, setFind] = useState("");
  let filteredPupils = []
  for (let i in Pupils) {
    if (inCheck != ""){
        if (Pupils[i][inCheck].toLowerCase().includes(find.toLowerCase())) {
            filteredPupils.push(<Button key={i} oppdater={oppdater} person={Pupils[i].firstname} />)
          }
    }
    else{
        filteredPupils.push(<Button key={i} oppdater={oppdater} person={Pupils[i].firstname} />)
      };
  }

  return (
    <>
      <div className='top-bar'>
        <select onChange={e=> setIn(e.target.value)}>
            <option value={""}>Null filter</option>
            <option value={"firstname"}>Fornavn</option>
            <option value={"lastname"}>Etternavn</option>
            <option value={"klasse"}>Klasse</option>
            <option value={"fellesfagng"}>Norsk/Gym</option>
            <option value={"fellesfags"}>Samfunnsfag</option>
        </select>
        <input onChange={e=> setFind(e.target.value)}></input>      
      </div>
      <div className='main-content'>
      {filteredPupils}
      </div>
    </>
        
        
    
  );
};