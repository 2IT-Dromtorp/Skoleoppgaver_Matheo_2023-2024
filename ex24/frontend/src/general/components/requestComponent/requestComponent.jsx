import './index.css';

export default function RequestComponent({firstName, lastname, email, yearBorn, sports, setData}){
 
    async function answerIsAccept(answer){
        let query = "";
        if(answer) query = "/api/accept-request"
        else query = "/api/deny-request"
        
        const response = await fetch(query, {
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                "authorization":`Bearer ${localStorage.getItem("accessToken")}`
            },
            body:JSON.stringify({
                email,
                sports
            })
        })
     
        const resData=await response.json();
        if(!response.ok) return alert(resData);
        console.log(resData)
        setData(resData);
    }
    
     
    return(
        <div className="request-component-main">
            <p className='request-component-name'>{firstName} {lastname}</p>
            <p>{email}</p>
            <p>Født den {yearBorn}</p>
            <p className='request-component-name'>{sports[0].toUpperCase()+sports.substring(1)}</p>

            <div className="request-component-options-container">
                <button onClick={()=>answerIsAccept(true)} className='request-component-option accept-button'>Godkjenn</button>
                <button onClick={()=>answerIsAccept(false)} className='request-component-option deny-button'>Avslå</button>
            </div>
        </div>
    )
}