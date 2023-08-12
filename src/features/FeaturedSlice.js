import { createSlice } from "@reduxjs/toolkit";
import { getFeatured } from "../actions/Products";

const initialState = {
  featured: [],
  status: "idle",
  error: null,
};

const featuredSlice = createSlice({
  name: "featured",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFeatured.pending, (state, action) => {
        return {
          ...state,
          status: "pending",
        };
      })
      .addCase(getFeatured.fulfilled, (state, action) => {
        return {
          ...state,
          featured: action.payload,
          status: "success",
        };
      })
      .addCase(getFeatured.rejected, (state, action) => {
        return {
          ...state,
          error: action.payload,
          status: "rejected",
        };
      });
  },
});

export const Featured = (state) => state.featured.featured;
export const featuredStatus = (state) => state.featured.status;
export const featuredError = (state) => state.featured.error;

export default featuredSlice.reducer;
