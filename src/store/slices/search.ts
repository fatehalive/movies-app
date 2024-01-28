import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SearchType } from "@/types";

const initialState: SearchType = {
  page: 0,
  results: [],
  total_pages: 0,
  total_results: 0,
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<SearchType>) => {
        state.page = action.payload.page
        state.results = action.payload.results
        state.total_pages = action.payload.total_pages
        state.total_results = action.payload.total_results
    },
  },
});

export const { setSearch } = searchSlice.actions;
export default searchSlice.reducer;
