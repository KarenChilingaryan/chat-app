import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import styles from './Chat.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { formatChatDate, getInitials } from '../../constants/functions';
import socket from '../../socket';
import {
    clearMessages,
    fetchMessagesByRoomId,
    updateMessagesAsRead
} from '../../store/slice/messagesSlice';
import { readMessage } from '../../store/slice/chatRoomsSlice';
import { ChatProps } from './type';
import { Message } from '../../types/messages';
import { Member } from '../../types/room';

const Chat: React.FC<ChatProps> = ({ selectedRoomData, selectedRoomId }) => {
    const [newMessage, setNewMessage] = useState<string>('');
    const { user } = useSelector((state: RootState) => state.user);
    const { messages, page, hasMore, loading } = useSelector((state: RootState) => state.messages);
    const [isLoading, setIsLoading] = useState(false);
    const [limit] = useState(20);
    const dispatch = useDispatch<AppDispatch>();
    const [scrollTop, setScrollTop] = useState(0);

    const chatContainerRef = useRef<HTMLDivElement | null>(null);
    const lastMessageRef = useRef<HTMLDivElement | null>(null);

    const scrollToBottom = useCallback(() => {
        if (lastMessageRef.current) {
            lastMessageRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, []);

    useEffect(() => {
        if (messages.length) {
            scrollToBottom();
        }
    }, [messages, scrollToBottom]);

    const handleScroll = useCallback(async () => {
        const chatContainer = chatContainerRef.current;
        if (chatContainer && chatContainer.scrollTop === 0 && hasMore && !isLoading) {
            setIsLoading(true);
            const previousScrollHeight = chatContainer.scrollHeight;

            await dispatch(fetchMessagesByRoomId({ roomId: selectedRoomId, offset: (page + 1) * limit, limit }));

            const newScrollHeight = chatContainer.scrollHeight;
            setScrollTop(newScrollHeight - previousScrollHeight);

            setIsLoading(false);
        }
    }, [dispatch, selectedRoomId, page, limit, hasMore, isLoading]);

    useEffect(() => {
        const chatContainer = chatContainerRef.current;
        if (chatContainer) {
            chatContainer.addEventListener('scroll', handleScroll);
        }
        return () => {
            if (chatContainer) {
                chatContainer.removeEventListener('scroll', handleScroll);
            }
        };
    }, [handleScroll]);

    const friend = useMemo(() => {
        return selectedRoomData?.members.find((member: Member) => member.id !== Number(user?.id));
    }, [selectedRoomData, user?.id]);

    useEffect(() => {
        if (selectedRoomId) {
            dispatch(clearMessages());
            dispatch(fetchMessagesByRoomId({ roomId: selectedRoomId, offset: 0, limit }));
            if (friend?.id) {
                dispatch(updateMessagesAsRead({ roomId: selectedRoomId, userId: friend.id }));
            }
            dispatch(readMessage(selectedRoomId));
        }
    }, [selectedRoomId, dispatch, limit, friend]);

    const onSendMessage = useCallback(
        (message: string) => {
            if (message.trim()) {
                const payload = { channelId: selectedRoomId, content: message, userId: user?.id };
                socket.emit('sendMessage', payload);
            }
        },
        [selectedRoomId, user?.id]
    );

    useEffect(() => {
        if (!loading && chatContainerRef.current && scrollTop) {
            chatContainerRef.current.scrollTop = scrollTop;
        }
    }, [loading, scrollTop]);

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (newMessage.trim()) {
            onSendMessage(newMessage);
            setNewMessage('');
        }
    };

    return (
        <div className={styles.chatContainer}>
            <div className={styles.chatHeader}>
                <div className={styles.avatar} style={{ background: selectedRoomData?.color }}>
                    {getInitials(selectedRoomData?.name || '')}
                </div>
                {selectedRoomData?.name || 'User'}
            </div>
            <div className={styles.messagesContainer} ref={chatContainerRef}>
                {isLoading && <p>Loading...</p>}
                {messages.map((message: Message, index: number) => (
                    <div
                        ref={index === messages.length - 1 ? lastMessageRef : null}
                        key={message.id}
                        className={`${styles.message} ${message?.userId === Number(user?.id) ? styles.senderMessage : styles.receiverMessage}`}
                    >
                        {message?.userId !== Number(user?.id) && (
                            <div className={styles.avatar} style={{ background: friend?.color }}>
                                {getInitials(friend?.fullName || '')}
                            </div>
                        )}
                        <div className={styles.messageContent}>
                            <div>
                                <p>{message.content}</p>
                                {message.photo && <img src={message.photo} alt="attachment" />}
                            </div>
                            <span>{formatChatDate(message.createdAt)}</span>
                        </div>
                    </div>
                ))}
            </div>
            <form className={styles.messageInputContainer} onSubmit={handleSendMessage}>
                <div className={styles.messageInput}>
                    <img src='/icons/file.svg' alt="file attachment" />
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Write a message..."
                    />
                    <img src='/icons/smile.svg' alt="emoji picker" />
                </div>
                <button type="submit" className={styles.sendButton}>
                    <img src='/icons/Vector.svg' alt="send" />
                </button>
            </form>
        </div>
    );
};

export default Chat;
