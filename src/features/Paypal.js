import { createSlice } from "@reduxjs/toolkit";
import { getClientId } from "../actions/Products";

const initialState = {
  clientId: null,
  loading: "idle",
  error: null,
};

const paypalSlice = createSlice({
  name: "paypal",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getClientId.pending, (state, action) => {
        return {
          ...state,
          loading: "pending",
        };
      })
      .addCase(getClientId.fulfilled, (state, action) => {
        return {
          ...state,
          loading: "success",
          clientId: action.payload,
        };
      })
      .addCase(getClientId.rejected, (state, action) => {
        return {
          ...state,
          loading: "failed",
          error: action.payload,
        };
      });
  },
});

export const Client = (state) => state.paypal.clientId;
export const Status = (state) => state.paypal.loading;
export const Error = (state) => state.paypal.error;

export default paypalSlice.reducer;
