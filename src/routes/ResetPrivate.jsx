import React, { useState, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";

const ResetPrivate = ({ children }) => {
  const location = useLocation();
  const [flag, setFlag] = useState(JSON.parse(localStorage.getItem("flag")));

  useEffect(() => {
    setFlag(JSON.parse(localStorage.getItem("flag")));
  }, [location]);

  return (
    <>{flag ? children : <Navigate to={"/"} state={{ from: location }} />}</>
  );
};

export default ResetPrivate;
