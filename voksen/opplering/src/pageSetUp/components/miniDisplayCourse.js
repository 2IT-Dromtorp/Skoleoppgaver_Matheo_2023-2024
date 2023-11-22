import '../../css/miniDisplayCourse.css'
import { useState, useContext } from 'react';
import { ShowPopUpContext } from '../../context';

function MiniDisplayCourse() {
    const { showPopUp, setShowPopUp } = useContext(ShowPopUpContext);

    return (
        <button className="Mini-view-course-main">
            <div className='mini-view-course-picture'>
                <img src='https://i.pinimg.com/564x/2d/49/d3/2d49d3c263707af48b6dd103da36484f.jpg'/>
            </div>
            <div className='mini-view-course-header'>
                <h1>
                    Fremmedspråk
                </h1>
            </div>
            <div className='mini-view-course-description'>
                <h3>
                    23. Desember KL 20:00
                </h3>
            </div>
            <div className='mini-view-course-footer'>
                <button onClick={()=>setShowPopUp(true)}>
                    Trykk her
                </button>
            </div>
        </button>
    );
}

export default MiniDisplayCourse;