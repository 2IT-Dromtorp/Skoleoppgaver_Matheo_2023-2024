import './leader.css';

import { CircleUser } from 'lucide-react'

export default function Leader({name, phone, email}){

    return(
        <>
            <CircleUser size={100} strokeWidth={1.75} />
            <p className='leader-name'>{name}</p>
            <p>{phone}</p>
            <p>{email}</p>
        </>
    )
}