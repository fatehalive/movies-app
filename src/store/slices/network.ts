import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NetworkType } from "@/types";

const initialState: NetworkType = {
  isOnline: navigator.onLine,
};

export const networkSlice = createSlice({
  name: "network",
  initialState,
  reducers: {
    setOnline: (state, action: PayloadAction<NetworkType>) => {
      state.isOnline = action.payload.isOnline;
    },
  },
});

export const { setOnline } = networkSlice.actions;
export default networkSlice.reducer;
