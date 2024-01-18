import '../../css/editticket.css'

import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { JsonListContext } from '../../context';
import { useParams } from 'react-router-dom';

function EditTicket() {
    const navigate = useNavigate();

    const preid = useParams();
    const textid = preid.id
    const id = parseInt(textid, 10)

    const {jsonList, setJsonList} = useContext(JsonListContext)

    const [username, setUsername] = useState(jsonList[id].username);
    const [subject, setSubject] = useState(jsonList[id].subject);
    const [detailedSubject, setDetailedSubject] = useState(jsonList[id].detailedSubject);
    const [priority, setPriority] = useState(jsonList[id].priority);
    const [note, setNote] = useState('');
    const [isFixed, setIsFixed] = useState(jsonList[id].isFixed);
    const [num, setNum] = useState(jsonList[id].casenum);



    const handleSubmit1 = (e) => {
        e.preventDefault();
        
        const today = new Date();
        const month = today.getMonth() + 1;
        const year = today.getFullYear();
        const date = today.getDate();
        const todaysDate = date+"."+month+"."+year

        const newValues = [...jsonList];
        const nowNote = newValues[id].note
        const sendNote = nowNote+"/n"+note
        const newItem = {casenum:num, date:todaysDate, subject: subject, username:username, isFixed:isFixed, priority:priority, detailedSubject:detailedSubject, note:sendNote}
        newValues[id] = newItem;
        setJsonList(newValues);
        
        navigate("/")

    }

    return (
        <div className='editticket-main'>
            <div className='editticket-ad-container'>
                <form className='editticket-more-form' onSubmit={handleSubmit1}>
                    <label className='editticket-labels-check'>
                        Er ticketen fullført?
                        <input type='checkbox' required={false} checked={isFixed} onChange={()=>setIsFixed(!isFixed)}/>
                    </label>
                    <label className='editticket-labels'>
                        Notat fra brukerstøtte
                        <input type="text" required={true} autoComplete='off' value={note} onChange={(e)=>{setNote(e.target.value)}}/>
                    </label>
                    <input type='submit' value="Send inn oppdatert ticket"/>
                </form>
            </div>
            <div className='editticket-create-container'>
                <form className='ticker-creator' onSubmit={handleSubmit1}>
                    <label className='editticket-labels'>
                        Brukerens navn
                        <input type="text" required={true} autoComplete='username' value={username} onChange={(e)=>{setUsername(e.target.value)}}/>
                    </label>
                    <label className='editticket-labels'>
                        Kort beskrivelse av problemet
                        <input type="text" required={true} autoComplete='off' value={subject} onChange={(e)=>{setSubject(e.target.value)}}/>
                    </label>
                    <label className='editticket-labels'>
                        En mer detaljert beskrivelse av problemet
                        <textarea required={true} autoComplete='off' value={detailedSubject} onChange={(e)=>{setDetailedSubject(e.target.value)}}/>
                    </label>
                    <label className='editticket-labels'>
                        Hvor alvorlig er problemet?
                        <select name="prioritiez" value={priority} onChange={(e)=>{setPriority(e.target.value)}}>
                            <option value="h">Høyst kritisk</option>
                            <option value="m">Moderat</option>
                            <option value="l">Lav</option>
                        </select>
                    </label>
                    <input type="submit" value={"Send inn oppdatert ticket"}/>
                </form>
            </div>
        </div>
    );
}

export default EditTicket;