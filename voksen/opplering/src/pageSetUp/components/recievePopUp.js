import CoursePopUp from "./coursePopUp";

function RecievePopUp({preferredPopUp}) {
    if(preferredPopUp==='course'){
        return (        
            <CoursePopUp/>
        );
    } else{
        return (
            <h1>404 not found</h1>
        );
    }
    
}

export default RecievePopUp;