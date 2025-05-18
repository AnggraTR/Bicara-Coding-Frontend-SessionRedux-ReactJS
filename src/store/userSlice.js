import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    email: null,
    name: null,
    loggedIn: false
  },
  reducers: {
    setUser: (state, action) => {
      state.email = action.payload.email;
      state.name = action.payload.name;
      state.loggedIn = true;
    },
    logoutUser: (state) => {
      state.email = null;
      state.name = null;
      state.loggedIn = false;
    }
  }
});

export const { setUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
