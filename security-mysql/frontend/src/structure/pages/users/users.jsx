import './users.css'

import { useEffect, useState } from 'react'
import { GetFetch } from '../../functions.jsx';

import UserComponent from '../components/usercomponent/userComponent.jsx';

export default function Users() {
    const [users, setUsers] = useState([]);

    useEffect(()=> {
        fetchUsers();
    },[])

    async function fetchUsers(){
        const response = await GetFetch("/api/getusers");
        const data = await response.json();
        setUsers(data.data)  
    }

    return(
        <div className='users-main'>
            {users&&users.map((user, index) => 
                <UserComponent key={index} email={user.email} givenName={user.givenName} surname={user.surname} sclass={user.class}/>
            )}
        </div>
    )
}