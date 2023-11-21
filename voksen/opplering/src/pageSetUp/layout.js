import { Outlet } from 'react-router-dom';
import NavBar from './navbar.js';
import '../css/layout.css'
import '../css/values.css'


function Layout() {
    return (
        <div className='content_box'>
            <NavBar/>
            <main className='main_content'>
                <Outlet/>
            </main>
        </div>
    );
}

export default Layout;