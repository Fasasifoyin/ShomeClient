import React from "react";
import Checkoutsteps from "../component/Checkoutsteps";
import { Field, Form, Formik } from "formik";
import { Button, FormGroup, FormLabel } from "react-bootstrap";
import { Form as BootForm } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import { useDispatch, useSelector } from "react-redux";
import {
  CartItems,
  PaymentMethod,
  Shipping,
  payment,
} from "../features/CartandWish";
import { paymentValidation } from "../utils/formikValidation";

const Payment = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector(CartItems);
  const shipping = useSelector(Shipping);
  const paymentMethod = useSelector(PaymentMethod);

  const options = [
    { key: "Paypal", value: "paypal" },
    { key: "Stripe", value: "stripe" },
  ];

  const initialValues = {
    payment: paymentMethod || "",
  };

  const onSubmit = (values) => {
    if (cart.length && shipping.fullName) {
      dispatch(payment(values.payment));
      navigate("/placeorder");
    } else if (cart.length < 1) {
      toast.error("You do not have any product to purchase");
    } else {
      navigate("/shipping");
    }
  };

  return (
    <div className="mt-5">
      <Checkoutsteps step1 step2 />
      <div
        style={{ minHeight: "20vh" }}
        className="d-flex justify-content-center align-items-center"
      >
        <div
          className="p-3"
          style={{ background: "#F8F8FD", width: "100%", maxWidth: "650px" }}
        >
          <h4 className="fw-bold text-center" style={{ color: "#eb3e32" }}>
            Choose a payment method
          </h4>
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={paymentValidation}
          >
            {() => (
              <Form>
                <div className="d-flex flex-column gap-2">
                  <Field name="payment">
                    {({ field, meta }) => (
                      <FormGroup>
                        {options.map((each, index) => (
                          <div
                            className="d-flex align-items-center gap-2"
                            key={index}
                          >
                            <BootForm.Check
                              type="radio"
                              {...field}
                              value={each.value}
                              checked={Boolean(
                                field.value.includes(each.value)
                              )}
                            />
                            <FormLabel className="mb-0">{each.key}</FormLabel>
                          </div>
                        ))}
                    {meta.error && <span className="small" style={{color:"red"}}>{meta.error}</span>}
                      </FormGroup>
                    )}
                  </Field>
                </div>
                <Button
                  type="submit"
                  className="w-100 rounded-0 button2 fs-5 mt-5"
                  style={{ height: "60px" }}
                >
                  Proceed to payment
                </Button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Payment;
