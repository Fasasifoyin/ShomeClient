import React, { useState } from "react";
import Checkoutsteps from "../component/Checkoutsteps";
import { useDispatch, useSelector } from "react-redux";
import { CartItems, Shipping, PaymentMethod } from "../features/CartandWish";
import { Button, Col, Container, Image, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { formatCurrency } from "../utils/formatCurrency";
import Logout from "../utils/Logout";
import { toast } from "react-hot-toast";
import { createOrder } from "../actions/Products";
import { Status } from "../features/OrderSlice";
import Order from "../utils/Order";

const Placeholder = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const status = useSelector(Status);
  const [show, setShow] = useState(false);
  const shipping = useSelector(Shipping);
  const paymentMethod = useSelector(PaymentMethod);
  const cart = useSelector(CartItems);

  const total = cart.reduce((p, c) => {
    return p + Number(c.qty * c.newPrice);
  }, 0);

  const discount = 0.03 * total;

  const order = cart.map((each) => ({ ...each, price: each.newPrice }));

  const onPlaceOrder = () => {
    if (!shipping.fullName) {
      toast.error("Fill in shipping information");
      navigate("/shipping?redirect=/placeorder");
    } else if (!paymentMethod) {
      toast.error("Please select a payment method");
      navigate("/payment");
    } else if (!cart.length) {
      toast.error("You do not have any product to purchase");
    } else {
      dispatch(
        createOrder({
          order,
          shippingAddress: shipping,
          paymentMethod,
          itemsPrice: total,
          discount: total > 20000 ? discount : 0,
          totalPrice: total > 20000 ? total - discount : total,
          navigate,
        })
      );
    }
  };

  return (
    <>
      <div className="mt-5 mb-5">
        <Checkoutsteps step1 step2 step3 />
        <Container>
          <h2 className="fw-bold fs-1">Preview Order</h2>
          <Row className="gx-3 gy-4 mt-2">
            <Col xs={12} xl={9}>
              {shipping.fullName && (
                <div
                  className="mb-3 p-3"
                  style={{ border: "1px solid #eb3e32" }}
                >
                  <h4>Shipping Details</h4>
                  <p className="mb-0">
                    <span className="fw-bold">Full Name:</span>{" "}
                    {shipping.fullName}
                  </p>
                  <p className="mb-0">
                    <span className="fw-bold">Address:</span> {shipping.address}
                  </p>
                  <p className="mb-0">
                    <span className="fw-bold">City:</span> {shipping.city}
                  </p>
                  <p className="mb-0">
                    <span className="fw-bold">Postal:</span> {shipping.postal}
                  </p>
                  <p className="mb-3">
                    <span className="fw-bold">Country:</span> {shipping.country}
                  </p>
                  <Link to="/shipping?redirect=/placeorder">
                    <p className="mb-0">Edit</p>
                  </Link>
                </div>
              )}
              {paymentMethod && (
                <div
                  className="mb-3 p-3"
                  style={{ border: "1px solid #eb3e32" }}
                >
                  <h4>Payment</h4>
                  <p className="mb-3" style={{ textTransform: "capitalize" }}>
                    <span className="fw-bold">Method:</span> {paymentMethod}
                  </p>
                  <Link to="/payment">
                    <p className="mb-0">Edit</p>
                  </Link>
                </div>
              )}
              {cart && (
                <div className="p-3" style={{ border: "1px solid #eb3e32" }}>
                  <h4>Product(s)</h4>
                  <div className="d-flex flex-column gap-3 mb-3">
                    {cart.map((each) => (
                      <div
                        key={each._id}
                        className="d-flex justify-content-between align-items-center"
                      >
                        <div className="d-none d-lg-block">
                          <div style={{ width: "250px", height: "180px" }}>
                            <Image
                              style={{ objectFit: "cover" }}
                              className="w-100 h-100"
                              src={each.image}
                            />
                          </div>
                          <p className="d-none d-lg-block text-center">
                            {each.title}
                          </p>
                        </div>
                        <p className="d-lg-none text-break">{each.title}</p>
                        <p className="text-break">{each.qty}</p>
                        <p className="text-break">
                          {formatCurrency(each.newPrice)}
                        </p>
                      </div>
                    ))}
                  </div>
                  <Link to="/cart?redirect=/placeorder">
                    <p className="mb-0">Edit</p>
                  </Link>
                </div>
              )}
            </Col>
            <Col xs={12} xl={3}>
              <div
                className="p-5"
                style={{
                  width: "100%",
                  background: "rgb(247,247,247)",
                }}
              >
                <p>Subtotal: {formatCurrency(total)}</p>
                <p>Discount: {total > 20000 ? `-${discount}` : `$0`}</p>
                <p>
                  Total:{" "}
                  {total > 20000
                    ? formatCurrency(total - discount)
                    : formatCurrency(total)}{" "}
                </p>
                {total <= 20000 && (
                  <p className="small text-danger">
                    Get 3% discount when you buy products worth more than
                    $20,000.00
                  </p>
                )}
              </div>
              <Button
                className="mt-2 button2 rounded-0 w-100"
                style={{ height: "50px" }}
                onClick={() => setShow(true)}
              >
                Proceed to place order
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
      {show && (
        <Logout
          close={setShow}
          action={onPlaceOrder}
          actionName={"Place order now"}
          actionType={"Are you sure you want to place this order now?"}
        />
      )}
      {status === "creating" && <Order />}
    </>
  );
};

export default Placeholder;
