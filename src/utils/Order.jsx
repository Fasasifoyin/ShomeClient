import React from "react";
import Spinner2 from "./Spinner2";

const Order = ({ close, action, actionName, actionType }) => {
  return (
    <div
      className="position-fixed"
      style={{
        width: "100%",
        height: "100%",
        top: "0",
        left: "0",
        zIndex: "15",
      }}
    >
      <div
        className="position-fixed"
        style={{
          width: "100%",
          height: "100%",
          top: "0",
          left: "0",
          backgroundColor: "black",
          opacity: "0.7",
        }}
      />
      <div
        className="position-fixed"
        style={{
          width: "100%",
          height: "100%",
          top: "0",
          left: "0",
        }}
      >
        <div className="w-100 h-100 d-flex justify-content-center align-items-center">
          <Spinner2 />
        </div>
      </div>
    </div>
  );
};

export default Order;
