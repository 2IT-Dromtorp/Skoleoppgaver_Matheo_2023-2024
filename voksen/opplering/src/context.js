import React, { createContext, useState } from 'react';

const ShowPopUpContext = createContext({});
const ShowPopUpProvider = ({ children }) => {
    const [showPopUp, setShowPopUp] = useState(false);
    return (
        <ShowPopUpContext.Provider value={{ showPopUp, setShowPopUp }}>
            {children}
        </ShowPopUpContext.Provider>
    );
};

const PopUpContentContext = createContext({});
const PopUpContentProvider = ({ children }) => {
    const [popUpContent, setPopUpContent] = useState('none');
    return (
        <PopUpContentContext.Provider value={{ popUpContent, setPopUpContent }}>
            {children}
        </PopUpContentContext.Provider>
    );
};

const PopUpCourseContext = createContext({});
const PopUpCourseProvider = ({ children }) => {
    const [popUpCourse, setPopUpCourse] = useState();
    return (
        <PopUpCourseContext.Provider value={{ popUpCourse, setPopUpCourse }}>
            {children}
        </PopUpCourseContext.Provider>
    );
};

export { ShowPopUpProvider, ShowPopUpContext, PopUpContentProvider, PopUpContentContext, PopUpCourseContext, PopUpCourseProvider };