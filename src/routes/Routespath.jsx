import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "../component/Layout";
import Home from "../pages/Home";
import Signin from "../pages/Signin";
import Signup from "../pages/Signup";
import WishList from "../pages/WishList";
import Account from "../pages/Account";
import Cart from "../pages/Cart";
import Forget from "../pages/Forget";
import OTP from "../pages/OTP";
import Reset from "../pages/Reset";
import Category from "../pages/Category";
import SingleProduct from "../pages/SingleProduct";
import AllProducts from "../pages/AllProducts";
import Search from "../pages/Search";

import PrivateRoute from "./PrivateRoute";
import ResetPrivate from "./ResetPrivate";
import ErrorPage from "../pages/ErrorPage";
import Shipping from "../pages/Shipping";
import Payment from "../pages/Payment";
import Placeholder from "../pages/Placeholder";
import Ordered from "../pages/Ordered";

const routes = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/signin",
        element: <Signin />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/account",
        element: (
          <PrivateRoute>
            <Account />
          </PrivateRoute>
        ),
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/wishlist",
        element: <WishList />,
      },
      {
        path: "/forget",
        element: <Forget />,
      },
      {
        path: "/verify",
        element: <OTP />,
      },
      {
        path: "/categories/:category",
        element: <Category />,
      },
      {
        path: "/:slug",
        element: <SingleProduct />,
      },
      {
        path: "/products",
        element: <AllProducts />,
      },
      {
        path: "/shipping",
        element: (
          <PrivateRoute>
            <Shipping />
          </PrivateRoute>
        ),
      },
      {
        path: "/placeorder",
        element: (
          <PrivateRoute>
            <Placeholder />
          </PrivateRoute>
        ),
      },
      {
        path: "/order/:orderId",
        element: (
          <PrivateRoute>
            <Ordered />
          </PrivateRoute>
        ),
      },
      {
        path: "/payment",
        element: (
          <PrivateRoute>
            <Payment />
          </PrivateRoute>
        ),
      },
      {
        path: "/products/search",
        element: <Search />,
      },
      {
        path: "*",
        element: <ErrorPage />,
      },
      {
        path: "/reset",
        element: (
          <ResetPrivate>
            <Reset />
          </ResetPrivate>
        ),
      },
    ],
  },
];

const Routespath = () => {
  const router = createBrowserRouter(routes);

  return <RouterProvider router={router} />;
};

export default Routespath;
