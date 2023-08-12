import { createSlice } from "@reduxjs/toolkit";
import {
  deleteProduct,
  getMyProducts,
  createProduct,
} from "../actions/Products";

const initialState = {
  products: [],
  deleted: {},
  status: "idle",
  error: null,
};

const myProductsSlice = createSlice({
  name: "myProducts",
  initialState,
  reducers: {
    changeError: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMyProducts.pending, (state, action) => {
        return {
          ...state,
          status: "pending",
        };
      })
      .addCase(getMyProducts.fulfilled, (state, action) => {
        return {
          ...state,
          products: action.payload,
          status: "success",
        };
      })
      .addCase(getMyProducts.rejected, (state, action) => {
        return {
          ...state,
          error: action.payload,
          status: "rejected",
        };
      })
      .addCase(deleteProduct.pending, (state, action) => {
        return {
          ...state,
          status: "pending",
        };
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        return {
          ...state,
          deleted: action.payload,
          status: "success",
        };
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        return {
          ...state,
          error: action.payload,
          status: "rejected",
        };
      })
      .addCase(createProduct.pending, (state, action) => {
        return {
          ...state,
          status: "pending",
        };
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        return {
          products: [...state.products, action.payload],
        };
      })
      .addCase(createProduct.rejected, (state, action) => {
        return {
          ...state,
          error: action.payload,
          status: "rejected",
        };
      });
  },
});

export const { changeError } = myProductsSlice.actions;

export const myProducts = (state) => state.mine.products;
export const myProductsE = (state) => state.mine.error;
export const myProductsS = (state) => state.mine.status;
export const myDeleted = (state) => state.mine.deleted;

export default myProductsSlice.reducer;
