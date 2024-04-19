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

const EmailContext = createContext({});
const EmailProvider = ({ children }) => {
    const [email, setEmail] = useState("");
    return (
        <EmailContext.Provider value={{email, setEmail}}>
            {children}
        </EmailContext.Provider>
    );
};

const SchoolclassContext = createContext({});
const SchoolclassProvider = ({ children }) => {
    const [schoolclass, setSchoolclass] = useState("");
    return (
        <SchoolclassContext.Provider value={{schoolclass, setSchoolclass}}>
            {children}
        </SchoolclassContext.Provider>
    );
};

const DialogContentContext = createContext({});
const DialogContentProvider = ({ children }) => {
    const [dialogContent, setDialogContent] = useState({
        operation: "",
        data: []
    });
    return (
        <DialogContentContext.Provider value={{dialogContent, setDialogContent}}>
            {children}
        </DialogContentContext.Provider>
    );
};

export { RequestInfoContext, RequestInfoProvider, EmailContext, EmailProvider, SchoolclassContext, SchoolclassProvider, DialogContentContext, DialogContentProvider };