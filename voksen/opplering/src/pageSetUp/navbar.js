import '../css/navbar.css'
import userIcon from '../icons/user.png'
import { ShowPopUpContext, PopUpContentContext } from '../context';
import { useContext } from 'react';

function NavBar() {
    const { showPopUp, setShowPopUp } = useContext(ShowPopUpContext);
    const {popUpContent, setPopUpContent} = useContext(PopUpContentContext);

    const handleclick = ()=>{
        setShowPopUp(true)
        setPopUpContent('login')
    }

    return (
        <div className='navbar-main'>
            <div className='navbar-a'>
                <div className='navbar-left'>

                </div>
                <div className='navbar-right'>
                    {/* <button>NORGE</button> */}
                    {false?
                    <button className='navbar-user-icon'>
                        <img src={userIcon}/>
                    </button>
                    : 
                    <button className='navbar-login-button' onClick={handleclick}>
                        Logg Inn
                    </button>
                    }
                </div>
            </div>
        </div>
    );
}

export default NavBar;