import '../../css/ticketminiview.css'
import Open from '../../icons/open.png'
import Closed from '../../icons/closed.png'


import { useContext, useEffect, useState } from 'react';
import { JsonListContext } from '../../context';
import { Link } from 'react-router-dom';

function TicketMiniView({id}) {
    const {jsonList, setJsonList} = useContext(JsonListContext);

    const [fullView, setFullView] = useState(false);

    return (
        <>
        <div className='ticketminiview-main'>
            <p className='ticketminiview-column'>{jsonList[id].casenum}</p>
            <p className='ticketminiview-column'>{jsonList[id].date}</p>
            <p className='ticketminiview-column'>{jsonList[id].subject}</p>
            <p className='ticketminiview-column'>{jsonList[id].username}</p>                    
             {jsonList[id].isFixed?<p className='ticketminiview-column'>Fullført</p>:<p className='ticketminiview-column'>I prosess</p>}
            {jsonList[id].priority==="h"?
                <p className='ticketminiview-column'>Høyst kritisk</p>
                :
                (jsonList[id].priority==="m"?
                    <p className='ticketminiview-column'>Moderat</p>
                :
                    <p className='ticketminiview-column'>Lav</p>
                )
            }
            <button className='ticketminiview-check-button' onClick={()=>setFullView(!fullView)}>{!fullView?<img src={Closed}/>:<img src={Open}/>}</button>
        </div>
        {!fullView?false:(

            <div className='ticketminiview-full-view'>
                <div className='ticketminiview-top'>
                    <div className='ticketminiview-description'>
                        <h2>Detaljert beskrivelse av problemet:</h2>
                        <p>{jsonList[id].detailedSubject}</p>
                    </div>
                    <div className='ticketminiview-note'>
                        <h2>Notater fra brukerstøtte:</h2>
                        <p>{jsonList[id].note}</p>
                    </div>
                </div>
                <div className='ticketminiview-bottom'>
                    <Link to={`edit-ticket/${id}`}>Rediger informasjon</Link>
                </div>
            </div>
        )}</>
    );
}

export default TicketMiniView;