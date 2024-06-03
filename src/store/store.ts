import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from './tasksSlice';
import userReducer from './usersSlice';

const store = configureStore({
  reducer: {
    users: userReducer,
    tasks: tasksReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
