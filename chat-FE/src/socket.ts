import { io } from 'socket.io-client';

const socket = io(`${process.env.REACT_APP_SOCKET_BASE || 'http://localhost:8001'}`, {
  transports: ['websocket', 'polling'],
});

export default socket;
