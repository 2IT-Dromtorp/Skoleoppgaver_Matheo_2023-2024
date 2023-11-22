import { Outlet } from 'react-router-dom';
import NavBar from './navbar.js';
import PopUp from './popup.js';
import '../css/layout.css';
import '../css/values.css';
import { ShowPopUpContext } from '../context.js';
import { useState, useContext } from 'react';

function Layout() {
    const { showPopUp, setShowPopUp } = useContext(ShowPopUpContext);

    return (
        <div className='content_box'>
            {showPopUp && <PopUp/>}
            <NavBar />
            <main className='main_content'>
                <Outlet/>
            </main>
        </div>
    );
}

export default Layout;
