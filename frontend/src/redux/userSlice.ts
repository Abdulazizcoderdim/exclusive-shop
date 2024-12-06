import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: '',
  },
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    logout(state) {
      state.user = '';
      localStorage.setItem('userId', '');
      localStorage.setItem('accessToken', '');
      localStorage.removeItem('user');
    },
  },
});

export const { logout, setUser } = userSlice.actions;

export const selectUser = (state: { user: { user: string } }) =>
  state.user.user;

export default userSlice.reducer;
