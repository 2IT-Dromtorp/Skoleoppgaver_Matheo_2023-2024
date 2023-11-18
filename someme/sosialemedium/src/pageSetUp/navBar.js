import '../css/main.css'
import  '../css/navbar.css'
import { Link } from 'react-router-dom';

function NavBar() {
    return (
        <>
            <div className='side-nav-bar'>
                <div className='contain-nav-bar-objects'>
                    <div className='nav-bar-object'>
                        <Link to='/'>Home</Link>
                    </div>
                    <div className='nav-bar-object'>
                        <Link to='/search'>Search</Link>    
                    </div>
                    <div className='nav-bar-object'>
                        <Link to='/posts'>Posts</Link>
                    </div>
                    <div className='nav-bar-object'>
                        <Link to='/messages'>Messages</Link>
                    </div>
                    <div className='nav-bar-object'>
                        <Link to='/profile'>Profile</Link>
                    </div>
                </div>
                <div className='nav-bar-object'>
                    <Link to='/settings'>Settings</Link>
                </div>
            </div>
        </>
    );
}

export default NavBar;