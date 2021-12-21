import { createSlice } from "@reduxjs/toolkit";
const auth = createSlice({
  name: "Auth",
  initialState: { isLogin: false },
  reducers: {
    setInitial(state, action) {
      state.isLogin = !!action.payload;
    },
  },
});
export const authAction = auth.actions;
export default auth;
