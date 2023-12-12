import { Outlet } from 'react-router-dom';
import '../css/layout.css'
import '../css/values.css'

import { useState, useContext, useEffect } from 'react';
import Navbar from './navbar';

function Layout() {

    return (
        <div className='content_box'>
            <Navbar/>
            <main className='main_content'>
                <Outlet/>
            </main>
        </div>
    );
}

export default Layout;
