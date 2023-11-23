import { ShowPopUpContext } from '../context.js';
import { useState, useContext } from 'react';
import '../css/popus.css'
import RecievePopUp from './components/recievePopUp';
import xIcon from '../icons/xout.png'

function PopUp() {
    const { showPopUp, setShowPopUp } = useContext(ShowPopUpContext);
    const [preferredPopUp, setPreferredPopUp] = useState('course')
    const handleClick = () => {
        setShowPopUp(false)
    };
    
    return (
        <div className='popup-main' onClick={handleClick}>
            <button className='popup-x-button'>
                <img src={xIcon}/>
            </button>
            <div className='popup-template'>
                <RecievePopUp/>
           </div>
        </div>
    );
}

export default PopUp;