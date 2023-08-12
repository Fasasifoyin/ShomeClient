import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Container, Row, Col, Image, Button } from "react-bootstrap";
import Spinner2 from "../utils/Spinner2";
import Spinner from "../utils/Spinner";
import { formatCurrency } from "../utils/formatCurrency";
import Order from "../utils/Order";

import { useSelector, useDispatch } from "react-redux";
import { Order as Orderr, Status, Error } from "../features/OrderSlice";
import { getClientId, getOrder, paypalPaid } from "../actions/Products";
import { Status as PaypalStatus } from "../features/Paypal";

import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { Client } from "../features/Paypal";
import { toast } from "react-hot-toast";

const Ordered = () => {
  const { orderId } = useParams();
  const dispatch = useDispatch();
  const order = useSelector(Orderr);
  const clientId = useSelector(Client);
  const status = useSelector(Status);
  const paypalStatus = useSelector(PaypalStatus);
  const error = useSelector(Error);

  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  const createOrder = (data, actions) => {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: { value: order.totalPrice },
          },
        ],
      })
      .then((orderID) => {
        return orderID;
      });
  };

  const onApprove = (data, actions) => {
    actions.order.capture().then(async function (details) {
      dispatch(paypalPaid({ id: order._id, details }));
    });
  };

  const onError = (error) => {
    toast.error(error);
  };

  useEffect(() => {
    dispatch(getOrder(orderId));
  }, [orderId, dispatch]);

  useEffect(() => {
    if (order?.shippingAddress?.fullName) {
      dispatch(getClientId());
    }
  }, [dispatch, order]);

  useEffect(() => {
    if (clientId) {
      paypalDispatch({
        type: "resetOptions",
        value: {
          "client-id": clientId,
          currency: "USD",
        },
      });
      paypalDispatch({ type: "setLoadingStatus", value: "pending" });
    }
  }, [clientId, paypalDispatch]);

  return (
    <>
      <div className="mt-5 mb-5">
        <Container>
          {status === "pending" && <Spinner2 />}
          {status === "failed" && <p>{error}</p>}
          {(status === "success" || status === "paypalPending") &&
            order?.shippingAddress?.fullName && (
              <div>
                <h1>Order {order._id}</h1>
                <Row className="gx-3 gy-4 mt-2">
                  <Col xs={12} xl={9}>
                    <div
                      className="mb-3 p-3"
                      style={{ border: "1px solid #eb3e32" }}
                    >
                      <h4>Shipping Details</h4>
                      <p className="mb-0">
                        <span className="fw-bold">Full Name:</span>{" "}
                        {order.shippingAddress?.fullName}
                      </p>
                      <p className="mb-0">
                        <span className="fw-bold">Address:</span>{" "}
                        {order?.shippingAddress?.address}
                      </p>
                      <p className="mb-0">
                        <span className="fw-bold">City:</span>{" "}
                        {order?.shippingAddress?.city}
                      </p>
                      <p className="mb-0">
                        <span className="fw-bold">Postal:</span>{" "}
                        {order?.shippingAddress?.postal}
                      </p>
                      <p className="mb-3">
                        <span className="fw-bold">Country:</span>{" "}
                        {order.shippingAddress.country}
                      </p>
                      <div
                        className="py-3 px-3 w-100"
                        style={{
                          background: order.isDeliverd ? "green" : "pink",
                        }}
                      >
                        <p className="mb-0">
                          {order.isDeliverd ? "Delivered" : "Not Delivered"}
                        </p>
                      </div>
                    </div>
                    <div
                      className="mb-3 p-3"
                      style={{ border: "1px solid #eb3e32" }}
                    >
                      <h4>Payment</h4>
                      <p
                        className="mb-3"
                        style={{ textTransform: "capitalize" }}
                      >
                        <span className="fw-bold">Method:</span>{" "}
                        {order.paymentMethod}
                      </p>
                      <div
                        className="py-3 px-3 w-100"
                        style={{ background: order.isPaid ? "green" : "pink" }}
                      >
                        <p className="mb-0">
                          {order.isPaid ? "Paid" : "Not Paid"}
                        </p>
                      </div>
                    </div>

                    <div
                      className="p-3"
                      style={{ border: "1px solid #eb3e32" }}
                    >
                      <h4>Product(s)</h4>
                      <div className="d-flex flex-column gap-3 mb-3">
                        {order.orderItems.map((each) => (
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
                              {formatCurrency(each.price)}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Col>
                  <Col xs={12} xl={3}>
                    <div
                      className="p-5 mb-3"
                      style={{
                        width: "100%",
                        background: "rgb(247,247,247)",
                      }}
                    >
                      <p>Subtotal: {formatCurrency(order.itemsPrice)}</p>
                      <p>Discount: {formatCurrency(order.discount)}</p>
                      <p>Total: {formatCurrency(order.totalPrice)}</p>
                    </div>
                    {paypalStatus === "pending" && (
                      <Button
                        className="mt-2 button2 rounded-0 w-100"
                        style={{ height: "50px" }}
                      >
                        <Spinner />
                      </Button>
                    )}
                    {paypalStatus === "success" &&
                      !order.isPaid &&
                      (isPending ? (
                        <Button
                          className="mt-2 button2 rounded-0 w-100"
                          style={{ height: "50px" }}
                        >
                          <Spinner />
                        </Button>
                      ) : (
                        <div>
                          <PayPalButtons
                            createOrder={createOrder}
                            onApprove={onApprove}
                            onError={onError}
                          ></PayPalButtons>
                        </div>
                      ))}
                    <div>
                      <p>
                        To become an admin so you can test the create product
                        part of this project message{" "}
                        <Link
                          target="_blank"
                          rel="noreferrer"
                          to="https://wa.link/b5zn3u"
                        >
                          07043593355
                        </Link>{" "}
                        on whatsapp or send a mail to fasasifoyin@gmail.com
                      </p>
                    </div>
                  </Col>
                </Row>
              </div>
            )}
        </Container>
      </div>
      {status === "paypalPending" && <Order />}
    </>
  );
};

export default Ordered;
