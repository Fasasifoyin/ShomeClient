import { createSlice } from "@reduxjs/toolkit";
import {
  comments,
  deleteComment,
  getSingle,
  likeProduct,
} from "../actions/Products";

const initialState = {
  product: {},
  status: "idle",
  error: null,
};

const singleSlice = createSlice({
  name: "single",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSingle.pending, (state, action) => {
        return {
          ...state,
          status: "pending",
        };
      })
      .addCase(getSingle.fulfilled, (state, action) => {
        return {
          ...state,
          product: action.payload,
          status: "success",
        };
      })
      .addCase(getSingle.rejected, (state, action) => {
        return {
          ...state,
          error: action.payload,
          status: "rejected",
        };
      })
      .addCase(likeProduct.pending, (state, action) => {
        return {
          ...state,
        };
      })
      .addCase(likeProduct.fulfilled, (state, action) => {
        return {
          ...state,
          product: action.payload,
        };
      })
      .addCase(likeProduct.rejected, (state, action) => {
        return {
          ...state,
          error: action.payload,
        };
      })
      .addCase(comments.pending, (state, action) => {
        return {
          ...state,
        };
      })
      .addCase(comments.fulfilled, (state, action) => {
        return {
          ...state,
          product: action?.payload,
        };
      })
      .addCase(comments.rejected, (state, action) => {
        return {
          ...state,
          error: action.payload,
        };
      })
      .addCase(deleteComment.pending, (state, action) => {
        return {
          ...state,
        };
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        return {
          ...state,
          product: action?.payload,
        };
      })
      .addCase(deleteComment.rejected, (state, action) => {
        return {
          ...state,
          error: action.payload,
        };
      });
  },
});

export const singleProduct = (state) => state.product.product;
export const singleProductStatus = (state) => state.product.status;
export const singleProductError = (state) => state.product.error;

export default singleSlice.reducer;
