import React from "react";
import { Button } from "react-bootstrap";

const Logout = ({ close, action, actionName, actionType }) => {
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
          <div
            className="d-flex flex-column justify-content-between py-2"
            style={{
              backgroundColor: "rgb(230, 230, 230)",
              height: "150px",
              width: "100%",
              maxWidth: "500px",
              boxShadow: "1px 1px 1px crimson",
            }}
          >
            <p className="mt-4 text-center">{actionType}</p>
            <div className="d-flex justify-content-between px-3">
              <Button
                onClick={() => close(false)}
                size="sm"
                className="rounded-0 button"
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  close(false);
                  action();
                }}
                size="sm"
                className="rounded-0 button2"
              >
                {actionName}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Logout;
