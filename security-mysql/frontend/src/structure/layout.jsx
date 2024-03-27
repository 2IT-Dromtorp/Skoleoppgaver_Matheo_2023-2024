import {Outlet} from 'react-router-dom';
import './layout.css'

export default function Layout() {
    return (
      <div className='layout-main'>
        <div className='layout-outlet'>
            <Outlet/>
        </div>
      </div>
    );
}