import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { BsSearch, BsBag } from "react-icons/bs";
import { TbJewishStar } from "react-icons/tb";
import { MdCancel } from "react-icons/md";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Cart from "./Cart";
import { CartItems, Wish } from "../features/CartandWish";

import { useSelector } from "react-redux";

const LgSearch = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const searchQuery = query.get("searchQuery");
  const [search, setSearch] = useState(searchQuery || "");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (search) {
      navigate(`products/search?searchQuery=${search}`);
    } else {
      navigate("/");
    }
  };

  const [showCart, setShowCart] = useState(false);
  const cart = useSelector(CartItems);
  const wish = useSelector(Wish);

  const handleCloseCart = () => setShowCart(false);
  const handleShowCart = () => setShowCart(true);

  return (
    <Container>
      <div className="px-4 mt-3 d-none d-lg-flex justify-content-between align-items-center">
        <Link to="/">
          <span className="fs-2 fw-bold" style={{ color: "#eb3e32" }}>
            SHOME
          </span>
        </Link>
        <div className="searchLG d-flex justify-content-between ps-2">
          <div className="d-flex align-items-center">
            <form onSubmit={handleSubmit}>
              <input
                className="search"
                type="text"
                placeholder="Search Products"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                // onKeyDown={handleKeyPress}
              />
            </form>
            {search && (
              <div>
                <MdCancel
                  onClick={() => setSearch("")}
                  size="1.4rem"
                  className="cursor"
                />
              </div>
            )}
          </div>
          <div
            onClick={handleSubmit}
            className="besideSearch d-flex justify-content-center align-items-center"
          >
            <BsSearch size="1.5rem" color="white" />
          </div>
        </div>
        <div className="d-flex gap-3 align-items-center">
          <div className="position-relative">
            <Link to="/wishlist">
              <TbJewishStar className="navLgIcon" size="1.7rem" />
            </Link>
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              {wish.length}
              <span className="visually-hidden">unread messages</span>
            </span>
          </div>

          <div className="position-relative" onClick={handleShowCart}>
            <BsBag className="navLgIcon" size="1.5rem" />
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              {cart.length}
              <span className="visually-hidden">unread messages</span>
            </span>
          </div>
        </div>
      </div>
      {showCart && <Cart show={showCart} handleClose={handleCloseCart} />}
    </Container>
  );
};

export default LgSearch;
