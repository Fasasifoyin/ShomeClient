import React from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import { FaLessThan } from "react-icons/fa";
import { BsFillPersonFill } from "react-icons/bs";
import { NavLink } from "react-router-dom";

const Menu = ({ show, handleClose, user, setOut }) => {
  return (
    <div className="d-lg-none">
      <Offcanvas
        style={{ backgroundColor: "rgb(31, 31, 31)" }}
        backdrop="static"
        show={show}
        onHide={handleClose}
        placement="start"
      >
        <Offcanvas.Header className="menuHeader">
          <Offcanvas.Title className="w-100">
            <div className="d-flex justify-content-between align-items-center">
              <span className="text-white fs-3">Menu</span>
              <FaLessThan
                className="cursor"
                onClick={handleClose}
                color="white"
              />
            </div>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {user?.token && (
            <p className="text-white">
              Welcome {user.firstName} {user.lastName}
            </p>
          )}
          {user?.token && (
            <>
              <div className="d-flex gap-1 align-items-center">
                <BsFillPersonFill size="1.5rem" color="#eb3e32" />
                <NavLink
                  to="/account"
                  style={({ isActive }) => ({
                    color: isActive ? "#eb3e32" : "white",
                    fontWeight: isActive ? "bold" : "",
                  })}
                >
                  <span className="fs-5" onClick={handleClose}>
                    Account
                  </span>
                </NavLink>
              </div>

              <hr style={{ border: "1px solid rgb(255, 255, 255)" }} />
            </>
          )}

          {user?.token ? (
            <p
              className="fs-5 text cursor"
              onClick={() => {
                handleClose();
                setOut(true);
              }}
            >
              Log out
            </p>
          ) : (
            <NavLink
              to="/signin"
              style={({ isActive }) => ({
                color: isActive ? "#eb3e32" : "white",
                fontWeight: isActive ? "bold" : "",
              })}
            >
              <p className="fs-5" onClick={handleClose}>
                Sign in
              </p>
            </NavLink>
          )}

          <hr style={{ border: "1px solid rgb(255, 255, 255)" }} />
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
};

export default Menu;
