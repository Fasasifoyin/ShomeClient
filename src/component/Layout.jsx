import React from "react";
import Navbar from "./Navbar";
import LgSearch from "./LgSearch";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <Navbar />
      <div style={{ paddingTop: "70px" }}>
        <LgSearch />
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
