import React, { createContext, useState } from 'react';

const JsonListContext = createContext({});
const JsonListProvider = ({ children }) => {
    const [jsonList, setJsonList] = useState([{casenum:1, date:"12.12.2023", subject: "Ødelagt router", username:"karl Årge", isFixed:true, priority:"h", detailedSubject:"hureg,sh,jkrsnijglnes,gjnvjs,gnvrkgjlnvslkvgn", note:"alt fikser seg selv ass"}]);
    return (
        <JsonListContext.Provider value={{jsonList, setJsonList}}>
            {children}
        </JsonListContext.Provider>
    );
};

export { JsonListContext, JsonListProvider };