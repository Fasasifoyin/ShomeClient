import React from "react";
import PagesStart from "../component/PagesStart";
import { formatCurrency } from "../utils/formatCurrency";

import { useDispatch, useSelector } from "react-redux";
import {
  Wish,
  addToCart,
  CartItems,
  addWish,
  clearWish,
} from "../features/CartandWish";
import { Button, Container, Image } from "react-bootstrap";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";

const WishList = () => {
  const wishList = useSelector(Wish);
  const cart = useSelector(CartItems);
  const dispatch = useDispatch();

  const intersection = wishList.filter(element => cart.some(ele => ele._id === element._id))

  return (
    <div className="mb-5">
      <PagesStart page={"WISHLIST"} />
      <div className="mt-5">
        <Container>
          <div
            className="d-flex font-size fw-bold p-4"
            style={{ gap: "1%", backgroundColor: "rgb(247,247,247)" }}
          >
            <div style={{ width: "49%" }}>Product</div>
            <div style={{ width: "19%" }}>Price</div>
          </div>
          <div className="mt-4">
            {wishList.length > 0 ? (
              wishList.map((each) => (
                <div key={each._id} className="mb-4">
                  <div
                    className="d-flex justify-content-between px-4 align-items-center font-size"
                    style={{ gap: "1%" }}
                  >
                    <div
                      style={{ width: "49%" }}
                      className="d-flex gap-2 align-items-center"
                    >
                      <AiFillDelete
                        className="cursor"
                        onClick={() => dispatch(addWish(each))}
                        size="1.2rem"
                      />
                      <div
                        className="d-none d-lg-block"
                        style={{ width: "120px", height: "120px" }}
                      >
                        <Image
                          className="w-100 h-100"
                          style={{ objectFit: "cover" }}
                          src={each.image}
                        />
                      </div>
                      <p className="text-break mb-0">{each.title}</p>
                    </div>
                    <div style={{ width: "19%" }}>
                      {formatCurrency(each.newPrice)}
                    </div>
                    <div style={{ width: "30%" }}>
                      <Button
                        className="w-100 button2 rounded-0 py-1"
                        style={{ height: "50px" }}
                        onClick={() => dispatch(addToCart(each))}
                      >
                        {intersection.includes(each) ? "Remove from Cart" : "Add to Cart"}
                      </Button>
                    </div>
                  </div>
                  <hr />
                </div>
              ))
            ) : (
              <div className="d-flex flex-column gap-2 justify-content-center align-items-center">
                <p className=" mb-0">You have no product on your wishlist</p>
                <Link to="/products">
                  <Button
                    className="button rounded-0"
                    style={{ height: "50px" }}
                  >
                    Continue shopping
                  </Button>
                </Link>
              </div>
            )}
          </div>
          {wishList.length > 0 && (
            <div className="d-flex justify-content-between px-2">
              <Link to="/products">
                <Button className="button rounded-0" style={{ height: "50px" }}>
                  Continue shopping
                </Button>
              </Link>
              <Button
                className="button2 rounded-0"
                style={{ height: "50px" }}
                onClick={() => dispatch(clearWish())}
              >
                Clear Wishlist
              </Button>
            </div>
          )}
        </Container>
      </div>
    </div>
  );
};

export default WishList;
