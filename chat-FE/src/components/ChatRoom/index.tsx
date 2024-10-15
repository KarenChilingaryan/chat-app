import React, { useEffect, useState, useCallback, useMemo } from 'react';
import styles from './ChatRooms.module.scss';
import axiosInstance from '../../utils/server';
import Rooms from '../Room';
import { Channel } from '../../types/room';
import { User } from '../../types/user';
import { ChatRoomsProps } from './type';
import { debounce } from '../../constants/depounce';

const ChatRooms: React.FC<ChatRoomsProps> = ({ rooms, onSelectRoom, selectedRoomId, handleCreateOrSelect }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResult, setSearchResult] = useState<User[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const getSearchResult = useCallback(
        async (query: string) => {
            try {
                setLoading(true);
                setError(null);
                const response = await axiosInstance.get(`/users/search?name=${query}`);
                setSearchResult(response.data);
            } catch (err) {
                setError('Failed to fetch search results');
            } finally {
                setLoading(false);
            }
        },
        []
    );

    const debouncedSearch = useMemo(
        () => debounce((query: string) => getSearchResult(query), 300),
        [getSearchResult]
    );

    useEffect(() => {
        if (searchQuery) {
            debouncedSearch(searchQuery);
        } else {
            setSearchResult([]);
        }
    }, [searchQuery, debouncedSearch]);

    const handleUserClick = useCallback(
        (userId: number) => {
            handleCreateOrSelect(userId);
            setSearchResult([]);
            setSearchQuery('');
        },
        [handleCreateOrSelect]
    );

    return (
        <div className={styles.chatRoomsContainer}>
            <div className={styles.header}>
                <h2>Chats</h2>
                <input
                    type="text"
                    placeholder="Search"
                    value={searchQuery}
                    className={styles.searchInput}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <div className={styles.searchUsers}>
                    {loading && <p>Loading...</p>}
                    {error && <p className={styles.error}>{error}</p>}
                    {!loading && !error && searchResult.length > 0 && (
                        searchResult.map((item: User) => (
                            <div
                                key={item.id}
                                className={styles.searchItem}
                                onClick={() => handleUserClick(item.id)}
                            >
                                {item.username}
                            </div>
                        ))
                    )}
                    {!loading && searchResult.length === 0 && searchQuery && (
                        <p>No users found</p>
                    )}
                </div>
            </div>
            <div className={styles.roomsList}>
                {rooms.map((room: Channel) => (
                    <Rooms
                        key={room.id}
                        room={room}
                        selectedRoomId={selectedRoomId}
                        onSelectRoom={onSelectRoom}
                    />
                ))}
            </div>
        </div>
    );
};

export default ChatRooms;
