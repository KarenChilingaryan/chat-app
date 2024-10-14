import { Socket } from 'socket.io-client';

export interface User {
    username: string;
    fullName: string;
    socket: Socket;
}

export interface Channel {
    id: number;
    name: string;
}

export interface Message {
    id: number;
    content: string;
    userId: string;
    channelId: number;
}
