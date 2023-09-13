import React, { PureComponent, useState } from 'react';
import './mainSite.css'
import { useNavigate } from 'react-router-dom';

export default function Button({person}) {
  const navigate = useNavigate();

      return (
        <button className='nameButt' button onClick={() => navigate(`./profile/${person}`)}>{person}</button>
      );
    } 