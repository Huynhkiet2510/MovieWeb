import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: JSON.parse(localStorage.getItem("tmdb_user") || "null"),
  session_id: localStorage.getItem("session_id") || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload.user;
      state.session_id = action.payload.session_id;

      localStorage.setItem("tmdb_user", JSON.stringify(action.payload.user));
      localStorage.setItem("session_id", action.payload.session_id);
    },

    logout: (state) => {
      state.user = null;
      state.session_id = null;

      localStorage.removeItem("tmdb_user");
      localStorage.removeItem("session_id");
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;

export default authSlice.reducer;
