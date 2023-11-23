import CoursePopUp from "./coursePopUp";
import LogInPopUp from "./LogInPopUp";
import { PopUpContentContext } from '../../context';
import { useContext } from "react";

function RecievePopUp() {
    const { popUpContent, setPopUpContent } = useContext(PopUpContentContext);
    if(popUpContent==='course'){
        return (        
            <CoursePopUp/>
        );
    } if(popUpContent==='login'){
        return (
            <LogInPopUp/>
        );
    }else{
        return (
            <h1>404 not found</h1>
        );
    }
    
}

export default RecievePopUp;