import React, { useEffect, useMemo, useState } from 'react';
import ChatRooms from '../ChatRoom';
import Chat from '../Chat';
import { AppDispatch, RootState } from '../../store/store';
import { createRoom, fetchChatRooms } from '../../store/slice/chatRoomsSlice';
import { useDispatch, useSelector } from 'react-redux';

const ChatApp: React.FC = () => {
    const [selectedRoomId, setSelectedRoomId] = useState<string>('');
    const { user } = useSelector((state: RootState) => state.user)
    const { rooms, loading, error } = useSelector((state: RootState) => state.chatRooms);

    const handleSelectRoom = (roomId: string) => {
        setSelectedRoomId(roomId);
    };
    const handleCreateOrSelect = (userId: string) => {
        const findRoom = rooms.find(item => item.members.find((member: any) => member.id == userId))
        if (findRoom) {
            setSelectedRoomId(findRoom.id)
        } else {
            if (user?.id) {
                dispatch(createRoom({ name: user.id + '_' + userId, members: [Number(user.id), Number(userId)] }))
            }
        }

    };


    const dispatch = useDispatch<AppDispatch>();


    useEffect(() => {
        if (user?.id) {
            dispatch(fetchChatRooms(user.id as string));
        }
    }, [dispatch, user]);

    const selectedRoom = useMemo(() => {
        return rooms.find(room => room.id == selectedRoomId)
    }, [selectedRoomId])

    return (
        <div style={{ display: 'flex', height: '100vh' }}>
            <ChatRooms rooms={rooms as any} onSelectRoom={handleSelectRoom} selectedRoomId={selectedRoomId} handleCreateOrSelect={handleCreateOrSelect} />
            {selectedRoomId ? <Chat selectedRoomId={selectedRoomId} selectedRoomData={selectedRoom} /> : 'no active chat'}
        </div>
    );
};

export default ChatApp;
