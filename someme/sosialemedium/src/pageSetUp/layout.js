import '../css/main.css'
import { Outlet } from 'react-router-dom';
import NavBar from './navBar';

function Layout() {
    return (
        <>
            <div className='content_box'>
                <NavBar/>
                <main className='main_content'>
                    <Outlet />
                </main>
            </div>
        </>
    );
}

export default Layout;