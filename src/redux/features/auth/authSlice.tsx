import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: "",
  user: {},
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loggedIn: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    loggedOut: (state) => {
      state.token = "";
      state.user = {};
    },
  },
});

export default authSlice.reducer;
export const { loggedIn, loggedOut } = authSlice.actions;
