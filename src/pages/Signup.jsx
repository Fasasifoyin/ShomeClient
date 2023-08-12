import React, { useState, useEffect } from "react";
import PagesStart from "../component/PagesStart";
import { Form, Button } from "react-bootstrap";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { signUpSchema } from "../utils/formikValidation";
import { useNavigate } from "react-router-dom";
import Spinner from "../utils/Spinner";
import toast from "react-hot-toast";

import { useDispatch, useSelector } from "react-redux";
import { signUp } from "../actions/User";
import { changeError, Status, Error } from "../features/UserSlice";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const loading = useSelector(Status);
  const error = useSelector(Error);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (values) => {
    dispatch(signUp({ ...values, navigate }));
  };

  const { values, errors, touched, handleSubmit, handleBlur, getFieldProps } =
    useFormik({
      initialValues: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirm: "",
      },
      validationSchema: signUpSchema,
      onSubmit,
    });

  useEffect(() => {
    dispatch(changeError(""));
  }, [error, dispatch]);

  useEffect(() => {
    error && toast.error(error);
  }, [error]);

  return (
    <div className="mb-5">
      <PagesStart page={"SIGN UP"} />
      <div className="w-100 mt-3 d-flex justify-content-center align-items-center">
        <div style={{ width: "100%", maxWidth: "600px" }} className="px-2">
          <h1 className="text-center fw-bold">Sign up</h1>
          <hr style={{ border: "1px solid rgb(0, 0, 0, 0.3)" }} />
          <Form className="w-100 mt-4 mb-4 form" onSubmit={handleSubmit}>
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
                  border:
                    errors?.email && touched.email ? "1px solid #eb3e32" : "",
                }}
                value={values.email}
                onBlur={handleBlur}
                {...getFieldProps("email")}
              />
              {errors?.email && touched.email && (
                <span className="text-danger small">{errors.email}</span>
              )}
            </Form.Group>
            <Form.Group controlId="formBasicPassword" className="mb-4">
              <Form.Label>
                Password <span style={{ color: "#eb3e32" }}>*</span>
              </Form.Label>
              <div className="position-relative">
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  className="rounded-0"
                  style={{
                    height: "60px",
                    border:
                      errors?.password && touched.password
                        ? "1px solid #eb3e32"
                        : "",
                  }}
                  values={values.password}
                  onBlur={handleBlur}
                  {...getFieldProps("password")}
                />
                <div
                  style={{
                    position: "absolute",
                    right: "10px",
                    top: "50%",
                    transform: "translateY(-50%)",
                  }}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <BsFillEyeFill size="1.5rem" />
                  ) : (
                    <BsFillEyeSlashFill size="1.5rem" />
                  )}
                </div>
              </div>
              {errors?.password && touched.password && (
                <span className="text-danger small">{errors.password}</span>
              )}
            </Form.Group>
            <Form.Group controlId="formBasicConfirm" className="mb-4">
              <Form.Label>
                Confirm Password <span style={{ color: "#eb3e32" }}>*</span>
              </Form.Label>
              <div className="position-relative">
                <Form.Control
                  type={showConfirm ? "text" : "password"}
                  className="rounded-0"
                  style={{
                    height: "60px",
                    border:
                      errors?.confirm && touched.confirm
                        ? "1px solid #eb3e32"
                        : "",
                  }}
                  value={values.confirm}
                  onBlur={handleBlur}
                  {...getFieldProps("confirm")}
                />
                <div
                  style={{
                    position: "absolute",
                    right: "10px",
                    top: "50%",
                    transform: "translateY(-50%)",
                  }}
                  onClick={() => setShowConfirm(!showConfirm)}
                >
                  {showConfirm ? (
                    <BsFillEyeFill size="1.5rem" />
                  ) : (
                    <BsFillEyeSlashFill size="1.5rem" />
                  )}
                </div>
              </div>

              {errors?.confirm && touched.confirm && (
                <span className="text-danger small">{errors.confirm}</span>
              )}
            </Form.Group>
            <Button
              className="w-100 rounded-0 button fs-5"
              style={{ height: "60px" }}
              type="submit"
            >
              {loading === "pending" ? <Spinner /> : "Sign up"}
            </Button>
          </Form>
          <p className="small text-end">
            Already have an account?{" "}
            <Link to="/signin">
              <span className="text-primary">Sign in here</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
