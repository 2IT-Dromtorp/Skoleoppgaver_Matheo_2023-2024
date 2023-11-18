import '../css/main.css'
import  '../css/navbar.css'
import { Link } from 'react-router-dom';
import houseSymbol from '../icons/house.png'
import searchSymbol from '../icons/search.png'
import messageSymbol from '../icons/message.png'
import userSymbol from '../icons/user.png'
import settingsSymbol from '../icons/settings.png'


function NavBar() {
    return (
        <>
            <div className='side-nav-bar'>
                <div className='contain-nav-bar-objects'>
                        <Link to='/'><h1>Solan</h1></Link>
                    <div className='nav-bar-object'>
                        <Link to='/'><img src={houseSymbol}/>Home</Link>
                    </div>
                    <div className='nav-bar-object'>
                        <Link to='/search'><img src={searchSymbol}/>Search</Link>    
                    </div>
                    <div className='nav-bar-object'>
                        <Link to='/posts'>Posts</Link>
                    </div>
                    <div className='nav-bar-object'>
                        <Link to='/messages'><img src={messageSymbol}/>Messages</Link>
                    </div>
                    <div className='nav-bar-object'>
                        <Link to='/profile'><img src={userSymbol}/>Profile</Link>
                    </div>
                </div>
                <div className='nav-bar-object'>
                    <Link to='/settings'><img src={settingsSymbol}/>Settings</Link>
                </div>
            </div>
        </>
    );
}

export default NavBar;