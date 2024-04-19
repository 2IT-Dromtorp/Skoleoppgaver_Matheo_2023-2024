import './itempage.css'

import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

import { GetFetch } from '../../functions.jsx';
import { EmailContext, SchoolclassContext } from '../../../context.js'

export default function ItemPage() {
	const navigate = useNavigate();
	const serialnumber = useParams().serialnumber;

	const [itemInfo, setItemInfo] = useState([]);

	const { email } = useContext(EmailContext);
	const { schoolclass } = useContext(SchoolclassContext);

	useEffect(() => {
		async function fetchData() {
			try {
				const response = await GetFetch(`/api/item-info?serialnumber=${serialnumber}`, navigate);

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

		fetchData();
	}, [serialnumber,navigate])

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
				if (response.status === 409) {
					alert("You have already submitted a request for this item");
				}
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
			setItemInfo(resdata.data);
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


				{itemInfo[0].imgUrl ?
					<img src={itemInfo[0].imgUrl} alt='' className='itempage-image'/>
					: false}

				<div className='itempage-bottom-buttons'>
					{schoolclass==="LAERER"&&itemInfo[0].borrowedBy !== "This user"?
						<EditButton serialNumber={serialnumber}/>
					:""}
					{itemInfo[0].borrowedBy ?
						(
								itemInfo[0].borrowedBy === "This user" ?

									<div className='itempage-return-container'>
										<p>{itemInfo[0].borrowedBy} has already borrowed this item</p>
										<div className='itempage-return-container-button-container'>
											{schoolclass==="LAERER"?
												<EditButton serialNumber={serialnumber}/>
											:""}
											<button onClick={() => returnItem()} className='itempage-borrow-button itempage-return-button'>Return</button>
										</div>
									</div>

									:

									<p className='otherUserBorrowed'>{itemInfo[0].borrowedBy} has already borrowed this item</p>

						)
						:
						<button onClick={() => borrowItem()} className='itempage-borrow-button'>Borrow</button>
					}
				</div>

			</div>
			
			:"Loading..."}</>
	);
}

function EditButton({serialNumber}){

	return(
		<Link className='itempage-borrow-button' to={`/edit-item/${serialNumber}`}>Edit</Link>
	)
}