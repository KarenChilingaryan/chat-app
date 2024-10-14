import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { fetchMessagesByRoomIdApi } from '../api/messagesApi';
import { updateMessagesAsReadApi } from '../api/updateMessagesAsReadApi';

export const fetchMessagesByRoomId = createAsyncThunk(
  'messages/fetchMessagesByRoomId',
  async ({ roomId, offset, limit }: { roomId: string; offset: number; limit: number }, { rejectWithValue }) => {
    try {
      const messages = await fetchMessagesByRoomIdApi(roomId, offset, limit);
      return messages.reverse();
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Failed to fetch messages');
    }
  }
);

export const sendMessage = createAsyncThunk(
  'messages/sendMessage',
  async (message: any, { rejectWithValue }) => {
    try {
      return message;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Failed to send message');
    }
  }
);

export const updateMessagesAsRead = createAsyncThunk(
  'messages/updateMessagesAsRead',
  async ({ roomId, userId }: { roomId: string, userId: string }, { rejectWithValue }) => {
    try {
      await updateMessagesAsReadApi(roomId, userId);
      return roomId;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Failed to update messages as read');
    }
  }
);

const messagesSlice = createSlice({
  name: 'messages',
  initialState: {
    messages: [] as any[],
    unreadCount: 0,
    loading: false,
    error: null as any,
    page: 0,
    hasMore: true,
  },
  reducers: {
    clearMessages: (state) => {
      state.messages = [];
      state.page = 0;
      state.hasMore = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.messages.push(action.payload);
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.error = action.payload;
      });

    builder
      .addCase(fetchMessagesByRoomId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMessagesByRoomId.fulfilled, (state, action) => {
        state.messages = [...action.payload, ...state.messages];
        state.loading = false;
        state.page += 1;
        if (action.payload.length < 20) {
          state.hasMore = false;
        }
      })
      .addCase(fetchMessagesByRoomId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(updateMessagesAsRead.fulfilled, (state, action: PayloadAction<string>) => {
        const roomId = action.payload;
        state.messages = state.messages.map((message) =>
          message.channelId === roomId ? { ...message, unread: false } : message
        );
        state.unreadCount = 0;
      })
      .addCase(updateMessagesAsRead.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { clearMessages } = messagesSlice.actions;
export default messagesSlice.reducer;
