import React, { useEffect } from "react";
import PagesStart from "../component/PagesStart";
import { Form, Button } from "react-bootstrap";
import { useFormik } from "formik";
import { forgetSchema } from "../utils/formikValidation";
import { useNavigate } from "react-router-dom";
import Spinner from "../utils/Spinner";
import toast from "react-hot-toast";

import { useDispatch, useSelector } from "react-redux";
import { generate } from "../actions/User";
import { changeError, Status, Error } from "../features/UserSlice";

const Forget = () => {
  const loading = useSelector(Status);
  const error = useSelector(Error);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (values) => {
    dispatch(generate({ ...values, navigate }));
  };

  const { values, errors, touched, handleSubmit, handleBlur, getFieldProps } =
    useFormik({
      initialValues: {
        email: "",
      },
      validationSchema: forgetSchema,
      onSubmit,
    });

  useEffect(() => {
    dispatch(changeError(""));
  }, [error, dispatch]);

  useEffect(() => {
    error && toast.error(error);
  }, [error]);

  return (
    <div>
      <PagesStart page={"Recover/E-mail"} />
      <div className="w-100 mt-3 d-flex justify-content-center align-items-center">
        <div style={{ width: "100%", maxWidth: "600px" }} className="px-2">
          <h1 className="text-center mb-0">Recovery</h1>
          <p className="small text-center">
            A 6-digit OTP will be sent to your registered email address.
          </p>
          <Form className="w-100 mt-4 mb-4" onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail" className="mb-4">
              <Form.Label>
                E-mail Address <span style={{ color: "#eb3e32" }}>*</span>
              </Form.Label>
              <Form.Control
                type="email"
                className="rounded-0"
                style={{
                  height: "60px",
                  border:
                    errors?.email && touched.email ? "1px solid #eb3e32" : "",
                }}
                value={values.email}
                {...getFieldProps("email")}
                onBlur={handleBlur}
              />
              {errors?.email && touched.email && (
                <span className="text-danger small">{errors.email}</span>
              )}
            </Form.Group>
            <Button
              className="w-100 rounded-0 button fs-5"
              style={{ height: "60px" }}
              type="submit"
            >
              {loading === "pending" ? <Spinner /> : "Get OTP"}
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Forget;
