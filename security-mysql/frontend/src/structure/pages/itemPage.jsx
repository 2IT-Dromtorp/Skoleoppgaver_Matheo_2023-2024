import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { GetFetch } from '../functions.jsx';

export default function ItemPage() {
	const navigate = useNavigate();
	const serialnumber = useParams().serialnumber;

	const [itemInfo, setItemInfo] = useState([]);

	async function fetchData() {
		try {
			const response = await GetFetch(`/api/item-info?serialnumber=${serialnumber}`);

			if(response.status===401){
				navigate("/log-in")
			} 

			if (!response.ok) {
				const responseData = await response.json();
				alert(responseData.message);
				return;
			}

			const dataFromFetch = (await response.json()).data;
			setItemInfo(dataFromFetch);
		}
		catch (error) {
			console.error(error);
		}
	}

	useEffect(() => {
		fetchData();
	}, [serialnumber])

	async function borrowItem(){
		try {
			const accessToken = localStorage.getItem("accessToken");
			const response = await fetch("/api/borrow-request",{
                method:"POST",
                headers: {
                    "Content-Type":"application/json",
					'Authorization': `Bearer ${accessToken}`	
                },
                body: JSON.stringify({
                    serialnumber:serialnumber
                })
            });


			if (!response.ok) {
				const responseData = await response.json();
				alert(responseData.message);
				return;
			}

			alert("Your item request was registered");
		}
		catch (error) {
			console.error(error);
		}
	}

	// Jeg skal også legge til at om man er logget inn som en lærer skal man kunne se hvem som har lånt ting, men orker ikke gjøre det nå
	return (
	<>{itemInfo.length&&
		<div className="itempage-main">
			<h1>{itemInfo[0].tool}</h1>
			<h2>{itemInfo[0].serialNumber}</h2>
			<p>{itemInfo[0].extraInfo}</p>

			{itemInfo[0].borrowedBy?
				<p>Someone has already borrowed this item</p>
			:
				<button onClick={()=>borrowItem()}>Borrow</button>
			}
		</div>
	}</>	
	);
}