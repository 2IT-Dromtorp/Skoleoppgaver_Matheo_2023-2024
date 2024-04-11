import {Link, Outlet} from 'react-router-dom';
import './layout.css'
import React, { useEffect, useState } from 'react';

import { Profile, Viken } from '../svg.jsx'
import { useLocation } from 'react-router-dom'
import { GetFetch } from './functions.jsx';

export default function Layout() {
    const loc = useLocation();
    const [email, setEmail] = useState("");

    useEffect(()=>{
      async function fetchEmail(){
        const response = await GetFetch("/api/get-email-from-jwt");
        if(!response.ok){
          return;
        }

        const data = await response.json();
        setEmail(data.data);
      }

      fetchEmail();
    },[]);

    return (
      <div className='layout-main'>
        <div className='navbar-main'>
          <Link to="/"><Viken/></Link>
          {/* <Link to={`/profile/${email}`}> {React.createElement(Profile, { className: `navbar-item${"profile" === loc.pathname.split('/')[1] ? ' selected' : ''}` })}</Link> */}
          {/* <Link to={`/profile/${email}`}> {React.createElement(Profile, { className: `navbar-item${"profile" === loc.pathname.split('/')[1] ? ' selected' : ''}` })}</Link> */}
          <Link to={`/profile/${email}`}> {React.createElement(Profile, { className: `navbar-item${"profile" === loc.pathname.split('/')[1] ? ' selected' : ''}` })}</Link>
        </div>
        <div className='layout-outlet'>
            <Outlet/>
        </div>
      </div>
    );
}