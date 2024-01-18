import React, { createContext, useState } from 'react';

const SocketIdContext = createContext({});
const SocketIdProvider = ({ children }) => {
    const [socketId, setSocketId] = useState("");
    return (
        <SocketIdContext.Provider value={{socketId, setSocketId}}>
            {children}
        </SocketIdContext.Provider>
    );
};

const UsernameContext = createContext({});
const UsernameProvider = ({ children }) => {
    const [username, setUsername] = useState("");
    return (
        <UsernameContext.Provider value={{username, setUsername}}>
            {children}
        </UsernameContext.Provider>
    );
};

export { SocketIdContext, SocketIdProvider, UsernameContext, UsernameProvider };