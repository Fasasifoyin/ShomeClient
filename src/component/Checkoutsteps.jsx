import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const Checkoutsteps = (props) => {
  return (
    <Container className="mb-4">
      <div className="d-none d-lg-block">
        <Row>
          <Col lg={4} className={props.step1 ? "active" : "notactive"}>
            <Link to={"/shipping"}>
              <p
                className={
                  props.step1
                    ? "activeText text-center mb-0"
                    : "notactiveText text-center mb-0"
                }
              >
                Shipping
              </p>
            </Link>
          </Col>
          <Col lg={4} className={props.step2 ? "active" : "notactive"}>
            <Link to={"/payment"}>
              <p
                className={
                  props.step2
                    ? "activeText text-center mb-0"
                    : "notactiveText text-center mb-0"
                }
              >
                Payment
              </p>
            </Link>
          </Col>
          <Col lg={4} className={props.step3 ? "active" : "notactive"}>
            <Link to="/placeorder">
              <p
                className={
                  props.step3
                    ? "activeText text-center mb-0"
                    : "notactiveText text-center mb-0"
                }
              >
                Place order
              </p>
            </Link>
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default Checkoutsteps;
