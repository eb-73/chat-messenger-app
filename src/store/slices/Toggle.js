import { createSlice } from "@reduxjs/toolkit";
const toggle = createSlice({
  name: "Toggle",
  initialState: { showProfile: false, showDetail: false },
  reducers: {
    showProfile(state) {
      state.showProfile = true;
    },
    hideProfile(state) {
      state.showProfile = false;
    },
    showDetail(state) {
      state.showDetail = true;
    },
    hideDetail(state) {
      state.showDetail = false;
    },
  },
});
export const toggleAction = toggle.actions;
export default toggle;
