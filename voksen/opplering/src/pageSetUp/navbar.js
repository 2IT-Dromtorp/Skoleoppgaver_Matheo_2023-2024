import '../css/navbar.css'
import userIcon from '../icons/user.png'

function NavBar() {
    return (
        <div className='navbar-main'>
            <div className='navbar-a'>
                <div className='navbar-left'>

                </div>
                <div className='navbar-right'>
                    <button>NORGE</button>
                    <button className='navbar-user-icon'>
                        <img src={userIcon}/>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default NavBar;