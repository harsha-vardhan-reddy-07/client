import React, { createContext, useMemo, useState } from 'react';
import { io } from 'socket.io-client';


const WS = 'http://localhost:6001';

export const SocketContext = createContext();
// socketIoClient(WS);

export const SocketContextProvider = ({children}) => {
    const socket = useMemo(() => io('localhost:6001'), []);
    
    
  return (
    <SocketContext.Provider  value={socket} >{children}</SocketContext.Provider>
  )
}



// export default socketContext