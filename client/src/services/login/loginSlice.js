import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  username: localStorage.getItem('username') || null
};

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem('username');
      state = {...initialState};
    },
    login: (state, { payload }) => {
      localStorage.setItem('username', payload.username);
      state.username = payload.username;
    }
  }
});

export const { login, logout } = loginSlice.actions;
export default loginSlice.reducer;