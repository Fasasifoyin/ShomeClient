import { createSlice } from "@reduxjs/toolkit";
import { getTrendingCategory } from "../actions/Products";

const initialState = {
  trendCategory: [],
  status: "idle",
  error: null,
};

const trendCategorySlice = createSlice({
  name: "trendCategory",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTrendingCategory.pending, (state, action) => {
        return {
          ...state,
          status: "pending",
        };
      })
      .addCase(getTrendingCategory.fulfilled, (state, action) => {
        return {
          ...state,
          status: "success",
          trendCategory: action.payload,
        };
      })
      .addCase(getTrendingCategory.rejected, (state, action) => {
        return {
          ...state,
          status: "failed",
          errors: action.payload,
        };
      });
  },
});

export const selectedTrend = (state) =>
  state.trendCategory.trendCategory;
export const selectedTrendError = (state) => state.trendCategory.error;
export const selectedTrendStatus = (state) => state.trendCategory.status;

export default trendCategorySlice.reducer;
