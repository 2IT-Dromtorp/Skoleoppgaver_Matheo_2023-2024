import '../../css/createticket.css'

import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function CreateTicket() {

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("NEINIE")
    }

    return (
        <div className='createticket-main'>
            <div className='createticket-ad-container'>
                <Link to={"/"}>--</Link>
            </div>
            <div className='createticket-create-container'>
                <form className='ticker-creator' onSubmit={handleSubmit}>
                    <label className='createticket-labels'>
                        Brukerens navn
                        <input type="text" required={true} autoComplete='username'/>
                    </label>
                    <label className='createticket-labels'>
                        Kort beskrivelse av problemet
                        <input type="text" required={true} autoComplete='off'/>
                    </label>
                    <label className='createticket-labels'>
                        En mer detaljert beskrivelse av problemet
                        <textarea required={true} autoComplete='off'/>
                    </label>
                    <label className='createticket-labels'>
                        Hvor alvorlig er problemet?
                        <select name="prioritiez">
                            <option value="volvo">Høyst kritisk</option>
                            <option value="saab">Moderat</option>
                            <option value="fiat">Lav</option>
                        </select>
                    </label>
                    <input type="submit" value={"Send inn ticket"}/>
                </form>
            </div>
        </div>
    );
}

export default CreateTicket;