import './userComponent.css'

import { Link } from 'react-router-dom'

export default function UserComponent({givenName, surname, email, sclass}) {
    return(
        <Link to={`/profile/${email}`} className='usercomponent-main'>
            <h1>{givenName} {surname}</h1>
            <div className="usercomponent-bottom-text">
                <p>{email}@viken.no</p>
                <p>{sclass}</p>
            </div>
        </Link>
    )
}