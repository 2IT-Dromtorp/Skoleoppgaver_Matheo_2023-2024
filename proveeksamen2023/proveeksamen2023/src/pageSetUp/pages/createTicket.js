import '../../css/createticket.css'

import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { JsonListContext } from '../../context';

function CreateTicket() {
    const navigate = useNavigate();

    const {jsonList, setJsonList} = useContext(JsonListContext)

    const [username, setUsername] = useState('');
    const [subject, setSubject] = useState('');
    const [detailedSubject, setDetailedSubject] = useState('');
    const [priority, setPriority] = useState('h');

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const today = new Date();
        const month = today.getMonth() + 1;
        const year = today.getFullYear();
        const date = today.getDate();
        const todaysDate = date+"."+month+"."+year

        const newItem = {casenum:jsonList.length+1, date:todaysDate, subject: subject, username:username, isFixed:false, priority:priority, detailedSubject:detailedSubject}
        setJsonList((prevList) => [...prevList, newItem]);
        navigate("/")

    }

    return (
        <div className='createticket-main'>
            <div className='createticket-ad-container'>
                <h1>
                    VTH BRUKERSTØTTE
                </h1>
                <h2>
                    For deg som bruker våre tjenester
                </h2>
            </div>
            <div className='createticket-create-container'>
                <form className='ticker-creator' onSubmit={handleSubmit}>
                    <label className='createticket-labels'>
                        Brukerens navn
                        <input type="text" required={true} autoComplete='username' onChange={(e)=>{setUsername(e.target.value)}}/>
                    </label>
                    <label className='createticket-labels'>
                        Kort beskrivelse av problemet
                        <input type="text" required={true} autoComplete='off' onChange={(e)=>{setSubject(e.target.value)}}/>
                    </label>
                    <label className='createticket-labels'>
                        En mer detaljert beskrivelse av problemet
                        <textarea required={true} autoComplete='off' onChange={(e)=>{setDetailedSubject(e.target.value)}}/>
                    </label>
                    <label className='createticket-labels'>
                        Hvor alvorlig er problemet?
                        <select name="prioritiez" onChange={(e)=>{setPriority(e.target.value)}}>
                            <option value="h">Høyst kritisk</option>
                            <option value="m">Moderat</option>
                            <option value="l">Lav</option>
                        </select>
                    </label>
                    <input type="submit" value={"Send inn ticket"}/>
                </form>
            </div>
        </div>
    );
}

export default CreateTicket;