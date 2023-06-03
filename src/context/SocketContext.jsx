import React, { createContext, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import socketIoClient, { io } from 'socket.io-client';



export const SocketContext = createContext();

const WS = 'http://localhost:6001';

const socket = socketIoClient(WS);



export const SocketContextProvider = ({children}) => {
  
  const navigate = useNavigate();
    
  const enterRoom = ({roomId}) =>{
    navigate(`/meet/${roomId}`);
  }
  
  useEffect(()=>{
    socket.on("room-created", enterRoom);
  }, []);

  return (
    <SocketContext.Provider  value={{socket}} >{children}</SocketContext.Provider>
  )
}



// export default socketContext