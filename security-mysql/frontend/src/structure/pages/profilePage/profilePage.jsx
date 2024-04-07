import './profilePage.css'

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { GetFetch } from '../../functions.jsx';

export default function ProfilePage() {
	const navigate = useNavigate();
    const {email} = useParams();

    const [userInfo, setUserInfo] = useState({});

	useEffect(() => {
        async function fetchData() {
            try {
                const response = await GetFetch(`/api/get-user-info?email=${email}`);
    
                if(response.status===401){
                    navigate("/log-in");
                    return;
                };
                if(response.status===403){
                    alert("You dont have permission to access this site"); //Dette er midlertidig
                    navigate("/");
                    return;
                }
    
                const dataFromFetch = await response.json()

                if (!response.ok) {
                    if(dataFromFetch.message) alert(dataFromFetch.message);
                    return;
                }

                console.log(dataFromFetch.data[0])
    
                setUserInfo(dataFromFetch.data[0]);
            }
            catch (error) {
                console.error(error);
            }
        }
		fetchData();
	}, [])

	return (
	<>{userInfo.givenName&&
        <>
            <h1>{userInfo.givenName} {userInfo.surname}</h1>
            <h2>{userInfo.email}</h2>
            <p>{userInfo.class}</p>
            {userInfo.phone&&<p>{userInfo.phone}</p>}
            {userInfo.address&&<p>{userInfo.address}</p>}

            {userInfo.borrowed.map((item, index)=>
                <p key={index}>{item.tool}</p>
            )}
        </>
	}</>	
	);
}