import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';
export enum Role {
  ADMIN = 'admin',
  USER = 'user',
}
export type User = {
  password: string;
  email: string;
};

interface UsersState {
  auth: boolean;
  role: Role | null;
  users: User[];
}

const initialState: UsersState = {
  auth: false,
  role: null,
  users: [
    { email: 'user@user.com', password: '12345' },
    {
      email: 'admin@admin.com',
      password: '67890',
    },
  ],
};

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    isAuth: (state, action: PayloadAction<User>) => {
      state.auth = !!state.users.find(
        (el) => el.email === action.payload.email && el.password === action.payload.password
      );
      if (state.auth) action.payload.email === 'user@user.com' ? (state.role = Role.USER) : (state.role = Role.ADMIN);
    },
    logout: (state) => {
      state.auth = false;
    },
  },
});

export const { isAuth, logout } = userSlice.actions;
export const authSelector = (state: RootState) => state.users.auth;
export const roleSelector = (state: RootState) => state.users.role;
export default userSlice.reducer;
