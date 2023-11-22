import '../../css/coursePopUp.css'


function CoursePopUp() {
    const handleClickedEntireDiv = (event) => {
        event.stopPropagation();
    };
    return ( 
        <div className="course-popup-main" onClick={handleClickedEntireDiv}>
            <div className='course-popup-header'>
                <p></p>
                <h1>Kroppsøving</h1>
            </div>
            <div className='course-popup-times'>
                <h2>Kurset varer fra uke 42 - uke 51</h2>
                <div className='course-popup-times-table'>
                    <table>
                        <tr>
                            <th>Dag</th>
                            <th>Klokkeslett</th>
                            <th>Lokasjon</th>
                        </tr>
                    </table>
                </div>
            </div>
            <div className='course-popup-description'>
                <p>
                Dette kroppsøvingskurset er skreddersydd for voksne i alderen 40-60 år som ønsker å ta vare på sin fysiske helse, øke sin bevegelighet og styrke, samt oppleve gleden ved å være aktive. Kurset legger vekt på varierte og tilpassede øvelser som tar hensyn til deltakernes individuelle behov og nivåer.
                </p>
            </div>
            <div className='course-popup-signup'>
                <button>Sign Up Now!</button>
            </div>
        </div>
    )
    
}

export default CoursePopUp;