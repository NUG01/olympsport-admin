import { createStore, configureStore } from "redux";
import { createSlice } from "reduxjs/toolkit";

const initialState = {
  global: null,
};

const globalSlice = createSlice({
  name: "global",
  initialState: initialState,
  reducers: {
    setGlobal(state, action) {
      state.global = action.payload;
    },
  },
});

const store = configureStore({ reducer: globalSlice.reducer });

export default store;
