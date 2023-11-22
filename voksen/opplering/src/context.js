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

export { ShowPopUpProvider, ShowPopUpContext };