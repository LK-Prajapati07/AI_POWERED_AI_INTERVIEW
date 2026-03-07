import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const user = action.payload;

      state.user = user;
      state.isAuthenticated = !!user; 
      state.loading = false;
    },
    logoutUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
    },

    setLoading: (state) => {
      state.loading = true;
    },

    stopLoading: (state) => {
      state.loading = false;
    },
  },
});

export const { setUser, logoutUser, setLoading, stopLoading } =
  authSlice.actions;

export default authSlice.reducer;
