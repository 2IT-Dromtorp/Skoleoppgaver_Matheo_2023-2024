import '../../css/homesite.css'

import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Homesite() {

    return (
        <div className='homesite-main'>
            <div className='homesite-new-ticket'>
                <Link className='homesite-new-ticket-button' to={'/create-ticket'}>+ New Ticket</Link>
            </div>
            <div className='homesite-create-ticket-main'>
                <div className='homesite-display-ticket-settings'>

                </div>
                <div className='homesite-create-ticket-container'>

                </div>
            </div>
        </div>
    );
}

export default Homesite;