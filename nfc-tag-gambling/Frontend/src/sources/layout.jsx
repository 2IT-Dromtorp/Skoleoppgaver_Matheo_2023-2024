import '../css/layout.css'
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className='layout-main'>
      <Outlet/>
    </div>
  );
}