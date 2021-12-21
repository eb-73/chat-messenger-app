import { createSlice } from "@reduxjs/toolkit";

const chatWith = createSlice({
  name: "ChatWith",
  initialState: {
    from: null,
    to: null,
    name: "",
    showChat: false,
  },
  reducers: {
    setChat(state, action) {
      state.from = action.payload.from;
      state.to = action.payload.to;
      state.name = action.payload.name;
      state.showChat = !!action.payload.to;
    },
  },
});
export const chatWithAction = chatWith.actions;
export default chatWith;
