// redux/userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface InitialState {
  id?: string| undefined;
  username: string;
  email: string;
  mobile?: string;
  address?: string;
  profilePic?: string;
}

const initialState: InitialState = {
  id: '',
  username: '',
  email: '',
  mobile: '',
  address: '',
  profilePic: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<InitialState>) {
      return { ...state, ...action.payload };
    },
    clearUser() {
      return initialState;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
