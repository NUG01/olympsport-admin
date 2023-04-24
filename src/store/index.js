import { createSlice, configureStore } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isLoggedIn: false,
};

const globalSlice = createSlice({
  name: "global",
  initialState: initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    setIsLoggedIn(state, action) {
      state.isLoggedIn = action.payload;
    },
  },
});

const globalStore = configureStore({ reducer: globalSlice.reducer });

export const globalActions = globalSlice.actions;

export default globalStore;
