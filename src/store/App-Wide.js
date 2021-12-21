import { configureStore } from "@reduxjs/toolkit";
import auth from "./slices/Auth";
import chatWith from "./slices/ChatWith";
import toggle from "./slices/Toggle";
//combine slices to one store
const store = configureStore({
  reducer: {
    Auth: auth.reducer,
    ChatWith: chatWith.reducer,
    Toggle: toggle.reducer,
  },
});

export default store;
