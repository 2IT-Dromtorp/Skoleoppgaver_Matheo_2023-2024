import '../../css/coursePopUp.css'
import { PopUpCourseContext, ShowPopUpContext, IsLoggedInContext, PopUpContentContext } from '../../context';
import { useEffect, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function CoursePopUp() {
    const navigate = useNavigate()

    const handleClickedEntireDiv = (event) => {
        event.stopPropagation();
    };

    const {popUpContent, setPopUpContent} = useContext(PopUpContentContext);
    const { showPopUp, setShowPopUp } = useContext(ShowPopUpContext);
    const { popUpCourse, setPopUpCourse } = useContext(PopUpCourseContext);
    const {isLoggedIn, setIsLoggedIn} = useContext(IsLoggedInContext);
    const [listOfAllData, setListOfAllData] = useState('')
    const [displayTableTimes, setDisplayTableTimes] = useState([])
    const [userSignedInto, setUserSignedInto] = useState([])
    const [registered, setRegistered] = useState(false)

    useEffect(()=>{
        fetch(`/c?q=${popUpCourse}`, { //Av en eller annen grunn må denne byttes fra tid til annen, bare bytte navnet. Jeg har null peiling på hvorfor
            method: 'GET',
            credentials: 'include',
        })
            .then(async (res) => {
                const data = await res.json();
                if(res.status===300){
                    console.log(data)
                    setListOfAllData(data);

                } else if (res.status===200) {
                    setListOfAllData(data.data);
                    setUserSignedInto(data.signedInto[0].signedInto)
                }
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, [popUpCourse])

    useEffect(()=>{
        if(listOfAllData.length>0){
            for(let i = 0; i<listOfAllData.length; i++){
                addItemTodisplayTableTimes(
                    <tr key={i}>
                        <td>{listOfAllData[i].day}</td>
                        <td>{listOfAllData[i].timeStart}-{listOfAllData[i].timeEnd}</td>
                        <td>{listOfAllData[i].location}</td>
                    </tr>
                )
            }

            // console.log(userSignedInto)
            // console.log(listOfAllData[0].id)
            if(userSignedInto.some(item => item.course === listOfAllData[0].id)){
                setRegistered(true)
            }
        }
    },[listOfAllData, userSignedInto])


    const addItemTodisplayTableTimes = (newItem) => {
        setDisplayTableTimes((prevList) => [...prevList, newItem]);
    };

    function signoff(){
        fetch(`/signoff`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({data:popUpCourse}) 
        })
        .then((res) => {
            if(res.status===422){
                alert('Wrong datatype sent in')
            } else if(res.status===401){
                alert('Not logged in')
            } else if(res.status===401){
                alert('You"re already signed into this course')
            }
            else{
                return res.json()
            }
        })
        .then((data) => {
            if (data !== undefined){
                setShowPopUp(false)
            }
        })
        .catch((error) => console.error(error));
    }

    function signin(){
        fetch(`/signin`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({data:popUpCourse}) 
        })
        .then((res) => {
            if(res.status===422){
                alert('Wrong datatype sent in')
            } else if(res.status===401){
                alert('Not logged in')
            } else if(res.status===401){
                alert('You"re already signed into this course')
            }
            else{
                return res.json()
            }
        })
        .then((data) => {
            if (data !== undefined){
                setShowPopUp(false)
            }
        })
        .catch((error) => console.error(error));
    }

    const myStyle = {
        fontSize: '0.8em',
    };

    if(listOfAllData){
        return ( 
            <div className="course-popup-main" onClick={handleClickedEntireDiv}>
                <div className='course-popup-header'>
                    <p></p>
                    <h1>{listOfAllData[0].courseName}</h1>
                </div>
                <div className='course-popup-times'>
                    <h2>Kurset varer fra uke {listOfAllData[0].weeksOpen} - uke {listOfAllData[0].weeksClosed}</h2>
                    <div className='course-popup-times-table'>
                        <table>
                            <tbody>
                                <tr>
                                    <th>Dag</th>
                                    <th>Klokkeslett</th>
                                    <th>Lokasjon</th>
                                </tr>
                                {displayTableTimes}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className='course-popup-description'>
                    <p>
                    {listOfAllData[0].description}
                    </p>
                </div>
                <div className='course-popup-signup'> 
                {isLoggedIn ? (
                        registered ? (
                            <button onClick={() => signoff()}>Meld deg av</button>
                        ) : (
                            <button onClick={() => signin()}>Meld deg på</button>
                        )
                    ) : (
                        <Link to="log-in" style={myStyle} className='course-popup-signup-link'>Logg inn for å melde deg på</Link>
                    )}
                </div>
            </div>
        )
    } else{
        return <h1>Loading...</h1>;
    }  
    
}

export default CoursePopUp;