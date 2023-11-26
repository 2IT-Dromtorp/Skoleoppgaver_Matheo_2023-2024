import '../css/navbar.css'
import userIcon from '../icons/user.png'
import logo from '../icons/viken.png'
import { ShowPopUpContext, PopUpContentContext, IsLoggedInContext } from '../context';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function NavBar() {
    const navigate = useNavigate()

    const { showPopUp, setShowPopUp } = useContext(ShowPopUpContext);
    const {popUpContent, setPopUpContent} = useContext(PopUpContentContext);
    const {isLoggedIn, setIsLoggedIn} = useContext(IsLoggedInContext);

    const handleclick = ()=>{
        setShowPopUp(true)
        setPopUpContent('login')
    }

    const logoutclick = ()=>{
        fetch(`/logout`, {
            method: 'GET',
            credentials: 'include',
        })
            .then(async (res) => {
                const data = await res.json();
                console.log(data)
                setShowPopUp(true)
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }

    return (
        <div className='navbar-main'>
            <div className='navbar-a'>
                <div className='navbar-left'>
                    <button onClick={() => navigate("/")}>
                        <img src={logo}/>
                    </button>
                </div>
                <div className='navbar-right'>
                    {/* <button>NORGE</button> */}
                    {isLoggedIn?
                    <button className='navbar-user-icon' onClick={logoutclick}>
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