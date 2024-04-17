import './editItem.css';

import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { GetFetch } from '../../functions'

export default function EditItem() {
    const { serialnumber } = useParams();
    const navigate = useNavigate();

    const [serialNumberFromFetch, setSerialnumber] = useState("");
    const [tool, setTool] = useState("");
    const [imgUrl, setImgUrl] = useState("");
    const [extraInfo, setExtraInfo] = useState("");

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await GetFetch(`/api/item-edit-info?serialnumber=${serialnumber}`, navigate);

                if (!response.ok) {
                    const responseData = await response.json();
                    alert(responseData.message);
                    return;
                }

                const dataFromFetch = (await response.json());
                const data = dataFromFetch.data[0];

                setSerialnumber(data.serialNumber)
                setTool(data.tool);
                setImgUrl(data.imgUrl);
                setExtraInfo(data.extraInfo);
            }
            catch (error) {
                console.error(error);
            }
        }

        fetchData();
    }, [serialnumber]);

    async function updateItem(e) {
        e.preventDefault();
        const accessToken = localStorage.getItem("accessToken");
        const response = await fetch("/api/edit-item", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify({
                oldSerial: serialnumber,
                serialnumber: serialNumberFromFetch,
                tool: tool,
                extraInfo: extraInfo,
                imgUrl: imgUrl
            })
        });

        if (!response.ok) {
            if (response.status === 401) return navigate("/log-in")
            if (response.status === 403) {
                alert("You don't have access to this command")
                return navigate("/");
            }
            return;
        }
        navigate(`/item/${serialNumberFromFetch}`);
    }

    return (
        <>
            {serialNumberFromFetch&&tool&&imgUrl&&extraInfo ?

                <>
                    <form className='new-item-new-item-form' onSubmit={(e) => updateItem(e)}>
                        <input type='text' className='new-item-input-field' placeholder='Serialnumber' required={true} value={serialNumberFromFetch} onChange={(e) => setSerialnumber(e.target.value)} />
                        <input type='text' className='new-item-input-field' placeholder='Name' required={true} value={tool} onChange={(e) => setTool(e.target.value)} />
                        <textarea rows={4} cols={50} className='new-item-text-area' placeholder='Description' value={extraInfo} onChange={(e) => setExtraInfo(e.target.value)} />
                        <input type='text' className='new-item-input-field' placeholder='ImageURL' value={imgUrl} onChange={(e) => setImgUrl(e.target.value)} />
                        <button type='submit' className='new-item-form-submit-button edititem-save-button'>Save changes</button>
                        <Link to={`/item/${serialNumberFromFetch}`} className='new-item-form-submit-button edititem-discard-button'>Discard Changes</Link>
                    </form>
                </>

        : "Loading..."}</>
    )
}