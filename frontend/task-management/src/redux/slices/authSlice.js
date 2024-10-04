import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  accessToken: null,
  isAuthenticated: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.isAuthenticated = true;
      state.error = null;
    },
    loginFailure: (state, action) => {
      state.user = null;
      state.accessToken = null;
      state.isAuthenticated = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.isAuthenticated = false;
      state.error = null;
    },
    updateUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { loginSuccess, loginFailure, logout, updateUser } =
  authSlice.actions;

export default authSlice.reducer;
