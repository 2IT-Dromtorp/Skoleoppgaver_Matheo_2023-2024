import './layout.css';

import { Link, Outlet } from 'react-router-dom';

import { User, Home } from 'lucide-react';

export default function Layout(){

    return(
        <>
            <div className='navbar-main'>
                <Link className="navbar-item" to={"/"}><Home size={40}/></Link>
                <Link className="navbar-item" to={localStorage.getItem("accessToken")?"/my-page":"/login"}><User size={40}/></Link>
            </div>
            <Outlet/>
        </>
    )
}