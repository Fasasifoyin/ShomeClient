import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/UserSlice";
import productReducer from "./features/ProductSlice";
import featuredReducer from "./features/FeaturedSlice";
import trendReducer from "./features/TrendSlice";
import categoriesReducer from "./features/CategorySlice";
import featuredCategoryReducer from "./features/FeaturedCategorySlice";
import trendCategoryReducer from "./features/TrendCategorySlice";
import singleReducer from "./features/SingleSlice";
import cartReducer from "./features/CartandWish";
import searchReducer from "./features/SearchSlice";
import myProductsReducer from "./features/Myproducts";
import getAllUserReducer from "./features/AlluserSlice";
import orderReducer from "./features/OrderSlice";
import paypalReducer from "./features/Paypal";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
    featured: featuredReducer,
    trend: trendReducer,
    category: categoriesReducer,
    featuredCategory: featuredCategoryReducer,
    trendCategory: trendCategoryReducer,
    product: singleReducer,
    cart: cartReducer,
    search: searchReducer,
    mine: myProductsReducer,
    users: getAllUserReducer,
    order: orderReducer,
    paypal: paypalReducer,
  },
});
