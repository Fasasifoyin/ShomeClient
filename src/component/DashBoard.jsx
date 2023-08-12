import React from "react";

const DashBoard = ({ user }) => {
  return (
    <div className="border border-subtle py-4 px-4">
      <p className="fs-5">Dashboard</p>
      <div style={{ border: "1px dashed black" }} className="mb-3" />
      <p>
        Hello{" "}
        <span style={{ color: "#eb3e32" }}>
          {user?.firstName} {user?.lastName}
        </span>
        , From your account dashboard. you can easily check & view your recent
        orders, manage products created by you and edit your password and
        account details.
      </p>
    </div>
  );
};

export default DashBoard;
