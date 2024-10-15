import React, { useEffect, useMemo } from 'react';
import styles from './Room.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { formatChatDate, getInitials } from '../../constants/functions';
import socket from '../../socket';
import { sendMessage } from '../../store/slice/messagesSlice';
import { changeLatestMessage } from '../../store/slice/chatRoomsSlice';

const Rooms: React.FC<any> = ({ room, onSelectRoom, selectedRoomId }) => {
    const { user } = useSelector((state: RootState) => state.user)
    const dispatch = useDispatch<AppDispatch>();

    const lastmessage = useMemo(() => {
        return room.messages;
    }, [room])

    const messageListener = (message: any) => {
        if (message.channelId == selectedRoomId) {
            dispatch(sendMessage(message))
        }

        dispatch(changeLatestMessage({ message, userId: user?.id, isUnread: message.channelId != selectedRoomId }))
    }

    useEffect(() => {
        if (!socket.connected) {
            socket.connect()
        }

        return () => {
            if (socket.connected) {
                socket.disconnect()
            }
        }
    }, [socket]);

    useEffect(() => {
        if (user) {
            socket?.on("sendMessage_" + room.id, messageListener);
        }
        return () => {
            socket?.off("sendMessage_" + room.id, messageListener)
        }
    }, [socket, messageListener, user]);

    return (<div
        key={room.id}
        className={`${styles.roomItem} ${selectedRoomId === room.id ? styles.selectedRoom : ''}`}
        onClick={() => onSelectRoom(room.id)}
    >
        <div className={styles.avatar} style={{ background: room.color }}>
            {getInitials(room.name)}
        </div>
        <div className={styles.roomInfo}>
            <h3>{room.name}</h3>
            <p>{lastmessage?.length ? lastmessage[0].content : ''}</p>
        </div>
        <div className={styles.roomMeta}>
            <span>{lastmessage?.length ? formatChatDate(lastmessage[0].createdAt) : ''}</span>
            {room.unreadMessageCount > 0 && <div className={styles.unreadCount}>{room.unreadMessageCount}</div>}
        </div>
    </div>
    );
};

export default Rooms;
