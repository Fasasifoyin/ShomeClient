import * as api from "../api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

export const getProducts = createAsyncThunk(
  "/products/getProducts",
  async (page, { rejectWithValue }) => {
    try {
      const { data } = await api.Products(page);
      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);

export const getMyProducts = createAsyncThunk(
  "/myProducts/getMyProducts",
  async (form, { rejectWithValue }) => {
    try {
      const { page } = form;
      const { data } = await api.myProducts(page);
      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);

export const getFeatured = createAsyncThunk(
  "/featured/getFeatured",
  async (form, { rejectWithValue }) => {
    try {
      const { data } = await api.featuredProducts();
      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);

export const getTrend = createAsyncThunk(
  "/trend/getTrend",
  async (form, { rejectWithValue }) => {
    try {
      const { data } = await api.trendProducts();
      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);

export const getCategories = createAsyncThunk(
  "/category/getCategories",
  async (form, { rejectWithValue }) => {
    try {
      const { data } = await api.getCategories();
      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);

export const getFeaturedCategory = createAsyncThunk(
  "/featuredCategory/getFeaturedCategory",
  async (form, { rejectWithValue }) => {
    try {
      const { category } = form;
      const { data } = await api.getFeaturedCategory(category);
      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);

export const getTrendingCategory = createAsyncThunk(
  "/trendCategory/getTrendingCategory",
  async (form, { rejectWithValue }) => {
    try {
      const { category } = form;
      const { data } = await api.getTrendingCategory(category);
      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);

export const getSingle = createAsyncThunk(
  "/single/getSingle",
  async (form, { rejectWithValue }) => {
    try {
      const { slug } = form;
      const { data } = await api.getSingleProduct(slug);
      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);

export const likeProduct = createAsyncThunk(
  "/products/likeProduct",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await api.likeProduct(id);
      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);

export const getSearch = createAsyncThunk(
  "/search/getSearch",
  async (form, { rejectWithValue }) => {
    try {
      const { data } = await api.fetchSearch(form);
      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);

export const comments = createAsyncThunk(
  "/products/comments",
  async (form, { rejectWithValue }) => {
    try {
      const { id } = form;
      const { value } = form;
      const { data } = await api.comments(id, value);
      toast.success("Thanks for leaving a review");
      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);

export const deleteComment = createAsyncThunk(
  "/products/deleteComment",
  async (form, { rejectWithValue }) => {
    try {
      const { sentId } = form;
      const { id } = form;
      const { data } = await api.deleteComment(id, sentId);
      toast.success("Comment deleted successfully");
      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "/myProducts/deleteProduct",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await api.deleteProduct(id);
      toast.success("Product deleted successfully");
      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);

export const createProduct = createAsyncThunk(
  "/myProduct/createProduct",
  async (product, { rejectWithValue }) => {
    const { navigate, setSubmitting } = product;
    try {
      const { navigate: _, ...Product } = product;
      delete Product.setSubmitting;
      const { data, status } = await api.createProduct(Product);
      if (status === 201) {
        toast.success(`${data?.title} created successfully`);
      }
      setSubmitting(false);
      navigate("/");
      return data;
    } catch (error) {
      setSubmitting(false);
      console.log(error);
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const createOrder = createAsyncThunk(
  "/order/createOrder",
  async (order, { rejectWithValue }) => {
    const { navigate } = order;
    try {
      const { data, status } = await api.createOrder(order);
      if (status === 201) {
        toast.success("Order created successfully");
        navigate(`/order/${data._id}`);
      }
      return data;
    } catch (error) {
      toast.error("An error occured. please try again later");
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const getOrder = createAsyncThunk(
  "/order/getOrder",
  async (orderId, { rejectWithValue }) => {
    try {
      const { data } = await api.getOrder(orderId);
      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const getClientId = createAsyncThunk(
  "/paypal/getClientId",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.clientId();
      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const paypalPaid = createAsyncThunk(
  "/order/paypalPaid",
  async (all, { rejectWithValue }) => {
    try {
      const { data } = await api.paypalPayment(all);
      toast.success("Payment successful");
      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const getUserOrders = createAsyncThunk(
  "/order/getUserOrders",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.getUserOrders();
      return data
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data.message);
    }
  }
);
