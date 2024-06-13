import './index.css';

import { useState, useEffect } from "react";
import {useNavigate} from 'react-router-dom';

import RequestComponent from "../../components/requestComponent/requestComponent";

export default function RequestHandlePage(){
    const navigate = useNavigate();
 
    const [requests, setRequests] = useState([]);
     
    useEffect(()=>{
        async function fetchdata(){
            const response = await fetch("/api/get-requests",{
                method:"GET",
                headers:{
                    "authorization":`Bearer ${localStorage.getItem("accessToken")}`
                }
            });
            const resData = await response.json();
            if(response.status === 403) return navigate("/login");
            if(!response.ok) return alert(resData);
            console.log(resData)
            setRequests(resData);
        }
        fetchdata()
    },[]);
     
    return(
    <>{requests&&requests.length?<div className='request-handler-main'>
     
    <div className="request-handler-container">
        {requests.map((request,index) =>
            <RequestComponent key={index} firstName={request.firstName} lastname={request.lastname} email={request.email} yearBorn={request.yearBorn} sports={request.sports} setData={setRequests}/>
        )}
    </div>
    </div>:"Det er ingen ubesvarte søknader"}</>
    )
    }