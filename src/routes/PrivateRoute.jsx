import React, { useState, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("shomeUser"))
  );

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("shomeUser")));
  }, [location]);

  return (
    <>
      {user?.token ? (
        children
      ) : (
        <Navigate to={"/signin"} state={{ from: location }} />
      )}
    </>
  );
};

export default PrivateRoute;
