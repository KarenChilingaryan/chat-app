import React, { useEffect, useMemo, useState, useCallback } from 'react';
import ChatRooms from '../ChatRoom';
import Chat from '../Chat';
import { AppDispatch, RootState } from '../../store/store';
import { createRoom, fetchChatRooms } from '../../store/slice/chatRoomsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Member } from '../../types/room';

const ChatApp: React.FC = () => {
  const [selectedRoomId, setSelectedRoomId] = useState<number | null>(null);
  const { user } = useSelector((state: RootState) => state.user);
  const { rooms, loading, error } = useSelector((state: RootState) => state.chatRooms);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchChatRooms(user.id));
    }
  }, [dispatch, user]);

  const handleCreateOrSelect = useCallback(
    (userId: number) => {
      const existingRoom = rooms.find(room =>
        room.members.some((member: Member) => member.id === userId)
      );

      if (existingRoom) {
        setSelectedRoomId(existingRoom.id);
      } else if (user?.id) {
        dispatch(createRoom({ name: `${user.id}_${userId}`, members: [user.id, userId] }));
      }
    },
    [rooms, dispatch, user?.id]
  );

  const selectedRoom = useMemo(() => {
    return rooms.find(room => room.id === selectedRoomId);
  }, [rooms, selectedRoomId]);

  const handleSelectRoom = useCallback((roomId: number) => {
    setSelectedRoomId(roomId);
  }, []);

  if (error) {
    return <div>Error loading chat rooms: {error}</div>;
  }

  if (loading) {
    return <div>Loading chat rooms...</div>;
  }

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <ChatRooms
        rooms={rooms}
        onSelectRoom={handleSelectRoom}
        selectedRoomId={selectedRoomId}
        handleCreateOrSelect={handleCreateOrSelect}
      />
      {selectedRoomId && selectedRoom ? (
        <Chat selectedRoomId={selectedRoomId} selectedRoomData={selectedRoom} />
      ) : (
        <div style={{ margin: 'auto' }}>No active chat selected</div>
      )}
    </div>
  );
};

export default ChatApp;
