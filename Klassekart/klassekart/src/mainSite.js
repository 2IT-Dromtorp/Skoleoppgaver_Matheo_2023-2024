import React, { useState } from 'react';
import Checklist from './checkbox';
import './mainSite.css'

export default function MainSite({ oppdater }) {

  return (
    <Checklist oppdater={oppdater}/>
  );
};