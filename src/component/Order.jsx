import React, { useEffect } from "react";
import Spinner2 from "../utils/Spinner2";
import { Button, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { formatCurrency } from "../utils/formatCurrency";

import { useDispatch, useSelector } from "react-redux";
import { getUserOrders } from "../actions/Products";
import { Error, Orders, Status } from "../features/OrderSlice";

const Order = () => {
  const dispatch = useDispatch();
  const orders = useSelector(Orders);
  console.log(orders);
  const status = useSelector(Status);
  const error = useSelector(Error);

  useEffect(() => {
    dispatch(getUserOrders());
  }, [dispatch]);

  return (
    <div className="border border-subtle py-4 px-4">
      <p className="fs-5">Order history</p>
      <div style={{ border: "1px dashed black" }} className="mb-3" />
      {status === "pending" && <Spinner2 />}
      {status === "failed" && <p>{error}</p>}
      <div className="d-none d-md-block mb-3">
        <Row>
          <Col md={2}>Id</Col>
          <Col md={2}>Date</Col>
          <Col md={2}>Total</Col>
          <Col md={2}>Paid</Col>
          <Col md={2}>Delivered</Col>
        </Row>
      </div>
      <div className="d-flex flex-column gap-4">
        {orders.map((each) => (
          <Row key={each._id} className="align-items-center py-3 py-lg-0">
            <Col xs={12} md={2}>
              <p className="mb-0 text-center text-lg-start text-break">
                <span className="fw-bold d-lg-none">Id:</span> {each._id}
              </p>
            </Col>
            <Col xs={12} md={2}>
              <p className="mb-0 text-center text-lg-start text-break">
                <span className="fw-bold d-lg-none">Date:</span>{" "}
                {each.createdAt.substring(0, 10)}
              </p>
            </Col>
            <Col xs={12} md={2}>
              <p className="mb-0 text-center text-lg-start text-break">
                <span className="fw-bold d-lg-none">Price</span>{" "}
                {formatCurrency(each.totalPrice)}
              </p>
            </Col>
            <Col xs={12} md={2}>
              <p className="mb-0 text-center text-lg-start text-break">
                <span className="fw-bold d-lg-none">Paid:</span>{" "}
                {each.isPaid ? "Yes" : "No"}
              </p>
            </Col>
            <Col xs={12} md={2}>
              <p className="mb-0 text-center text-lg-start text-break">
                <span className="fw-bold d-lg-none">Delivered:</span>{" "}
                {each.isDelivered ? "Yes" : "No"}
              </p>
            </Col>
            <Col xs={12} md={2} className="text-center text-lg-start">
              <Link to={`/order/${each._id}`}>
                <Button
                  className="button rounded-0 mt-3 mt-md-0"
                  style={{ height: "40px" }}
                >
                  Details
                </Button>
              </Link>
            </Col>
          </Row>
        ))}
      </div>
    </div>
  );
};

export default Order;
