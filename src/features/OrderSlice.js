import { createSlice } from "@reduxjs/toolkit";
import {
  createOrder,
  getOrder,
  getUserOrders,
  paypalPaid,
} from "../actions/Products";

const initialState = {
  order: {},
  orders: [],
  loading: "idle",
  error: null,
};

const orderSchema = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state, action) => {
        return {
          ...state,
          loading: "creating",
        };
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        return {
          ...state,
          loading: "success",
        };
      })
      .addCase(createOrder.rejected, (state, action) => {
        return {
          ...state,
          loading: "failed",
          error: action.payload,
        };
      })
      .addCase(getOrder.pending, (state, action) => {
        return {
          ...state,
          loading: "pending",
        };
      })
      .addCase(getOrder.fulfilled, (state, action) => {
        return {
          ...state,
          loading: "success",
          order: action.payload,
        };
      })
      .addCase(getOrder.rejected, (state, action) => {
        return {
          ...state,
          loading: "failed",
          error: action.payload,
        };
      })
      .addCase(paypalPaid.pending, (state, action) => {
        return {
          ...state,
          loading: "paypalPending",
        };
      })
      .addCase(paypalPaid.fulfilled, (state, action) => {
        return {
          ...state,
          loading: "success",
          order: action.payload,
        };
      })
      .addCase(paypalPaid.rejected, (state, action) => {
        return {
          ...state,
          loading: "failed",
          error: action.payload,
        };
      })
      .addCase(getUserOrders.pending, (state, action) => {
        return {
          ...state,
          loading: "pending",
        };
      })
      .addCase(getUserOrders.fulfilled, (state, action) => {
        return {
          ...state,
          loading: "success",
          orders: action.payload,
        };
      })
      .addCase(getUserOrders.rejected, (state, action) => {
        return {
          ...state,
          loading: "failed",
          error: action.payload,
        };
      });
  },
});

export const Order = (state) => state.order.order;
export const Orders = (state) => state.order.orders;
export const Status = (state) => state.order.loading;
export const Error = (state) => state.order.error;

export default orderSchema.reducer;
