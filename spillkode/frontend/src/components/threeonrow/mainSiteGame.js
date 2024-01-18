import { socket } from '../../App';
import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { UsernameContext, SocketIdContext } from '../../context';

import { Link } from 'react-router-dom';

export default function MainSiteGame() {
    const navigate = useNavigate();

    const {username, setUsername} = useContext(UsernameContext);
    const {socketId, setSocketId} = useContext(SocketIdContext);

    function joinRoom(value) {
        if (username !=="") {
            socket.emit('joinRoom', value);
        } else{
            alert("Please enter a username to join the game.")
        }
    }

    useEffect(() => {
        function sendToRoom(joinRoomResponse) {
            if(joinRoomResponse){
                navigate("/lobby")
            }
        }
        function onSocketId(socketId){
            setSocketId(socketId)
        }
        
        socket.on('joinRoomResponse', (joinRoomResponse) => sendToRoom(joinRoomResponse));
        socket.on('socketId', (socketId) => onSocketId(socketId));
        socket.off('socketId', onSocketId);
    
        return () => {
          socket.off('joinRoomResponse', sendToRoom);
        };
      }, []);

    return (
        <div>
            <input value={username} onChange={(e) => setUsername(e.target.value)} />


            <button onClick={()=>joinRoom("join brodeeeeeeeeeeer")}>JOIN BRODER</button>

            {/* <Link to="/test">felkoiwjiuefoeij</Link> */}
        </div>
    );
}
