import { useState } from 'react';
import './createNewItem.css'

import { useNavigate } from 'react-router-dom'

export default function CreateNewItem() {
    const navigate = useNavigate();
    const [serialnumber, setSerialnumber] = useState("");
    const [tool, setTool] = useState("");
    const [extraInfo, setExtraInfo] = useState("");
    const [imgUrl, setImgUrl] = useState("");

    async function createItem(e){
        e.preventDefault();
        const accessToken = localStorage.getItem("accessToken");
        const response = await fetch("/api/create-item", {
            method: "POST",
            headers:{
                "Content-Type":"application/json",
                'Authorization': `Bearer ${accessToken}`	
            },
            body:JSON.stringify({
                serialnumber:serialnumber,
                tool:tool,
                extraInfo:extraInfo,
                imgUrl:imgUrl
            })
        });

        if(!response.ok) {
            if(response.status===401) return navigate("/log-in")
            if(response.status===403){
                alert("You don't have access to this command")
                return navigate("/");
            } 
            return;
        }
        alert("Your item was added");
        navigate("/");
    }

    return(
        <div className='new-item-main'>
            <form className='new-item-new-item-form' onSubmit={(e)=>createItem(e)}>
                <input type='text' className='new-item-input-field' placeholder='Serialnumber' required={true} value={serialnumber} onChange={(e)=>setSerialnumber(e.target.value)}/>
                <input type='text' className='new-item-input-field' placeholder='Name' required={true} value={tool} onChange={(e)=>setTool(e.target.value)}/>
                <textarea rows={4} cols={50} className='new-item-text-area' placeholder='Description' value={extraInfo} onChange={(e)=>setExtraInfo(e.target.value)}/>
                <input type='text' className='new-item-input-field' placeholder='ImageURL' value={imgUrl} onChange={(e)=>setImgUrl(e.target.value)}/>
                <button type='submit' className='new-item-form-submit-button'>Create item</button>
            </form>
        </div>
    )
}