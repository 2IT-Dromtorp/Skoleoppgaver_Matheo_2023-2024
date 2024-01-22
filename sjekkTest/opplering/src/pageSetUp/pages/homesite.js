import { useContext, useEffect, useState } from 'react';
import '../../css/homesite.css'
import MiniDisplayCourse from '../components/miniDisplayCourse';
import { ShowPopUpContext, IsLoggedInContext } from '../../context.js';


function Homesite() {
    const [listOfInfo, setListOfInfo] = useState('')
    const [coursesSigned, setCoursesSigned] = useState('')
    const {isLoggedIn, setIsLoggedIn} = useContext(IsLoggedInContext);
    const [listOfComponentsNotIn, setListOfComponentsNotIn] = useState([])
    const [listOfComponentsIn, setListOfComponentsIn] = useState([])
    const { showPopUp, setShowPopUp } = useContext(ShowPopUpContext);


    useEffect(() => {
        if(showPopUp===false){
            fetch(`/getdata`, {
                method: 'GET',
                credentials: 'include',
            })
                .then(async (res) => {
                    const data = await res.json();
                    if(listOfInfo.length!==data.length && res.status===202){
                        setListOfInfo(data);
                        setIsLoggedIn(false)
                    } else if (listOfInfo.length!==data.length && res.status===200){
                        setCoursesSigned(data.courses[0].signedInto);
                        setIsLoggedIn(true);
                        setListOfInfo(data.results);
                    }
                })
                .catch((error) => {
                    console.error('Error fetching data:', error);
                });
        }   
    }, [showPopUp])

    const addItemTolistOfComponentsNotIn = (newItem) => {
        setListOfComponentsNotIn((prevList) => [...prevList, newItem]);
    };

    const addItemTolistOfComponentsIn = (newItem) => {
        setListOfComponentsIn((prevList) => [...prevList, newItem]);
    };

    useEffect(() =>{
        if(listOfInfo!==false && isLoggedIn===false){
            for (let i = 0; i < listOfInfo.length; i++){
                addItemTolistOfComponentsNotIn(<MiniDisplayCourse key={i} id={listOfInfo[i].id} courseName={listOfInfo[i].courseName} pictureAddress={listOfInfo[i].pictureAddress} timeStart={listOfInfo[i].timeStart} day={listOfInfo[i].day} timeEnd={listOfInfo[i].timeEnd}/> );
            }
        } else if(listOfInfo!==false && isLoggedIn!==false){
            setListOfComponentsNotIn([])
            setListOfComponentsIn([])
            for (let i = 0; i < listOfInfo.length; i++) {
                if (coursesSigned.some(item => item.course === listOfInfo[i].id)) {
                    addItemTolistOfComponentsIn(<MiniDisplayCourse key={i} id={listOfInfo[i].id} courseName={listOfInfo[i].courseName} pictureAddress={listOfInfo[i].pictureAddress} timeStart={listOfInfo[i].timeStart} day={listOfInfo[i].day} timeEnd={listOfInfo[i].timeEnd} />);
                } else {
                    addItemTolistOfComponentsNotIn(<MiniDisplayCourse key={i} id={listOfInfo[i].id} courseName={listOfInfo[i].courseName} pictureAddress={listOfInfo[i].pictureAddress} timeStart={listOfInfo[i].timeStart} day={listOfInfo[i].day} timeEnd={listOfInfo[i].timeEnd} />);
                }
            }
           
        } 
    }, [listOfInfo])

    const [myStyle, setMyStyle] = useState({
        width: '100%',
    })

    useEffect(()=>{
        if (window.innerWidth < 601 && myStyle==="{width: '100%'}"){
            setMyStyle({
                width: '66%',
            })
        }
    }, [myStyle])

    

    return (
        <div className='homesite-main'>
            <div className='homesite-display-name'>
                <h1>
                    Kurs for godt voksne
                </h1>
                <p>Vi er stolte over å kunne tilby følgende kurs gratis til dere i aldersgruppen 40-60 år</p>
            </div>
            <div className="homepage-container">
                {isLoggedIn?
                <>
                    <div className='homesite-course-in'>
                        <h3 className='homesite-course-info'>Påmeldte kurs</h3>
                        {listOfComponentsIn}
                    </div>
                    <div className='homesite-course-container' style={myStyle}>
                        <h3 className='homesite-course-info'>Tilgjengelige kurs</h3>
                        {listOfComponentsNotIn}
                    </div> 
                </> 
                :
                <div className='homesite-course-container'>
                    {listOfComponentsNotIn}
                </div>
                }
                
            </div>
        </div>
    );
}

export default Homesite;