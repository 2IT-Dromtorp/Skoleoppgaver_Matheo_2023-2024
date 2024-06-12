import './index.css';

import { Link } from "react-router-dom"

export default function SportComponent({name, fullname, img}){

    return(
        <Link to={`/${name}/join`} className='sport-component-main'>
            <p>{fullname}</p>
            <img alt='' src={img} className='sport-component-image'/>
            <p className='sport-component-read-more'>Les mer</p>
        </Link>
    )
}