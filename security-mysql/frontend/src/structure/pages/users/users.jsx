import './users.css'

import { useEffect, useState } from 'react'
import { GetFetch } from '../../functions.jsx';

import UserComponent from '../components/usercomponent/userComponent.jsx';
import { useNavigate } from 'react-router-dom';

export default function Users() {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);

    useEffect(()=> {
        fetchUsers();
    },[])

    async function fetchUsers(){
        const response = await GetFetch("/api/getusers", navigate);
        if(!response||!response.ok){
            return;
        }

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