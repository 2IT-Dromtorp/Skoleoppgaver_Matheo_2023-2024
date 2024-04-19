import './profilePage.css'

import { useEffect, useState, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { GetFetch } from '../../functions.jsx';
import { Profile, Exit } from '../../../svg.jsx';
import ItemComponent from '../components/itemComponent.jsx';
import KinComponent from '../components/kinComponent/kinComponent.jsx';

import { EmailContext } from '../../../context.js';

export default function ProfilePage() {
	const navigate = useNavigate();
    const {emaila} = useParams();

    const [userInfo, setUserInfo] = useState({});

    const {email} = useContext(EmailContext);

	useEffect(() => {
        async function fetchData() {
            try {
                const response = await GetFetch(`/api/get-user-info?email=${emaila}`, navigate);
    
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
	}, [emaila, navigate])

	return (
	<>{userInfo.givenName?
        <div className='profile-main'>

            <Link to={`/edit-user/${emaila}`} className='profile-edit-user-link'>Edit user</Link>

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

                {userInfo.kin&&userInfo.kin.length?<div className='profile-family'>
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

            {email===emaila?<Link className='profile-log-out-button' to={"/log-in"}>Log out<Exit className="profile-log-out-svg"/></Link>:""}
        </div>
	:
    "Loading..."
    }</>	
	);
}