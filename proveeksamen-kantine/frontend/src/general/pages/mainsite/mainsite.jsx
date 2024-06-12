import { useEffect } from 'react'
import './mainsite.css'

import axios from 'axios'

export default function MainSite() {
    
    useEffect(()=>{
        async function fetchdata(){
            const response = axios.get("/api/")
        }
        fetchdata();
    },[])

    return(
        <div className="mainsite-main">
            <h1>Produkter</h1>
        </div>
    )
}