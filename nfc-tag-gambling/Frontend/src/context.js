import React, { createContext, useState } from 'react';

const RoomIdContext = createContext({});
const RoomIdProvider = ({ children }) => {
    const [roomId, setRoomId] = useState("");
    return (
        <RoomIdContext.Provider value={{roomId, setRoomId}}>
            {children}
        </RoomIdContext.Provider>
    );
};

export { RoomIdContext, RoomIdProvider };