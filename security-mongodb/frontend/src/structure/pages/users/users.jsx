import './users.css'

import { useEffect, useState } from 'react'
import { GetFetch } from '../../functions.jsx';

import UserComponent from '../components/usercomponent/userComponent.jsx';
import { useNavigate } from 'react-router-dom';

import { Link } from 'react-router-dom';

export default function Users() {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);

    useEffect(()=> {
        async function fetchUsers(){
            const response = await GetFetch("/api/getusers", navigate);
            if(!response||!response.ok){
                return;
            }
    
            const data = await response.json();
            setUsers(data.data)  
        }
        
        fetchUsers();
    },[navigate])

    

    return(
        <div className='users-main'>
            <Link className='profile-edit-user-link' to={"/create-user"}>Create a new user</Link>
            {users&&users.map((user, index) => 
                <UserComponent key={index} email={user.email} givenName={user.givenName} surname={user.surname} sclass={user.class}/>
            )}
        </div>
    )
}