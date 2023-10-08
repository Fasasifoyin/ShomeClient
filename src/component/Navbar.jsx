import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { BsFillPersonFill, BsSearch, BsBag } from "react-icons/bs";
import { TbJewishStar } from "react-icons/tb";
import { VscThreeBars } from "react-icons/vsc";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SmSearch from "./SmSearch";
import Menu from "./Menu";
import Cart from "./Cart";
import Logout from "../utils/Logout";

import jwtDecode from "jwt-decode";
import { useSelector, useDispatch } from "react-redux";
import { logout, selectedUser } from "../features/UserSlice";
import { CartItems, Wish } from "../features/CartandWish";

const Navbar = () => {
  const user = useSelector(selectedUser);
  const [out, setOut] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const cart = useSelector(CartItems);
  const wish = useSelector(Wish);

  const loggingOut = () => {
    dispatch(logout());
    navigate("/");
  };

  useEffect(() => {
    const token = user?.token;

    if (!token) {
      return;
    }

    if (token) {
      const decodedToken = jwtDecode(token).exp;

      if (decodedToken.exp < Date.now()) {
        loggingOut();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location, user?.token]);

  useEffect(() => {
    if (out) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [out]);

  const [showLogo, setShowLogo] = useState(false);
  const [show, setShow] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showCart, setShowCart] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleCloseMenu = () => setShowMenu(false);
  const handleShowMenu = () => setShowMenu(true);

  const handleCloseCart = () => setShowCart(false);
  const handleShowCart = () => setShowCart(true);

  const showNav = () => {
    window.scrollY >= 55 ? setShowLogo(true) : setShowLogo(false);
  };

  useEffect(() => {
    showNav();
    window.addEventListener("scroll", showNav);
    return () => {
      window.removeEventListener("scroll", showNav);
    };
  }, []);

  return (
    <>
      <div
        className="position-fixed top-0 w-100"
        style={{
          height: "70px",
          backgroundColor: "rgb(47,51,58)",
          zIndex: 99999,
        }}
      >
        <Container className="h-100">
          <div
            className={
              showLogo
                ? "h-100 d-flex justify-content-between align-items-center"
                : "h-100 d-flex justify-content-between justify-content-lg-end align-items-center"
            }
          >
            {showLogo && (
              <Link to="/" className="d-none d-lg-block">
                <span className="fw-bold display-6 text-white">SHOME</span>
              </Link>
            )}

            <div className="d-none d-lg-flex gap-1 align-items-center">
              {user?.token && (
                <Link to="/account">
                  <div className="px-2 d-flex gap-1 justify-content-center align-items-center navLgHover">
                    <BsFillPersonFill size="1.5rem" color="#eb3e32" />
                    <span className="fs-5">Account</span>
                  </div>
                </Link>
              )}
              {user?.token ? (
                <div
                  onClick={() => setOut(true)}
                  className="navLgHover d-flex justify-content-center align-items-center px-2 cursor"
                >
                  <span className="fs-5">Log out</span>
                </div>
              ) : (
                <Link to="/signin">
                  <div className="navLgHover d-flex justify-content-center align-items-center px-2">
                    <span className="fs-5">Sign in</span>
                  </div>
                </Link>
              )}
            </div>

            <Link to="/" className="d-lg-none">
              <span className="fw-bold display-6 text-white">SHOME</span>
            </Link>
            <div className="d-lg-none d-flex gap-3 align-items-center">
              <BsSearch
                className="navSmIcon"
                size="1.5rem"
                onClick={handleShow}
              />
              <div className="position-relative">
                <Link to="/wishlist">
                  <TbJewishStar className="navSmIcon" size="1.7rem" />
                </Link>
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {wish.length}
                  <span className="visually-hidden">unread messages</span>
                </span>
              </div>
              <div className="position-relative" onClick={handleShowCart}>
                <BsBag className="navSmIcon" size="1.5rem" />
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {cart.length}
                  <span className="visually-hidden">unread messages</span>
                </span>
              </div>
              <VscThreeBars
                className="navSmIcon"
                size="1.7rem"
                onClick={handleShowMenu}
              />
            </div>
          </div>
        </Container>
        {show && <SmSearch show={show} handleClose={handleClose} />}
        {showMenu && (
          <Menu
            setOut={setOut}
            user={user}
            show={showMenu}
            handleClose={handleCloseMenu}
          />
        )}
        {showCart && <Cart show={showCart} handleClose={handleCloseCart} />}
      </div>
      {out && (
        <Logout
          close={setOut}
          action={loggingOut}
          actionName={"Logout"}
          actionType={"Are you sure you want to logout"}
        />
      )}
    </>
  );
};

export default Navbar;
