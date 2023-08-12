import React from "react";
import { Button, Image } from "react-bootstrap";
import Offcanvas from "react-bootstrap/Offcanvas";
import { FaGreaterThan } from "react-icons/fa";
import { Link } from "react-router-dom";
import { formatCurrency } from "../utils/formatCurrency";

import { CartItems, addToCart } from "../features/CartandWish";
import { useSelector, useDispatch } from "react-redux";
import { MdCancel } from "react-icons/md";

const Cart = ({ show, handleClose }) => {
  const cart = useSelector(CartItems);
  const dispatch = useDispatch();

  return (
    <div className="d-lg-none">
      <Offcanvas
        show={show}
        onHide={handleClose}
        backdrop="static"
        placement="end"
      >
        <Offcanvas.Header className="cartHeader">
          <Offcanvas.Title className="w-100">
            <div className="d-flex justify-content-between align-items-center">
              <span className="fs-3" style={{ color: "#eb3e32" }}>
                Cart
              </span>
              <FaGreaterThan
                className="cursor"
                onClick={handleClose}
                color="#eb3e32"
              />
            </div>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="d-flex flex-column gap-3 px-4">
            <div className="d-flex flex-column gap-3">
              {cart.length > 0 ? (
                cart
                  .slice(0)
                  .reverse()
                  .map((each) => (
                    <div
                      key={each._id}
                      className="d-flex justify-content-between"
                    >
                      <div style={{ width: "85%" }} className="d-flex gap-2">
                        <div style={{ width: "35%", height: "120px" }}>
                          <Image
                            className="w-100 h-100"
                            style={{ objectFit: "cover" }}
                            src={each.image}
                          />
                        </div>
                        <div className="py-1">
                          <p>
                            {each.title.length > 19
                              ? `${each.title.slice(0, 16)}...`
                              : each.title}
                          </p>
                          <span>
                            {each.qty} * {formatCurrency(each.newPrice)}
                          </span>
                        </div>
                      </div>
                      <div
                        className="d-flex justify-content-center align-items-center cursor"
                        style={{
                          width: "35px",
                          height: "35px",
                          borderRadius: "50%",
                          border: "1px solid #eb3e32",
                        }}
                        onClick={() => dispatch(addToCart(each))}
                      >
                        <MdCancel size="1.5rem" />
                      </div>
                    </div>
                  ))
              ) : (
                <div className="d-flex flex-column gap-2 justify-content-center align-items-center">
                  <p className=" mb-0">You have no product on your cart</p>
                  <Link to="/products">
                    <Button
                      className="button rounded-0"
                      style={{ height: "50px" }}
                      onClick={handleClose}
                    >
                      Continue shopping
                    </Button>
                  </Link>
                </div>
              )}
            </div>
            {cart.length > 0 && (
              <>
                <Link to="/cart">
                  <Button
                    onClick={handleClose}
                    className="button2 rounded-0 w-100 fs-4"
                    style={{ height: "50px" }}
                  >
                    View Cart
                  </Button>
                </Link>
                <Link to="/shipping">
                  <Button
                    onClick={handleClose}
                    className="button2 rounded-0 w-100 fs-4"
                    style={{ height: "50px" }}
                  >
                    Checkout
                  </Button>
                </Link>
              </>
            )}
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
};

export default Cart;
