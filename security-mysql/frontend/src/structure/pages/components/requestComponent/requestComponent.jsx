import './requestComponent.css'

import { RequestInfoContext } from '../../../../context';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom'

export default function RequestComponent({id, userGivenName, userSurname, userEmail, userClass, itemSerialNumber, itemToolName}) {
    const accessToken = localStorage.getItem("accessToken");
    const navigate = useNavigate();

    const {setRequestInfo} = useContext(RequestInfoContext);

	async function approveRequest(){
        const response = await fetch("/api/accept-request", {
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                'Authorization': `Bearer ${accessToken}`	
            },
            body:JSON.stringify({
                id:id
            })
        })

        const resData = await response.json();
        if(!response.ok&&resData.message){
            alert(resData.message);
        }
        setRequestInfo(resData.data);
    }

    async function denyRequest(){
        const response = await fetch("/api/accept-request", {
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                'Authorization': `Bearer ${accessToken}`	
            },
            body:JSON.stringify({
                id:id
            })
        })

        const resData = await response.json();
        if(!response.ok&&resData.message){
            alert(resData.message);
        }
        setRequestInfo(resData.data);
    }

	return (
        <div className="requestcomponent-main">
            <div className='requestcomponent-info-container'>
                <div className='requestcomponent-info' onClick={()=>navigate(`/profile/${userEmail}`)}>
                    <p>{userGivenName} {userSurname}</p>
                    <p>{userClass}</p>
                </div>
                <div className='requestcomponent-info' onClick={()=>navigate(`/item/${itemSerialNumber}`)}> 
                    <p>{itemToolName}</p>
                    <p>{itemSerialNumber}</p>
                </div>
            </div>
            <div className='requestcomponent-options-container'>
                <button className='requestcomponent-options apply' onClick={()=>approveRequest()}>APPROVE</button>
                <button className='requestcomponent-options deny' onClick={()=>denyRequest()}>DENY</button>
            </div>
        </div>
	);
}