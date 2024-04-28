import './allLoans.css'
import { useEffect, useState } from 'react'
import { GetFetch } from '../../functions'
import { useNavigate } from 'react-router-dom';
import LoanComponent from '../components/loanComponent/loanComponent';

export default function AllLoans() {
    const navigate = useNavigate();
    const [loans, setLoans] = useState([]);

    useEffect(()=> {
        async function fetchData(){
            const response = await GetFetch("/api/get-all-loans",navigate)
            if(!response.ok){
                return;
            }

            const data = await response.json();
            setLoans(data.data);
        }

        fetchData();
    })
    
    return(
        <>
            {loans.length?<div className='allloans-main'>
                {loans.map((loan,index)=>
                    <LoanComponent key={index} user={loan.user} item={loan.item} loanStartTime={loan.loanStartTime} loanEndTime={loan.loanEndTime}/>
                )}
            </div>:"Loading..."}
        </>
    )
}