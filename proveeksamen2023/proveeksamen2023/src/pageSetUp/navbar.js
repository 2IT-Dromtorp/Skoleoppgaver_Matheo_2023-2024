import '../css/navbar.css'

import { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Navbar() {

    return (
        <div className='navbar-main'>
            <Link className='navbar-new-ticket' to={'/'}><p>Se dine tickets</p></Link>
            <Link className='navbar-new-ticket' to={'/create-ticket'}><p>Lag en ny ticket <i>+</i></p></Link>
        </div>
    );
}

export default Navbar;
