import React, { useContext, useEffect } from 'react';
import {useParams} from 'react-router-dom';
import {SocketContext} from '../context/SocketContext';

const MeetRoom = () => {
  const {id} = useParams();
  const {socket} = useContext(SocketContext);

  useEffect(()=>{

    socket.emit("join-room", {roomId: id});

  });

  return (
    <div>MeetRoom {id}</div>
  )
}

export default MeetRoom;