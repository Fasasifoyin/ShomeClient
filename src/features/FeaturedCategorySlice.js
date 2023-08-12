import { createSlice } from "@reduxjs/toolkit";
import { getFeaturedCategory } from "../actions/Products";

const initialState = {
  featuredCategory: [],
  status: "idle",
  error: null,
};

const featuredCategorySlice = createSlice({
  name: "featuredCategory",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFeaturedCategory.pending, (state, action) => {
        return {
          ...state,
          status: "pending",
        };
      })
      .addCase(getFeaturedCategory.fulfilled, (state, action) => {
        return {
          ...state,
          status: "success",
          featuredCategory: action.payload,
        };
      })
      .addCase(getFeaturedCategory.rejected, (state, action) => {
        return {
          ...state,
          status: "failed",
          errors: action.payload,
        };
      });
  },
});

export const selectedFeatured = (state) =>
  state.featuredCategory.featuredCategory;
export const selectedFeaturedError = (state) => state.featuredCategory.error;
export const selectedFeaturedStatus = (state) => state.featuredCategory.status;

export default featuredCategorySlice.reducer;
