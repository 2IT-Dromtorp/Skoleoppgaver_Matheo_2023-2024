import React, { useState, useEffect, useContext } from 'react';
import '../App.css'

import { socket } from '../App';
import { ConnectionManager } from './ConnectionManager';
import { MyForm } from './MyForm';
import { SocketIdContext } from '../context';

export default function TestMessage() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [messages, setMessages] = useState([]);
  const [messageBunt, setMessageBunt] = useState([]);
  const {socketId, setSocketId} = useContext(SocketIdContext);
  

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onMelding(melding) {
      setMessages((prevMessages) => [...prevMessages, melding]);
    }

    function onSocketId(socketId) {
      setSocketId(socketId)
    }
    

    socket.on('socketId', (socketId) => onSocketId(socketId));
    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('melding', (melding) => onMelding(melding));

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('melding', onMelding);
    };
  }, []);
  
  return (
    <div className="App">
      <ConnectionManager />
      <MyForm socket={socket} />
      <div>
        <h2>Messages:</h2>
        <ul>
          {messages.map((message) => (
            <li key={message.id} className={message.id === socketId ? 'main-message-me' : 'main-message-else'}>
              {message.message}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
