import './itempage.css'

import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { GetFetch } from '../../functions.jsx';
import { EmailContext } from '../../../context.js'

export default function ItemPage() {
	const navigate = useNavigate();
	const serialnumber = useParams().serialnumber;

	const [itemInfo, setItemInfo] = useState([]);
	const { email } = useContext(EmailContext);

	async function fetchData() {
		try {
			const response = await GetFetch(`/api/item-info?serialnumber=${serialnumber}`);

			if (response.status === 401) {
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

	async function borrowItem() {
		try {
			const accessToken = localStorage.getItem("accessToken");
			const response = await fetch("/api/borrow-request", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					'Authorization': `Bearer ${accessToken}`
				},
				body: JSON.stringify({
					serialnumber: serialnumber
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

	async function returnItem() {
		try {
			const accessToken = localStorage.getItem("accessToken");
			const response = await fetch("/api/returnitem", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					'Authorization': `Bearer ${accessToken}`
				},
				body: JSON.stringify({
					email: email,
					serialnumber: serialnumber
				})
			})

			if (!response.ok) {
				return;
			}
			const resdata = await response.json();
			setItemInfo(resdata.data)
		}
		catch (error) {
			console.error(error);
		}
	}

	return (
		<>{itemInfo.length ?
			<div className="itempage-main">
				<h1>{itemInfo[0].tool}</h1>
				<h2>Serial number: {itemInfo[0].serialNumber}</h2>
				<p>{itemInfo[0].extraInfo}</p>

				{itemInfo[0].borrowedBy ?
					(
						<>
							{itemInfo[0].borrowedBy === "This user" ?

								<>
									<p>{itemInfo[0].borrowedBy} has already borrowed this item</p>
									<button onClick={() => returnItem()} className='itempage-borrow-button itempage-return-button'>Return</button>
								</>

								:

								<p>{itemInfo[0].borrowedBy} has already borrowed this item</p>

							}

						</>

					)
					:
					<button onClick={() => borrowItem()} className='itempage-borrow-button'>Borrow</button>
				}
			</div>
			: "Loading..."}</>
	);
}