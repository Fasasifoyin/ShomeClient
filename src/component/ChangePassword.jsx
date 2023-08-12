import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { Form, Button } from "react-bootstrap";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import { changeSchema } from "../utils/formikValidation";
import Spinner from "../utils/Spinner";
import toast from "react-hot-toast";

import { useDispatch, useSelector } from "react-redux";
import { change } from "../actions/User";
import { changeError, Status, Error } from "../features/UserSlice";

const ChangePassword = ({ user }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const loading = useSelector(Status);
  const error = useSelector(Error);
  const dispatch = useDispatch();

  const onSubmit = (values, actions) => {
    const value = { ...values, email: user?.email };
    dispatch(change(value));
    actions.resetForm();
  };

  const { values, errors, touched, handleSubmit, handleBlur, getFieldProps } =
    useFormik({
      initialValues: {
        password: "",
        newPassword: "",
        confirm: "",
      },
      validationSchema: changeSchema,
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
      <p className="fs-5">Change Password</p>
      <div style={{ border: "1px dashed black" }} className="mb-3" />
      <Form className="w-100 form" onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicPassword" className="mb-4">
          <Form.Label>
            Enter Password <span style={{ color: "#eb3e32" }}>*</span>
          </Form.Label>
          <Form.Control
            type="text"
            className="rounded-0"
            style={{
              height: "60px",
              border:
                errors?.password && touched.password ? "1px solid #eb3e32" : "",
            }}
            values={values.password}
            onBlur={handleBlur}
            {...getFieldProps("password")}
          />
          {errors?.password && touched.password && (
            <span className="text-danger small">{errors.password}</span>
          )}
        </Form.Group>
        <div className="d-lg-flex justify-content-between mb-4">
          <Form.Group
            controlId="formBasicNewPassword"
            className="formName mb-4"
          >
            <Form.Label>
              New Password <span style={{ color: "#eb3e32" }}>*</span>
            </Form.Label>
            <div className="position-relative">
              <Form.Control
                type={showPassword ? "text" : "password"}
                className="rounded-0"
                style={{
                  height: "60px",
                  border:
                    errors?.newPassword && touched.newPassword
                      ? "1px solid #eb3e32"
                      : "",
                }}
                values={values.newPassword}
                onBlur={handleBlur}
                {...getFieldProps("newPassword")}
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
            {errors?.newPassword && touched.newPassword && (
              <span className="text-danger small">{errors.newPassword}</span>
            )}
          </Form.Group>
          <Form.Group controlId="formBasicConfirm" className="formName">
            <Form.Label>
              Confirm New Password <span style={{ color: "#eb3e32" }}>*</span>
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
        </div>
        <div className="text-center">
          <Button
            className="w-50 rounded-0 button fs-5"
            style={{ height: "60px" }}
            type="submit"
          >
            {loading === "pending" ? <Spinner /> : "Change Password"}
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default ChangePassword;
