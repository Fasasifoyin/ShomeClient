import React, { useEffect, useState } from "react";
import PagesStart from "../component/PagesStart";
import { Form, Button } from "react-bootstrap";
import { useFormik } from "formik";
import { resetSchema } from "../utils/formikValidation";
import { useNavigate, useLocation } from "react-router-dom";
import Spinner from "../utils/Spinner";
import toast from "react-hot-toast";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";

import { useDispatch, useSelector } from "react-redux";
import { reset } from "../actions/User";
import { changeError, Status, Error } from "../features/UserSlice";

const Reset = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [email, setEmail] = useState(
    JSON.parse(localStorage.getItem("generate"))
  );
  const loading = useSelector(Status);
  const error = useSelector(Error);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const onSubmit = (values) => {
    dispatch(reset({ ...values, email, navigate }));
  };

  const { values, errors, touched, handleSubmit, handleBlur, getFieldProps } =
    useFormik({
      initialValues: {
        password: "",
        confirm: "",
      },
      validationSchema: resetSchema,
      onSubmit,
    });

  useEffect(() => {
    setEmail(JSON.parse(localStorage.getItem("generate")));
  }, [location]);

  useEffect(() => {
    dispatch(changeError(""));
  }, [error, dispatch]);

  useEffect(() => {
    error && toast.error(error);
  }, [error]);

  return (
    <div>
      <PagesStart page={"RESET"} />
      <div className="w-100 mt-3 d-flex justify-content-center align-items-center">
        <div style={{ width: "100%", maxWidth: "600px" }} className="px-2">
          <h1 className="text-center fw-bold">Reset Password</h1>
          <hr style={{ border: "1px solid rgb(0, 0, 0, 0.3)" }} />
          <Form className="w-100 mt-4 mb-4 form" onSubmit={handleSubmit}>
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
              {loading === "pending" ? <Spinner /> : "Reset Password"}
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Reset;
