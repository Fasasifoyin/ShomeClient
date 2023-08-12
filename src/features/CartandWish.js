import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
  cart: localStorage.getItem("shomeCart")
    ? JSON.parse(localStorage.getItem("shomeCart"))
    : [],
  wish: localStorage.getItem("shomeWish")
    ? JSON.parse(localStorage.getItem("shomeWish"))
    : [],
  shipping_details: localStorage.getItem("shomeShippingDetails")
    ? JSON.parse(localStorage.getItem("shomeShippingDetails"))
    : {},
  paymentMethod: localStorage.getItem("shomePaymentMethod")
    ? localStorage.getItem("shomePaymentMethod")
    : null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const exist = state.cart?.find((each) => each._id === action.payload._id);
      if (!exist) {
        state.cart.push({ ...action.payload, qty: 1 });
        toast.success(`${action.payload.title} added to cart`);
      } else {
        const newCart = state.cart.filter(
          (each) => each._id !== action.payload._id
        );
        state.cart = newCart;
        toast.success(`${action.payload.title} removed from cart`);
      }
      localStorage.setItem("shomeCart", JSON.stringify(state.cart));
    },
    increaseCart: (state, action) => {
      const exist = state.cart?.find((each) => each._id === action.payload._id);
      if (!exist) {
        state.cart.push({ ...action.payload, qty: 1 });
        toast.success(`${action.payload.title} added to cart`);
      } else {
        const itemIndex = state.cart.findIndex(
          (each) => each._id === exist._id
        );
        state.cart[itemIndex].qty += 1;
      }
      localStorage.setItem("shomeCart", JSON.stringify(state.cart));
    },
    decreaseCart: (state, action) => {
      const exist = state.cart?.find((each) => each._id === action.payload._id);
      if (exist && exist.qty > 1) {
        const itemIndex = state.cart.findIndex(
          (each) => each._id === exist._id
        );
        state.cart[itemIndex].qty -= 1;
      }
      //  else if (exist && exist.qty === 1) {
      //   const newCart = state.cart.filter(
      //     (each) => each._id !== action.payload._id
      //   );
      //   state.cart = newCart;
      //   toast.success(`${action.payload.title} removed from cart`);
      // }
      localStorage.setItem("shomeCart", JSON.stringify(state.cart));
    },
    addWish: (state, action) => {
      const exist = state.wish.find((each) => each._id === action.payload._id);
      if (!exist) {
        state.wish.push(action.payload);
        toast.success(`${action.payload.title} added to wishlist`);
      } else {
        const newWish = state.wish.filter(
          (each) => each._id !== action.payload._id
        );
        state.wish = newWish;
        toast.success(`${action.payload.title} removed from wishlist`);
      }
      localStorage.setItem("shomeWish", JSON.stringify(state.wish));
    },
    clearCart: (state, action) => {
      state.cart = [];
      localStorage.removeItem("shomeCart");
      toast.success("Cart has been cleared");
    },
    clearWish: (state, action) => {
      state.wish = [];
      localStorage.removeItem("shomeWish");
      toast.success("Wishlist has been cleared");
    },
    getShipping: (state, action) => {
      localStorage.setItem(
        "shomeShippingDetails",
        JSON.stringify(action.payload)
      );
      state.shipping_details = action.payload;
    },
    payment: (state, action) => {
      localStorage.setItem("shomePaymentMethod", action.payload);
      state.paymentMethod = action.payload;
    },
  },
});

export const {
  addToCart,
  increaseCart,
  decreaseCart,
  addWish,
  clearCart,
  clearWish,
  getShipping,
  payment,
} = cartSlice.actions;

export const CartItems = (state) => state.cart.cart;
export const Wish = (state) => state.cart.wish;
export const Shipping = (state) => state.cart.shipping_details;
export const PaymentMethod = (state) => state.cart.paymentMethod;

export default cartSlice.reducer;
