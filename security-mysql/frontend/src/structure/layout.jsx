import {Outlet} from 'react-router-dom';
import './layout.css'
import React from 'react';

import { Profile, Viken } from '../svg.jsx'
import { useLocation } from 'react-router-dom'

export default function Layout() {
    const loc = useLocation();

    return (
      <div className='layout-main'>
        <div className='navbar-main'>
          <Viken/>
          {React.createElement(Profile, { className: `navbar-item${"profile" === loc.pathname.split('/')[1] ? ' selected' : ''}` })}
        </div>
        <div className='layout-outlet'>
            <Outlet/>
        </div>
      </div>
    );
}