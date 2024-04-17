import {Link, Outlet} from 'react-router-dom';
import './layout.css'
import React, { useContext, useEffect } from 'react';

import { Profile, Viken, Request, Pupils } from '../svg.jsx'
import { useLocation } from 'react-router-dom'
import { GetFetch } from './functions.jsx';
import { EmailContext, SchoolclassContext } from '../context.js'

export default function Layout() {
    const loc = useLocation();
    const {email, setEmail} = useContext(EmailContext);
    const {schoolclass, setSchoolclass} = useContext(SchoolclassContext);

    useEffect(()=>{
      async function fetchEmail(){
        const response = await GetFetch("/api/get-email-from-jwt");
        if(!response.ok){
          return;
        }

        const data = await response.json();
        setEmail(data.email);
        setSchoolclass(data.sclass);
      }

      fetchEmail();
    },[schoolclass, setSchoolclass, setEmail]);

    return (
      <div className='layout-main'>
        <div className='navbar-main'>
          <Link to="/"><Viken/></Link>

          {schoolclass==="LAERER"?<>
            <Link to={`/requests`}> {React.createElement(Request, { className: `navbar-item${"requests" === loc.pathname.split('/')[1] ? ' selected' : ''}` })}</Link>
            <Link to={`/users`}> {React.createElement(Pupils, { className: `navbar-item${"users" === loc.pathname.split('/')[1] ? ' selected' : ''}` })}</Link>
          </>:false}
          
          
          
          <Link to={`/profile/${email}`}> {React.createElement(Profile, { className: `navbar-item${"profile" === loc.pathname.split('/')[1] ? ' selected' : ''}` })}</Link>
        </div>
        <div className='layout-outlet'>
            <Outlet/>
        </div>
      </div>
    );
}