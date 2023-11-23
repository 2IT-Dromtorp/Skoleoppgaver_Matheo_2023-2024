import { useContext, useEffect, useState } from 'react';
import '../../css/homesite.css'
import MiniDisplayCourse from '../components/miniDisplayCourse';

function Homesite() {
    const [listOfInfo, setListOfInfo] = useState('')
    const [listOfComponents, setListOfComponents] = useState([])

    useEffect(() => {
        fetch(`/getdata`, {
            method: 'GET',
            credentials: 'include',
        })
            .then(async (res) => {
                const data = await res.json();
                setListOfInfo(data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const addItemToListOfComponents = (newItem) => {
        setListOfComponents((prevList) => [...prevList, newItem]);
    };

    useEffect(() =>{
        if(listOfInfo!==false){
            for (let i = 0; i < listOfInfo.length; i++){
                addItemToListOfComponents(<MiniDisplayCourse key={i} id={listOfInfo[i].id} courseName={listOfInfo[i].courseName} pictureAddress={listOfInfo[i].pictureAddress} timeStart={listOfInfo[i].timeStart} day={listOfInfo[i].day} timeEnd={listOfInfo[i].timeEnd}/> );
            }
        }
    }, [listOfInfo])

    return (
        <div className='homesite-main'>
            <div className='homesite-display-name'>
                <h1>
                    Kurs for godt voksne
                </h1>
            </div>
            <div className='homesite-course-container'>
                {listOfComponents}
            </div>
        </div>
    );
}

export default Homesite;