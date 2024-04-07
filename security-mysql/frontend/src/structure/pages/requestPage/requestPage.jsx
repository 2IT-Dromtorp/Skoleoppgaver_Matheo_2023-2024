import './requestPage.css'

import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { RequestInfoContext } from '../../../context.js'

import { GetFetch } from '../../functions.jsx';
import RequestComponent from "../components/requestComponent/requestComponent.jsx";

export default function RequestPage() {
	const navigate = useNavigate();

	const {requestInfo, setRequestInfo} = useContext(RequestInfoContext);

	

	useEffect(() => {
        async function fetchData() {
            try {
                const response = await GetFetch(`/api/get-requests`);
    
                if(response.status===401){
                    navigate("/log-in");
                    return;
                };
                if(response.status===403){
                    alert("You dont have permission to access this site"); //Dette er midlertidig
                    navigate("/");
                    return;
                }
    
                if (!response.ok) {
                    const responseData = await response.json();
                    if(responseData.message) alert(responseData.message);
                    return;
                }
    
                const dataFromFetch = (await response.json()).data;
                setRequestInfo(dataFromFetch);
            }
            catch (error) {
                console.error(error);
            }
        }
		fetchData();
	}, [])

	// Jeg skal også legge til at om man er logget inn som en lærer skal man kunne se hvem som har lånt ting, men orker ikke gjøre det nå
	return (
	<>{requestInfo.length&&
		<div className="requestpage-main">
            {requestInfo.map((request, index) => 
                <RequestComponent key={index} setRequestInfo={()=>setRequestInfo()} id={request.ranId} userGivenName={request.user.givenName} userSurname={request.user.surname} userEmail={request.user.emailOfUser} userClass={request.user.class} itemSerialNumber={request.item.serialNumberOfItem} itemToolName={request.item.toolOfItem}/>
            )}
		</div>
	}</>	
	);
}