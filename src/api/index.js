import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API,
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem("shomeUser")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("shomeUser")).token
    }`;
  }

  return req;
});

export const signUp = (form) => API.post("/api/user/signup", form);
export const signIn = (form) => API.post("/api/user/signin", form);
export const mail = ({ email, firstName, lastName, text, subject }) =>
  API.post("/api/user/mail", { email, firstName, lastName, text, subject });
export const generate = (form) => API.post("/api/user/generate", form);
export const verify = (form) => API.post("/api/user/verify", form);

export const update = (form) => API.put("/api/user/update", form);
export const change = (form) => API.put("/api/user/change", form);
export const reset = (form) => API.put("/api/user/reset", form);

export const getUser = (email) => API.get(`/api/user/get/${email}`);

export const getAllUsers = () => API.get("/api/user/allusers");

export const editUser = (form) => API.put("/api/user/edit", form);

export const Products = (page) => API.get(`/api/import/products/${page}`);

export const myProducts = (page, email) =>
  API.get(`/api/import/products/myproducts/${page}`);

export const featuredProducts = () => API.get("/api/import/featured");
export const trendProducts = () => API.get("/api/import/trend");

export const getCategories = () => API.get("/api/categories");

export const getFeaturedCategory = (category) =>
  API.get(`/api/import/featured/${category}`);
export const getTrendingCategory = (category) =>
  API.get(`/api/import/trending/${category}`);

export const getSingleProduct = (slug) => API.get(`/api/import/${slug}`);

export const likeProduct = (id) => API.patch(`/api/import/like/${id}`);

export const comments = (id, details) =>
  API.post(`/api/import/comments/${id}`, details);
export const deleteComment = (id, commentId) =>
  API.patch(`/api/import/deletecomment/${id}`, commentId);

export const fetchSearch = (search) =>
  API.get(`/api/search?searchQuery=${search}`);

export const deleteProduct = (id) =>
  API.delete(`/api/import/product/delete/${id}`);

export const createProduct = (product) =>
  API.post("/api/import/createproduct", product);

export const createOrder = (order) =>
  API.post("/api/import/create/order", order);

export const getOrder = (orderId) =>
  API.get(`/api/import/get/order/${orderId}`);

export const clientId = () => API.get("/api/keys/paypal");

export const paypalPayment = ({ id, details }) =>
  API.put(`/api/import/update/${id}/pay`, details);

export const getUserOrders = () => API.get("/api/import/get/userOrders");
