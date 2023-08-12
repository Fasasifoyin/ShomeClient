import { createSlice } from "@reduxjs/toolkit";
import {
  comments,
  deleteComment,
  getProducts,
  likeProduct,
} from "../actions/Products";

const initialState = {
  products: [],
  currentPage: 0,
  numberOfPage: 0,
  status: "idle",
  error: null,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state, action) => {
        return {
          ...state,
          status: "pending",
        };
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        return {
          ...state,
          products: action.payload?.products,
          numberOfPage: action.payload?.numberOfPage,
          status: "success",
        };
      })
      .addCase(getProducts.rejected, (state, action) => {
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
          products: state.products.map((each) =>
            each._id === action.payload?._id ? action.payload : each
          ),
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
          products: state.products.map((each) =>
            each?._id === action.payload?._id ? action.payload : each
          ),
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
          products: state.products.map((each) =>
            each?._id === action.payload?._id ? action.payload : each
          ),
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

export const allProducts = (state) => state.products.products;
export const allStatus = (state) => state.products.status;
export const allError = (state) => state.products.error;
export const Number = (state) => state.products.numberOfPage;

export default productSlice.reducer;
