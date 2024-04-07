import React, { createContext, useState } from 'react';

const RequestInfoContext = createContext({});
const RequestInfoProvider = ({ children }) => {
    const [requestInfo, setRequestInfo] = useState([]);
    return (
        <RequestInfoContext.Provider value={{requestInfo, setRequestInfo}}>
            {children}
        </RequestInfoContext.Provider>
    );
};

export { RequestInfoContext, RequestInfoProvider };