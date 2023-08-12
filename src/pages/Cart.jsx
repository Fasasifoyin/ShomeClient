import React from "react";
import PagesStart from "../component/PagesStart";
import {
  CartItems,
  addToCart,
  increaseCart,
  decreaseCart,
  clearCart,
} from "../features/CartandWish";
import { useSelector, useDispatch } from "react-redux";
import { Button, Container, Image } from "react-bootstrap";
import { formatCurrency } from "../utils/formatCurrency";
import { AiOutlinePlus, AiOutlineMinus, AiFillDelete } from "react-icons/ai";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { selectedUser } from "../features/UserSlice";

const Cart = () => {
  const { search } = useLocation()
  const redirectUrl = new URLSearchParams(search).get("redirect")
  const redirect = redirectUrl ? redirectUrl : "/shipping"
  const cart = useSelector(CartItems);
  const user = useSelector(selectedUser);
  console.log(user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const total = cart.reduce((p, c) => {
    return p + Number(c.qty * c.newPrice);
  }, 0);

  const totalPrice = total;
  const discount = 0.03 * totalPrice;

  return (
    <div className="mb-5">
      <PagesStart page={"SHOPPING CART"} />
      <div className="mt-5">
        <Container>
          <div
            className="w-100 d-flex justify-content-between p-4 we fw-bold"
            style={{ background: "rgb(247,247,247)", gap: "1%" }}
          >
            <div>
              <p className="mb-0 text-break">Product</p>
            </div>
            <div>
              <p className="mb-0 text-break">Price</p>
            </div>
            <div>
              <p className="mb-0 text-break">Quantity</p>
            </div>
            <div>
              <p className="mb-0 text-break">Total</p>
            </div>
          </div>
          <div className="mt-4">
            {cart.length > 0 ? (
              cart.map((each) => (
                <div className="mb-4" key={each._id}>
                  <div className="w-100 d-flex justify-content-between align-items-center we px-4">
                    <div className="d-flex gap-2 align-items-center">
                      <AiFillDelete
                        className="cursor"
                        onClick={() => dispatch(addToCart(each))}
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
                    <div>{formatCurrency(each.newPrice)}</div>
                    <div>
                      <div className="w-100 border border-subtle px-md-1 py-2 rounded-2 d-flex justify-content-between align-items-center">
                        <AiOutlineMinus
                          className="cursor"
                          onClick={() => dispatch(decreaseCart(each))}
                          size="1.2rem"
                        />
                        <span className="text-break">{each.qty}</span>
                        <AiOutlinePlus
                          className="cursor"
                          onClick={() => dispatch(increaseCart(each))}
                          size="1.2rem"
                        />
                      </div>
                    </div>
                    <div className="text-break">
                      {formatCurrency(each.newPrice * each.qty)}
                    </div>
                  </div>
                  <hr />
                </div>
              ))
            ) : (
              <div className="d-flex flex-column gap-2 justify-content-center align-items-center">
                <p className=" mb-0">You have no product on your cart</p>
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
          {cart.length > 0 && (
            <div className="d-flex justify-content-between px-2">
              <Link to="/products">
                <Button className="button rounded-0" style={{ height: "50px" }}>
                  Continue shopping
                </Button>
              </Link>
              <Button
                className="button2 rounded-0"
                style={{ height: "50px" }}
                onClick={() => dispatch(clearCart())}
              >
                Clear cart
              </Button>
            </div>
          )}
          {cart.length > 0 && (
            <div className="w-100 d-flex flex-column gap-3 align-items-end mt-5">
              <div
                className="p-5"
                style={{
                  width: "100%",
                  maxWidth: "300px",
                  background: "rgb(247,247,247)",
                }}
              >
                <p>Subtotal: {formatCurrency(totalPrice)}</p>
                <p>Discount: {totalPrice > 20000 ? `-${discount}` : 0}</p>
                <p>
                  Total:{" "}
                  {totalPrice > 20000
                    ? formatCurrency(totalPrice - discount)
                    : formatCurrency(totalPrice)}{" "}
                </p>
                {totalPrice <= 20000 && (
                  <p className="small text-danger">
                    Get 3% discount when you buy products worth more than
                    $20,000.00
                  </p>
                )}
              </div>
              {user.token ? (
                <Link to={redirect}>
                  <Button
                    className="button2 rounded-0"
                    style={{ height: "50px", width: "100%", maxWidth: "300px" }}
                  >
                    Proceed to checkout
                  </Button>
                </Link>
              ) : (
                <Button
                  onClick={() => navigate("/signin?redirect=/shipping")}
                  className="button2 rounded-0"
                  style={{ height: "50px", width: "100%", maxWidth: "300px" }}
                >
                  Proceed to checkout
                </Button>
              )}
            </div>
          )}
        </Container>
      </div>
    </div>
  );
};

export default Cart;
