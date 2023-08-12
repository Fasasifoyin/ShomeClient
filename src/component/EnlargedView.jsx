import React from "react";
import { Button, Image } from "react-bootstrap";
import { MdCancel } from "react-icons/md";
import { formatCurrency, percentage } from "../utils/formatCurrency";

import { addToCart } from "../features/CartandWish";
import { useDispatch, useSelector } from "react-redux";
import { CartItems } from "../features/CartandWish";

const EnlargedView = ({ each, viewBig, index, hideViewBig }) => {
  const cart = useSelector(CartItems);
  const dispatch = useDispatch();

  const existCart = cart.find((item) => item._id === each._id);

  return (
    <div
      className={
        viewBig === index ? "d-none d-lg-block position-fixed" : "d-none"
      }
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
        <div
          className="w-100 d-flex justify-content-center align-items-center"
          style={{ height: "calc(100vh - 70px)", marginTop: "70px" }}
        >
          <div
            style={{
              backgroundColor: "rgb(230, 230, 230)",
              height: "85%",
              width: "920px",
              boxShadow: "1px 1px 1px crimson",
              borderRadius: "20px",
            }}
            className="d-flex justify-content-center align-items-center position-relative"
          >
            <div
              className="position-absolute"
              style={{ top: "10px", right: "10px" }}
            >
              <MdCancel
                size="1.7rem"
                className="cursor"
                onClick={hideViewBig}
              />
            </div>
            {each.oldPrice > each.newPrice && (
                <div
                  className="position-absolute py-1 px-2"
                  style={{
                    background: "red",
                    top: "10px",
                    left: "10px",
                    borderRadius: "5px",
                  }}
                >
                  <span className="text-white">
                    -{percentage(each.newPrice, each.oldPrice).toFixed()}%
                  </span>
                </div>
              )}
            <div className="d-flex justify-content-between align-items-center px-5">
              <div style={{ width: "48%" }}>
                <div className="w-100" style={{ height: "300px" }}>
                  <Image
                    style={{ objectFit: "cover" }}
                    className="w-100 h-100"
                    src={each.image}
                  />
                </div>
              </div>
              <div
                style={{ width: "48%" }}
                className="d-flex flex-column gap-2"
              >
                <h1 className="fw-bold mb-0">{each.title}</h1>
                <p className="fs-3 text-dark mb-0">
                  {each.oldPrice > each.newPrice  && (
                    <>
                      <span className="text-decoration-line-through text-danger">
                        {formatCurrency(each.oldPrice)}
                      </span>{" "}
                    </>
                  )}
                  {formatCurrency(each.newPrice)}
                </p>
                <span>
                  {each.desc.length > 250
                    ? `${each.desc.slice(0, 250)}...`
                    : each.desc}
                </span>
                <div>
                  <span className="my-0">Color:</span>
                  <p
                    className="fs-4 my-0"
                    style={{ color: each.color || "black" }}
                  >
                    {each.color}
                  </p>
                </div>
                <div>
                  <span className="my-0">Brand:</span>
                  <p className="fs-4 my-0">{each.brand}</p>
                </div>
                <div className="mt-3">
                  <Button
                    className="button rounded-0 fs-5"
                    onClick={() => dispatch(addToCart(each))}
                  >
                    {existCart ? `Remove from cart` : `Add to cart`}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnlargedView;
