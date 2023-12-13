import '../../css/homesite.css'

import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import TicketMiniView from '../components/ticketMiniView';
import { JsonListContext } from '../../context';

function Homesite() {
    
    const [ListOfTickets, setListOfTickets] = useState([])
    const {jsonList, setJsonList} = useContext(JsonListContext)

    const addItem = (newItem) => {
        setListOfTickets((prevList) => [...prevList, newItem]);
    };

    useState(()=>{
        for (let i = 0; i < jsonList.length; i++){
            addItem(<TicketMiniView key={i} id={i}/> );
        }
    }, jsonList)

    return (
        <div className='homesite-main'>
            <div className='homesite-create-ticket-main'>
                <div className='homesite-display-ticket-settings'>
                    <p className='homesite-column'>Sak nr.</p>
                    <p className='homesite-column'>Dato</p>
                    <p className='homesite-column'>Beskrivelse</p>
                    <p className='homesite-column'>Bruker</p>                    
                    <p className='homesite-column'>Status</p>
                    <p className='homesite-column'>Prioritet</p>
                </div>
                <div className='homesite-create-ticket-container'>
                    {ListOfTickets}
                </div>
            </div>
        </div>
    );
}

export default Homesite;