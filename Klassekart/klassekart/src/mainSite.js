import React, { useState } from 'react';
import Button from './button';
import { Pupils } from './pupilsJSON';
import './mainSite.css'

export default function MainSite({ oppdater }) {
  const [content, setContent] = useState([]);
  let buttonWidth;

  function alleElever() {
    const buttons = Pupils.map((pupil, index) => (
      <Button key={index} oppdater={oppdater} person={pupil.firstname} />
    ));
    setContent(buttons);
  }

  function norskGymGruppeEn(fag, gruppe) {
    const filteredPupils = Pupils.filter(pupil => pupil[fag] === gruppe);
    const buttons = filteredPupils.map((pupil, index) => (
      <Button key={index} oppdater={oppdater} person={pupil.firstname} />
    ));
    setContent(buttons);
  }

  function countButtons() {
    const topBar = document.querySelector('.top-bar');
    if (topBar) {
      const buttonsInTopBar = topBar.querySelectorAll('button');
      const numberOfButtons = buttonsInTopBar.length;
      buttonWidth=100/numberOfButtons+"%"
    } 
  }

  countButtons()

  return (
    <div className='all'>
      <div className='top-bar'>
        <button onClick={alleElever} style={{ width: buttonWidth }}>Alle elever</button>
        <button onClick={() => norskGymGruppeEn("fellesfagng", "2IM1")} style={{ width: buttonWidth }}>Norsk/Gym gruppe 1</button>
        <button onClick={() => norskGymGruppeEn("fellesfagng", "2IM2")} style={{ width: buttonWidth }}>Norsk/Gym gruppe 2</button>
        <button onClick={() => norskGymGruppeEn("fellesfags", "2IM1")} style={{ width: buttonWidth }}>Samfunnsfag gruppe 1</button>
        <button onClick={() => norskGymGruppeEn("fellesfags", "2IM2")} style={{ width: buttonWidth }}>Samfunnsfag gruppe 2</button>        
      </div>
      <div className='main-content'>
        {content}    
      </div>
    </div>
  );
};