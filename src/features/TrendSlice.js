import { createSlice } from "@reduxjs/toolkit";
import { getTrend } from "../actions/Products";

const initialState = {
  trend: [],
  status: "idle",
  error: null,
};

const trendSlice = createSlice({
  name: "trend",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTrend.pending, (state, action) => {
        return {
          ...state,
          status: "pending",
        };
      })
      .addCase(getTrend.fulfilled, (state, action) => {
        return {
          ...state,
          trend: action.payload,
          status: "success",
        };
      })
      .addCase(getTrend.rejected, (state, action) => {
        return {
          ...state,
          error: action.payload,
          status: "rejected",
        };
      });
  },
});

export const Trending = (state) => state.trend.trend;
export const trendingStatus = (state) => state.trend.status;
export const trendingError = (state) => state.trend.error;

export default trendSlice.reducer;
