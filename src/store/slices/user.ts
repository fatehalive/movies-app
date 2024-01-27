import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserInterface, MovieInterface } from "@/types";

const initialState: UserInterface = {
  userId: "",
  username: "",
  firstName: null,
  lastName: null,
  watchList: [],
  watched: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addWatchList: (state, action: PayloadAction<MovieInterface>) => {
      state.watchList.push(action.payload);
    },
  },
});

export const { addWatchList } = userSlice.actions;
export default userSlice.reducer;
