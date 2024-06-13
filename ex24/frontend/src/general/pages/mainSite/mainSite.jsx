import { useEffect, useState } from 'react';
import './index.css';

import { Link } from 'react-router-dom';
import SportComponent from '../../components/sportComponent/sportComponent';

export default function MainSite(){
    const [offers, setOffers] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(()=>{
        async function fetchdata(){
            const response = await fetch("/api/get-sports");
            const resData = await response.json();
            setOffers(resData);

            const checkIfAdmin = await fetch("/api/check-if-admin",{
                method:"GET",
                headers:{
                    "Authorization":`Bearer ${localStorage.getItem("accessToken")}`
                }
            });
            setIsAdmin(checkIfAdmin.ok);
        }
        fetchdata();
    },[]);

    return(
        <div className='mainsite-main'>
            <h1 className='mainsite-main-header'>Ball IL</h1>
            <p className='mainsite-ball-desc'>Ball idrettslag er en stor breddeklubb med fokus på å tilby så mange idretter som mulig, til så mange som mulig</p>

            <div  className='mainsite-content-holder'>
                <Link to={"/tournaments"} className='mainsite-link-to-tour'>Turneringer</Link>
                <Link to={localStorage.getItem("accessToken")?"/my-page":"/login"} className='mainsite-link-to-tour'>Min side</Link>
                {isAdmin?<Link to={"/create/sport"} className='mainsite-link-to-tour'>Lag et nytt lag</Link>:""}
                {isAdmin?<Link to={"/requests"} className='mainsite-link-to-tour'>Søknader</Link>:""}
            </div>

            <p className='mainsite-offer-text'>Meld deg på ett av våre tilbud:</p>
            <div className='mainsite-offer-container'>
                {offers.length&&offers.map((offer, index) => 
                    <SportComponent key={index} name={offer.name} fullname={offer.fullName} img={offer.img}/>
                )}
            </div>
        </div>
    )
}