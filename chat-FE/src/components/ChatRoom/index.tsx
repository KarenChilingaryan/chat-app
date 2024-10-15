import React, { useEffect, useState } from 'react';
import styles from './ChatRooms.module.scss';
import axiosInstance from '../../utils/server';
import Rooms from '../Room';
import { Channel } from '../../types/room';
import { User } from '../../types/user';
import { ChatRoomsProps } from './type';

const ChatRooms: React.FC<ChatRoomsProps> = ({ rooms, onSelectRoom, selectedRoomId, handleCreateOrSelect }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResult, setSearchResult] = useState<User[]>([]);

    const getSearchResult = async () => {
        const response = await axiosInstance.get(`/users/search?name=${searchQuery}`)
        setSearchResult(response.data)
    }

    useEffect(() => {
        if (searchQuery) {
            getSearchResult();
        } else {
            setSearchResult([])
        }
    }, [searchQuery])

    return (
        <div className={styles.chatRoomsContainer}>
            <div className={styles.header}>
                <h2>Chats</h2>
                <input type="text" placeholder="Search" value={searchQuery} className={styles.searchInput}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <div className={styles.searchUsers}>
                    {
                        searchResult.map((item: User) => <div className={styles.searchItem} onClick={() => {
                            handleCreateOrSelect(item.id);
                            setSearchResult([]);
                            setSearchQuery('')
                        }}>
                            {item.username}
                        </div>)
                    }
                </div>
            </div>
            <div className={styles.roomsList}>
                {rooms.map((room: Channel) => {
                    return <Rooms room={room} selectedRoomId={selectedRoomId} onSelectRoom={onSelectRoom} />
                })}
            </div>
        </div>
    );
};

export default ChatRooms;
