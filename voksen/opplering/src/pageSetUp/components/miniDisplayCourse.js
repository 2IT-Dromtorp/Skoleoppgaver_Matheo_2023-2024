import '../../css/miniDisplayCourse.css'
import { useState, useContext } from 'react';
import { ShowPopUpContext, PopUpContentContext, PopUpCourseContext } from '../../context';

function MiniDisplayCourse({id, courseName, pictureAddress, timeStart, day, timeEnd}) {
    const { showPopUp, setShowPopUp } = useContext(ShowPopUpContext);
    const { popUpContent, setPopUpContent } = useContext(PopUpContentContext);
    const { popUpCourse, setPopUpCourse } = useContext(PopUpCourseContext);

    const handleclick = ()=>{
        setShowPopUp(true)
        setPopUpContent('course')
        setPopUpCourse(id)
    }

    const myStyle = {
        fontSize: '1.2em',
    };

    const checkIfNameTooLong = courseName.length>15

    return (
        <div className="Mini-view-course-main" onClick={handleclick}>
            <div className='mini-view-course-picture'>
                <img src={pictureAddress}/>
            </div>
            <div className='mini-view-course-header'>
                {checkIfNameTooLong?
                <h1 style={myStyle}>
                    {courseName}
                </h1>:
                <h1>
                    {courseName}
                </h1>}
            </div>
            <div className='mini-view-course-description'>
                <h3>
                    {day} Kl {timeStart} - {timeEnd}
                </h3>
            </div>
            <div className='mini-view-course-footer'>
                <button onClick={handleclick}>
                    Trykk her
                </button>
            </div>
        </div>
    );
}

export default MiniDisplayCourse;