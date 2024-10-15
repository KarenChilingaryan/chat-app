import React, { useEffect, useMemo, useCallback } from 'react';
import styles from './Room.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { formatChatDate, getInitials } from '../../constants/functions';
import socket from '../../socket';
import { sendMessage } from '../../store/slice/messagesSlice';
import { changeLatestMessage } from '../../store/slice/chatRoomsSlice';
import { Message } from '../../types/messages';
import { RoomsProps } from './type';

const Rooms: React.FC<RoomsProps> = ({ room, onSelectRoom, selectedRoomId }) => {
    const { user } = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch<AppDispatch>();

    const lastMessage = useMemo(() => {
        return room.messages.length ? room.messages[0] : null;
    }, [room]);

    const messageListener = useCallback(
        (message: Message) => {
            if (message.channelId === selectedRoomId) {
                dispatch(sendMessage(message));
            }

            dispatch(changeLatestMessage({
                message,
                userId: user?.id,
                isUnread: message.channelId !== selectedRoomId,
            }));
        },
        [dispatch, selectedRoomId, user?.id]
    );

    useEffect(() => {
        if (!socket.connected) {
            socket.connect();
        }

        return () => {
            if (socket.connected) {
                socket.disconnect();
            }
        };
    }, []);

    useEffect(() => {
        if (user) {
            socket?.on(`sendMessage_${room.id}`, messageListener);
        }

        return () => {
            socket?.off(`sendMessage_${room.id}`, messageListener);
        };
    }, [messageListener, room.id, user]);

    return (
        <div
            key={room.id}
            className={`${styles.roomItem} ${selectedRoomId === room.id ? styles.selectedRoom : ''}`}
            onClick={() => onSelectRoom(room.id)}
        >
            <div className={styles.avatar} style={{ background: room.color }}>
                {getInitials(room.name)}
            </div>
            <div className={styles.roomInfo}>
                <h3>{room.name}</h3>
                <p>{lastMessage?.content || 'No messages yet'}</p>
            </div>
            <div className={styles.roomMeta}>
                <span>{lastMessage ? formatChatDate(lastMessage.createdAt) : ''}</span>
                {Number(room.unreadMessageCount) > 0 && (
                    <div className={styles.unreadCount}>{room.unreadMessageCount}</div>
                )}
            </div>
        </div>
    );
};

export default Rooms;
