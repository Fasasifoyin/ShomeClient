import React, { useEffect } from "react";
import { useFormik } from "formik";
import { Form, Button } from "react-bootstrap";
import { updateSchema } from "../utils/formikValidation";
import Spinner from "../utils/Spinner";
import toast from "react-hot-toast";

import { useDispatch, useSelector } from "react-redux";
import { update } from "../actions/User";
import { changeError, Status, Error } from "../features/UserSlice";

const AccountDetails = ({ user }) => {
  const loading = useSelector(Status);
  const error = useSelector(Error);
  const dispatch = useDispatch();

  const onSubmit = (values) => {
    dispatch(update(values));
  };

  const { values, errors, touched, handleSubmit, handleBlur, getFieldProps } =
    useFormik({
      initialValues: {
        firstName: user?.firstName,
        lastName: user?.lastName,
        email: user?.email,
        mobile: user?.mobile || "",
        address: user?.address || "",
      },
      validationSchema: updateSchema,
      onSubmit,
    });

  useEffect(() => {
    dispatch(changeError(""));
  }, [error, dispatch]);

  useEffect(() => {
    error && toast.error(error);
  }, [error]);

  return (
    <div className="border border-subtle py-4 px-4">
      <p className="fs-5">Account details</p>
      <div style={{ border: "1px dashed black" }} className="mb-3" />
      <Form className="w-100 form" onSubmit={handleSubmit}>
        <div className="d-lg-flex justify-content-between mb-4">
          <Form.Group
            controlId="formBasicFirst"
            className="mb-4 mb-lg-0 formName"
          >
            <Form.Label>
              First Name <span style={{ color: "#eb3e32" }}>*</span>
            </Form.Label>
            <Form.Control
              type="text"
              className="rounded-0 form"
              style={{
                height: "60px",
                border:
                  errors?.firstName && touched.firstName
                    ? "1px solid #eb3e32"
                    : "",
              }}
              value={values.firstName}
              onBlur={handleBlur}
              {...getFieldProps("firstName")}
            />
            {errors?.firstName && touched.firstName && (
              <span className="text-danger small">{errors.firstName}</span>
            )}
          </Form.Group>
          <Form.Group controlId="formBasicLast" className="formName">
            <Form.Label>
              Last Name <span style={{ color: "#eb3e32" }}>*</span>
            </Form.Label>
            <Form.Control
              type="text"
              className="rounded-0 form"
              style={{
                height: "60px",
                border:
                  errors?.lastName && touched.lastName
                    ? "1px solid #eb3e32"
                    : "",
              }}
              value={values.lastName}
              onBlur={handleBlur}
              {...getFieldProps("lastName")}
            />
            {errors?.lastName && touched.lastName && (
              <span className="text-danger small">{errors.lastName}</span>
            )}
          </Form.Group>
        </div>
        <Form.Group controlId="formBasicEmail" className="mb-4">
          <Form.Label>
            E-mail Address <span style={{ color: "#eb3e32" }}>*</span>
          </Form.Label>
          <Form.Control
            type="email"
            className="rounded-0"
            style={{
              height: "60px",
              border: errors?.email && touched.email ? "1px solid #eb3e32" : "",
            }}
            value={values.email}
            onBlur={handleBlur}
            {...getFieldProps("email")}
          />
          {errors?.email && touched.email && (
            <span className="text-danger small">{errors.email}</span>
          )}
        </Form.Group>

        <Form.Group controlId="formBasicMobile" className="mb-4">
          <Form.Label>
            Telephone Number
          </Form.Label>
          <Form.Control
            type="number"
            className="rounded-0"
            style={{
              height: "60px",
            }}
            value={values.mobile}
            onBlur={handleBlur}
            {...getFieldProps("mobile")}
          />
        </Form.Group>

        <Form.Group controlId="formBasicAddress" className="mb-5">
          <Form.Label>
            Address
          </Form.Label>
          <Form.Control
            type="text"
            className="rounded-0 form"
            style={{
              height: "60px",
            }}
            value={values.address}
            onBlur={handleBlur}
            {...getFieldProps("address")}
          />
        </Form.Group>

        <div className="text-center">
          <Button
            className="button w-50 rounded-0 fs-5"
            style={{ height: "60px" }}
            type="submit"
          >
            {loading === "pending" ? <Spinner /> : "Update details"}
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default AccountDetails;
