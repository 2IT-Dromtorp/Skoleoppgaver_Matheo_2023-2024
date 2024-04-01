import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function ItemPage() {
	const serialnumber = useParams().serialnumber;

	const [itemInfo, setItemInfo] = useState([]);

	async function fetchData() {
		try {
			const response = await fetch(`/api/item-info?serialnumber=${serialnumber}`);

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
		const email = "jlorgkr" //per nå har jeg enda ikke ordnet hvordan jeg skal gjøre dette. orker ikke
		try {
			const response = await fetch("/api/borrow-request",{
                method:"POST",
                headers: {
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({
                    email:email,
                    serialnumber:serialnumber
                })
            });


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