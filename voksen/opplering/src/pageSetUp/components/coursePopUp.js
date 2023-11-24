import '../../css/coursePopUp.css'
import { PopUpCourseContext } from '../../context';
import { useEffect, useContext, useState } from 'react';


function CoursePopUp() {
    const handleClickedEntireDiv = (event) => {
        event.stopPropagation();
    };

    const { popUpCourse, setPopUpCourse } = useContext(PopUpCourseContext);
    const [listOfAllData, setListOfAllData] = useState('')

    useEffect(()=>{
        console.log(popUpCourse)
        fetch(`/getcourseinfo?q=${popUpCourse}`, {
            method: 'GET',
            credentials: 'include',
        })
            .then(async (res) => {
                const data = await res.json();
                setListOfAllData(data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, [popUpCourse])

    if(listOfAllData[0]){
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
                    <button>Meld deg på</button>
                </div>
            </div>
        )
    }   else{
        return <h1>HEI</h1>
    }
    
    
}

export default CoursePopUp;