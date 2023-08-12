import React, { useState, useEffect } from "react";
import PagesStart from "../component/PagesStart";
import { Form, Button } from "react-bootstrap";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import { Link, useLocation } from "react-router-dom";
import { useFormik } from "formik";
import { signInSchema } from "../utils/formikValidation";
import { useNavigate } from "react-router-dom";
import Spinner from "../utils/Spinner";
import toast from "react-hot-toast";

import { useDispatch, useSelector } from "react-redux";
import { signIn } from "../actions/User";
import { changeError, Error, Status } from "../features/UserSlice";

const Signin = () => {
  const { search } = useLocation();
  const redirectUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectUrl ? redirectUrl : "/"
  const [showPassword, setShowPassword] = useState(false);
  const loading = useSelector(Status);
  const error = useSelector(Error);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (values) => {
    dispatch(signIn({ ...values, navigate, redirect }));
  };

  const { values, errors, touched, handleSubmit, handleBlur, getFieldProps } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: signInSchema,
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
      <PagesStart page={"SIGN IN"} />
      <div className="w-100 mt-3 d-flex justify-content-center align-items-center">
        <div style={{ width: "100%", maxWidth: "600px" }} className="px-2">
          <h1 className="text-center fw-bold">Sign in</h1>
          <hr style={{ border: "1px solid rgb(0, 0, 0, 0.3)" }} />
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
                  value={values.password}
                  {...getFieldProps("password")}
                  onBlur={handleBlur}
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
            <Button
              className="w-100 rounded-0 button fs-5"
              style={{ height: "60px" }}
              type="submit"
            >
              {loading === "pending" ? <Spinner /> : "Sign in"}
            </Button>
          </Form>
          <div className="w-100 d-md-flex justify-content-between">
            <p className="small text-end">
              Don't have an account?{" "}
              <Link to="/signup">
                <span className="text-primary">Sign up here</span>
              </Link>
            </p>
            <Link to="/forget">
              <p className="text-primary small text-end">Lost your password?</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
