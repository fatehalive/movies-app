import { combineReducers } from "@reduxjs/toolkit";
import counterReducer from "./slices/counter";
import userReducer from "./slices/user";
import networkReducer from "./slices/network"
import api from "@/api";

const rootReducer = combineReducers({
  counter: counterReducer,
  user: userReducer,
  network: networkReducer,
  [api.reducerPath]: api.reducer
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
