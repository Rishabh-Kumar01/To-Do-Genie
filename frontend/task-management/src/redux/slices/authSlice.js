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
    refreshTokenSuccess: (state, action) => {
      state.accessToken = action.payload;
    },
    changePasswordSuccess: (state) => {
      state.error = null;
    },
    changePasswordFailure: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  loginSuccess,
  loginFailure,
  logout,
  refreshTokenSuccess,
  changePasswordSuccess,
  changePasswordFailure,
  clearError,
} = authSlice.actions;

export default authSlice.reducer;
