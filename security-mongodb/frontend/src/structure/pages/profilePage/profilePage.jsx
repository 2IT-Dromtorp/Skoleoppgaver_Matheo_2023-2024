import './profilePage.css'

import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { GetFetch } from '../../functions.jsx';
import { Profile } from '../../../svg.jsx';
import ItemComponent from '../components/itemComponent.jsx';
import KinComponent from '../components/kinComponent/kinComponent.jsx';

export default function ProfilePage() {
	const navigate = useNavigate();
    const {email} = useParams();

    const [userInfo, setUserInfo] = useState({});

	useEffect(() => {
        async function fetchData() {
            try {
                const response = await GetFetch(`/api/get-user-info?email=${email}`, navigate);
    
                const dataFromFetch = await response.json()

                if (!response.ok) {
                    if(dataFromFetch.message) alert(dataFromFetch.message);
                    return;
                }
    
                setUserInfo(dataFromFetch.data[0]);
            }
            catch (error) {
                console.error(error);
            }
        }
		fetchData();
	}, [email, navigate])

	return (
	<>{userInfo.givenName?
        <div className='profile-main'>

            <Link to={`/edit-user/${email}`} className='profile-edit-user-link'>Edit user</Link>

            <div className='profile-info'>
                {true?
                    <Profile className="profile-picture"/>
                :
                    <Profile/>
                }

                <div className='profile-main-info'>
                    <p className='profile-name'>{userInfo.givenName} {userInfo.surname}</p>
                    <p className='profile-class'>{userInfo.class}</p>
                </div>
                
                <div className='profile-sec-info'>
                    <p>{userInfo.email}@viken.no</p>
                    {userInfo.phone&&<p>{userInfo.phone}</p>}
                    {userInfo.address&&<p>{userInfo.address}</p>}
                </div>

                {userInfo.kin.length?<div className='profile-family'>
                    <p>Family members:</p>
                    {userInfo.kin.length&&userInfo.kin.map((member, index) => 
                        <KinComponent key={index} name={member.name} address={member.address} phonenumber={member.phone} email={member.email}/>
                    )}
                </div>:""}
            </div>
            
            <div className='profile-loaned'>
                {userInfo.borrowed.map((item, index)=>
                    <ItemComponent key={index} tool={item.tool} serialNumber={item.serialNumber}/>
                )}
            </div>
        </div>
	:
    "Loading..."
    }</>	
	);
}