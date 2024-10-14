import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/server';

interface ChatRoomsState {
    rooms: Array<any>;
    loading: boolean;
    error: string | null;
}

const initialState: ChatRoomsState = {
    rooms: [],
    loading: false,
    error: null,
};

export const fetchChatRooms = createAsyncThunk(
    'chatRooms/fetchChatRooms',
    async (userId: string, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`/channel/user/${userId}`);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || 'Failed to fetch chat rooms');
        }
    }
);

export const createRoom = createAsyncThunk(
    'rooms/createRoom',
    async (roomData: { name: string, members: number[] }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post('/channel', roomData);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);

const chatRoomsSlice = createSlice({
    name: 'chatRooms',
    initialState,
    reducers: {
        readMessage: (state, action) => {
            const rooms = [...state.rooms];

            for (let i = 0; i < rooms.length; i++) {
                if (rooms[i].id == action.payload) {
                    rooms[i].unreadMessageCount = '0';
                    break
                }
            }
            state.rooms = [...rooms];
        },
        changeLatestMessage: (state, action) => {
            const rooms = [...state.rooms];
            for (let i = 0; i < rooms.length; i++) {
                if (rooms[i].id == action.payload.message.channelId) {
                    rooms[i].messages = [action.payload.message];
                    if (action.payload.isUnread && action.payload.message.userId != action.payload.userId) {
                        rooms[i].unreadMessageCount = Number(rooms[i].unreadMessageCount) + 1
                    }
                    break
                }
            }
            state.rooms = [...rooms];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchChatRooms.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchChatRooms.fulfilled, (state, action) => {
                state.rooms = action.payload;
                state.loading = false;
            })
            .addCase(fetchChatRooms.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
        builder
            .addCase(createRoom.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createRoom.fulfilled, (state, action) => {
                state.rooms = [action.payload, ...state.rooms];
                state.loading = false;
            })
            .addCase(createRoom.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});


export const { readMessage, changeLatestMessage } = chatRoomsSlice.actions;
export default chatRoomsSlice.reducer;
