import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slice/userSlice';
import chatRoomsReducer from './slice/chatRoomsSlice';
import messagesReducer from './slice/messagesSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    chatRooms: chatRoomsReducer,
    messages: messagesReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
