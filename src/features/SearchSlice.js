import { createSlice } from "@reduxjs/toolkit";
import { getSearch } from "../actions/Products";

const initialState = {
  search: [],
  status: "idle",
  error: null,
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSearch.pending, (state, action) => {
        return {
          ...state,
          status: "pending",
        };
      })
      .addCase(getSearch.fulfilled, (state, action) => {
        return {
          ...state,
          status: "success",
          search: action.payload,
        };
      })
      .addCase(getSearch.rejected, (state, action) => {
        return {
          ...state,
          status: "failed",
          error: action.payload,
        };
      });
  },
});

export const SearchP = (state) => state.search.search;
export const SearchStatus = (state) => state.search.status;
export const SearchError = (state) => state.search.error;

export default searchSlice.reducer;
